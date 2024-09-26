import { Game } from '@/components/Game/Game'
import './GamePage.scss'

export const GamePage: React.FC = () => {
  return (
    <div className="game-page">
      <h1>Falcon Tanks</h1>
      <Game />
    </div>
  )
}
