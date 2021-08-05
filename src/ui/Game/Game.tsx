import Board from "../Board/Board"
import {useEffect, useReducer} from "react"
import {gameReducer, initialState} from "../../reducers/game.reducer"
import { GameContext } from '../../contexts/GameContext'
import useGameEngine from "./useGameEngine"
import Loader from '../Loader/Loader'
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
`

const Game = () =>{
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [loading, sendBoard] = useGameEngine()

  useEffect(() => {
    (async function async() {
      // User just played - send board to game engine
      if(state.currentPlayerTurn === 'O') {
        const newBoard = await sendBoard(state.board)
        dispatch({type: 'UPDATE_BOARD', board: newBoard})
      }
    })()
    console.log("Board updated")
  }, [state.board])

  const newGame = () => {
    dispatch({type:'INIT'})
  }

  return(
    <Wrapper>
      <h1>Game board</h1>
      <GameContext.Provider value={dispatch}>
        <Board boardState={state.board} loading={loading}/>
      </GameContext.Provider>

      {loading && <Loader/> }
      <button onClick={newGame}>New Game</button>
    </Wrapper>
  )
}

export default Game
