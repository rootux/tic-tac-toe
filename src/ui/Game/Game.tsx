import Board from "../Board/Board"
import {useContext, useEffect, useReducer} from "react"
import {gameReducer, initialState} from "../../reducers/game.reducer"
import { GameContext } from '../../contexts/GameContext';

const Game = () =>{
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    console.log("TODO Board updated - send network request")
    // TODO only check if board changed
    // apinetwork call -> update board
  }, [state.board]) //TODO: perhaps only [state]

  const newGame = () => {
    dispatch({type:'init'})
  }

  return(
    <div>
      <GameContext.Provider value={dispatch}>
        <Board boardState={state.board}/>
      </GameContext.Provider>
      Game board
      <button onClick={newGame}>New Game</button>
    </div>
  )
}

export default Game
