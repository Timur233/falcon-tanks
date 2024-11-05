import {
  AbstractEntity,
  Enemy,
  GameMapParams,
  ObjectPosition,
  Obstacle,
  ObstacleParams,
  obstacleTypes,
  Position,
  PositionType,
  RandomPosition,
} from './gameTypes'
import { GET_PLAYER_DEFAULT_PARAMS, PLAYER_DEFAULT_PARAMS } from './player'
import { createObstacle } from '@/components/Game/obstacle'

import { DefaultEnemy, ObstacleSettings } from '@/components/Game/constants'

export class GameMap {
  window_width: number
  window_height: number
  grid_size: number
  player: AbstractEntity
  enemies: Enemy[]
  obstacles: Obstacle[]
  private grid: Position[]
  private positions: ObjectPosition[]

  constructor(params: GameMapParams) {
    this.window_width = params.window_width
    this.window_height = params.window_height
    this.grid_size = params.grid_size
    this.player = params.player
    this.enemies = params.enemies
    this.obstacles = params.obstacles
    this.grid = this.generateGrid()
    this.positions = []
  }

  private generateGrid(): ObjectPosition[] {
    const grid: ObjectPosition[] = []
    const columns = Math.floor(this.window_width / this.grid_size)
    const rows = Math.floor(this.window_height / this.grid_size)

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        grid.push({ x, y, type: PositionType.Ground })
      }
    }
    return grid
  }

  // Выбор случайных позиций, исключая центр и выбирая по краям
  public getRandomPositions(
    params: RandomPosition = {
      playerPosition: {
        x: PLAYER_DEFAULT_PARAMS.x,
        y: PLAYER_DEFAULT_PARAMS.y,
      },
      enemyCount: 5,
      obstacleCount: 5,
    }
  ): void {
    const playerX = Math.floor(params.playerPosition.x / this.grid_size)
    const playerY = Math.floor(params.playerPosition.y / this.grid_size)

    this.positions.push({ x: playerX, y: playerY, type: PositionType.Player })
    this.positions.push({
      x: playerX + 1,
      y: playerY,
      type: PositionType.Shadow,
    })
    this.positions.push({
      x: playerX,
      y: playerY + 1,
      type: PositionType.Shadow,
    })
    this.positions.push({
      x: playerX + 1,
      y: playerY + 1,
      type: PositionType.Shadow,
    })
    this.positions.push({
      x: playerX - 1,
      y: playerY - 1,
      type: PositionType.Shadow,
    })
    this.positions.push({
      x: playerX,
      y: playerY - 1,
      type: PositionType.Shadow,
    })
    this.positions.push({
      x: playerX - 1,
      y: playerY,
      type: PositionType.Shadow,
    })
    // Собираем позиции по краям
    const edgePositions: Position[] = this.grid.filter(
      pos => !this.positions.some(p => p.x === pos.x && p.y === pos.y)
    )

    // Перемешиваем крайние позиции и выбираем 5 случайных для врагов
    this.shuffleArray(edgePositions)
    const enemyShadows = []
    const enemyPositions = edgePositions
      .slice(0, params.enemyCount)
      .map(pos => ({
        ...pos,
        type: PositionType.Enemy,
      }))

    for (let i = 0; i < enemyPositions.length; i++) {
      enemyShadows.push({
        x: enemyPositions[i].x + 1,
        y: enemyPositions[i].y,
        type: PositionType.Shadow,
      })
      enemyShadows.push({
        x: enemyPositions[i].x,
        y: enemyPositions[i].y + 1,
        type: PositionType.Shadow,
      })
      enemyShadows.push({
        x: enemyPositions[i].x + 1,
        y: enemyPositions[i].y + 1,
        type: PositionType.Shadow,
      })
    }

    this.positions.push(...enemyPositions)
    this.positions.push(...enemyShadows)

    // Получаем оставшиеся позиции, исключая центр и выбранные ранее
    const remainingPositions = this.grid.filter(
      pos => !this.positions.some(p => p.x === pos.x && p.y === pos.y)
    )

    // Выбираем 20 случайных клеток, присваивая им тип Obstacle
    this.shuffleArray(remainingPositions)
    const obstaclePositions: ObjectPosition[] = remainingPositions
      .slice(0, params.obstacleCount)
      .map(pos => ({
        ...pos,
        type: PositionType.Obstacle,
      }))

    this.positions.push(...obstaclePositions)

    this.player = this.generatePlayer()
    this.enemies = this.generateEnemies()
    this.obstacles = this.generateObstacles()
    this.logGridInfo()
  }

  // Метод для случайного перемешивания массива (Fisher-Yates shuffle)
  private shuffleArray(array: Position[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  static createObstaclesMap(
    params: {
      type: obstacleTypes
      x: number
      y: number
      width: number
      height: number
    }[]
  ) {
    let obstacles: Obstacle[] = []

    params.forEach(obstacle => {
      const { type, x, y, width, height } = obstacle
      obstacles = [...obstacles, ...createObstacle(type, x, y, width, height)]
    })

    return obstacles
  }

  // Метод для вывода информации о всех клетках в логи
  public logGridInfo() {
    console.log('Grid Information:')
    this.positions.forEach(cell => {
      if (cell.type === PositionType.Enemy) {
        console.log(`Enemy at (${cell.x}, ${cell.y})`)
      } else if (cell.type === PositionType.Obstacle) {
        console.log(`Obstacle at (${cell.x}, ${cell.y})`)
      } else if (cell.type === PositionType.Player) {
        console.log(`Player at (${cell.x}, ${cell.y})`)
      } else if (cell.type === PositionType.Shadow) {
        console.log(`Shadow at (${cell.x}, ${cell.y})`)
      } else {
        console.log(
          `Empty cell at (${cell.x}, ${cell.y} with type ${cell.type})`
        )
      }
    })
  }

  // Метод для фиксированного расположения объектов для кампании
  public initializeCompanyMap(
    player: AbstractEntity = GET_PLAYER_DEFAULT_PARAMS(),
    enemies: Enemy[],
    obstacleParams: ObstacleParams[]
  ) {
    this.player = player
    this.enemies = enemies
    this.obstacles = GameMap.createObstaclesMap(obstacleParams)
  }

  // Генерация объектов врагов
  public generateEnemies(): Enemy[] {
    let enemyIdCounter = 0
    return this.positions
      .filter(pos => pos.type === PositionType.Enemy)
      .map(pos => {
        const enemy: Enemy = {
          id: enemyIdCounter++, // Увеличиваем счетчик для уникальности
          x: pos.x * this.grid_size,
          y: pos.y * this.grid_size,
          width: DefaultEnemy.width,
          height: DefaultEnemy.height,
          speed: DefaultEnemy.speed,
          direction: { ...DefaultEnemy.direction },
          animation: { ...DefaultEnemy.animation },
        }
        return enemy
      })
  }

  // Генерация объектов препятствий
  public generateObstacles(): Obstacle[] {
    return this.positions
      .filter(pos => pos.type === PositionType.Obstacle)
      .map(pos => {
        const obstacle: Obstacle = {
          type: obstacleTypes.Wall, // Назначаем тип препятствия
          x: pos.x * this.grid_size,
          y: pos.y * this.grid_size,
          width: this.grid_size,
          height: this.grid_size,
          hp: ObstacleSettings[obstacleTypes.Wall].hp,
          isCollide: ObstacleSettings[obstacleTypes.Wall].isCollide,
          animation: {
            currentFrame: 0,
            totalFrames: ObstacleSettings[obstacleTypes.Wall].frames.length,
          },
        }
        return obstacle
      })
  }

  // Генерация объектов игрока
  generatePlayer(): AbstractEntity {
    return this.positions
      .filter(pos => pos.type === PositionType.Player)
      .map(pos => {
        const player: AbstractEntity = {
          x: pos.x * this.grid_size,
          y: pos.y * this.grid_size,
          width: PLAYER_DEFAULT_PARAMS.width,
          height: PLAYER_DEFAULT_PARAMS.height,
          speed: PLAYER_DEFAULT_PARAMS.speed,
          direction: { ...PLAYER_DEFAULT_PARAMS.direction },
          animation: { ...PLAYER_DEFAULT_PARAMS.animation },
        }
        return player
      })[0]
  }

  // Геттеры для возврата данных о карте
  getPlayer() {
    return this.player
  }

  getEnemies() {
    return this.enemies
  }

  getObstacles() {
    return this.obstacles
  }

  clearMap() {
    this.player = GET_PLAYER_DEFAULT_PARAMS()
    this.enemies = []
    this.obstacles = []
    this.grid = this.generateGrid()

    this.positions = []
  }
}
