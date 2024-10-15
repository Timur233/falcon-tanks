# Игровой движок <!-- omit in toc -->

- [UML диаграмма общих взаимосвязей](#uml-диаграмма-общих-взаимосвязей)
- [Базовые классы](#базовые-методы)

## UML диаграмма общих взаимосвязей

```mermaid
interface AnimationParams {
  currentFrame: number
  totalFrames: number
  frameInterval?: number
  frameCount?: number
}

export interface Direction {
  x: number
  y: number
}

export interface AbstractEntity {
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: Direction
  animation?: AnimationParams
}

export interface Enemy extends AbstractEntity {
  id: number
  lastShotTime?: number
}

export interface Obstacle {
  type: string
  x: number
  y: number
  width: number
  height: number
  hp: number
  isCollide: boolean
  animation: AnimationParams
}

export interface Effect {
  type: string
  x: number
  y: number
  width: number
  height: number
  direction?: Direction
  animation: AnimationParams
}

export interface ControlsProps {
  playerRef: React.MutableRefObject<AbstractEntity>
  bulletsRef: React.MutableRefObject<AbstractEntity[]>
  obstacles: Obstacle[]
  canvasWidth: number
  canvasHeight: number
}

```

## Базовые методы

### Game

Game - основной класс, здесь запускается игровой цикл, здесь запускается инициализация всех игровых объектов. А также содержатся вспомогательные методы по работе с различной логикой игры.

Методы объектов игры:

|                Имя                 | Описание                                                |
|:----------------------------------:|:--------------------------------------------------------|
|          **clearCanvas**           | Очищает поле                                            |
|        **createBangEffect**        | Создает эффект взрыва                                   |
|          **createBullet**          | Создает пулю                                            |
|          **createEffect**          | Создает какой-либо эффект                               |
|           **createMap**            | Создает карту                                           |
|         **createObstacle**         | Создает препятствие                                     |
|        **createShotEffect**        | Создает эффект выстрела                                 |
|            **drawTank**            | Рисует танк                                             |
|          **deleteEffect**          | Удаляет эффект                                          |
|     **detectBulletCollision**      | Коллизия пули с препятствием                            |
|        **detectCollision**         | Коллизия двух объектов                                  |
|      **detectEnemyCollision**      | Коллизия с противником                                  |                            
|    **detectObstacleCollision**     | Коллизия с препятствием                                 |                            
|          **drawBullets**           | Рисует пули                                             |
|          **drawEffects**           | Рисует эффекты                                          |
|          **drawEnemies**           | Рисует танк противника                                  |
|         **drawObstacles**          | Рисует препятствия                                      |
|           **drawPlayer**           | Рисует танк игрока                                      |
|     **getRandomEdgePosition**      | Высчитывает случайную позицию x и y относительно краев  |
|       **getRandomPosition**        | Высчитывает случайную позицию x и y                     |                                   
| **handleBulletObstacleCollisions** | Обработчик проверки коллизии пули и препятствий        |                                                       
|      **handleEnemyShooting**       | Обработчик стрельбы противника                          |                                                       
|        **HandlePlayerHit**         | Обработчик проверки остатка жизней игрока               |                                                       
|          **initEffects**           | Инициализация эффектов                                  |
|    **initializeCampanyEnemies**    | Инициализация вражеских танков в компании               |
|  **initializeCompanyMapObstacle**  | Инициализация препятствий в компании                    |
|    **initializeRandomEnemies**     | Инициализация случайно расставленных вражеских танков   |
|    **initializeRandomObstacle**    | Инициализация случайно расставленных препятствий        |
|           **killEnemy**            | Удаляет вражеский танк                                  |
|          **killObstacle**          | Удаляет препятствие                                     |
|      **resetPlayerPosition**       | Сбросить позицию игрока на начальную                    |
|         **respawnEnemies**         | Перезапуск вражеских танков                             |
|          **respawnEnemy**          | Перезапуск вражеского танка                             |
|         **updateBullets**          | Обновление позиций пуль                                 |
|      **updateEnemyPositions**      | Обновление позиций вражеских танков                     |
|       **updatePlayerAction**       | Обновление действий игрока                              |

