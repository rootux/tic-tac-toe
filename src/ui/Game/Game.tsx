import Board from "../Board/Board"
import {useContext} from "react";
import {GameContext} from "../../GameContext";

const Game = () =>{
  const gameContext = useContext(GameContext)

  const newGame = () => {
    gameContext.game.clearBoard()
  }

  return(
    <div>
      <Board />
      Game board
      <button onClick={newGame}>New Game</button>
    </div>
  )
}

export default Game
