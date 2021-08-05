import Board from "../Board/Board"
import {useCallback, useEffect, useReducer, useState} from "react"
import {gameReducer, initialState} from "../../reducers/game.reducer"
import { GameContext } from '../../contexts/GameContext'
import useGameEngine from "./useGameEngine"
import Loader from '../Loader/Loader'
import styled from "styled-components";
import GameLogic from "../../GameLogic/GameLogic";

const Wrapper = styled.div`
  text-align: center;
`

const Game = () =>{
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [loading, sendBoard] = useGameEngine()
  const [winnerText,setWinnerText] = useState<string>()

  const checkWinner = useCallback((player) => {
    const winner = GameLogic.checkWinner(state.board, player);
    if (winner) {
      dispatch({type: "UPDATE_WINNER", player})
    }
    return winner
  },[state.board])

  const onTurnUpdate = useCallback(() => {
    (async function async() {

      if(state.totalMoves === 0) return
      if(state.totalMoves >= 9) return
      // User just played - send board to game engine
      if (state.currentPlayerTurn === 'O') {
        if (checkWinner('X')) return
        const newBoard = await sendBoard(state.board)
        dispatch({type: 'UPDATE_BOARD', board: newBoard})
      } else {
        checkWinner('O')
      }
    })()
  },[state.currentPlayerTurn, checkWinner, state.board, sendBoard, state.totalMoves])

  useEffect(() => {
    onTurnUpdate()
    // Adding onTurn as dependency creates a circular rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentPlayerTurn])

  const newGame = () => {
    dispatch({type:'INIT'})
  }

  useEffect(() =>{
    switch(state.winner) {
      case 'O':
        return setWinnerText('AI win')
      case 'X':
        return setWinnerText('You win')
      default:
        if(state.totalMoves >= 9) //TODO
          return setWinnerText("Draw")
        else
          return setWinnerText("")
    }
  }, [state.winner, state.totalMoves])

  return(
    <Wrapper>
      <h1>Game board</h1>
      <GameContext.Provider value={{dispatch: dispatch, state: state}}>
        <Board boardState={state.board} loading={loading} />
      </GameContext.Provider>

      {loading && <Loader/> }
      {winnerText && <div>{winnerText}</div>}
      <button onClick={newGame}>New Game</button>
    </Wrapper>
  )
}

export default Game
