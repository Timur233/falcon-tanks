import { Arrows } from './components/Arrows/Arrows';
import './Game.scss';


export const Game = () => {
  return <section className='game-page'>
    <div className="container-fluid">
      <div className="row">
        <div className="column col-8">
          <div className="game-page__wrapper game-wrapper">
            
          </div>
          game wrapper
        </div>
        <div className="column col-4">
          <Arrows></Arrows>
        </div>
      </div>
    </div>
  </section>
}
