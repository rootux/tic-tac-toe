import {PlayerId} from "../GameLogic/GameLogic";
import {Reducer} from "react";

export interface State {
  board: PlayerId[]
  totalMoves: number
}

export interface Action {
  type: string
  position?: number
  player?: PlayerId
}

export const initialState = {
  board: Array(9).fill(''),
  totalMoves: 0,
  // nextPlayer: 1,
  // winner: 0,
};

export function gameReducer (state:State, action: Action): State {
  switch (action.type) {
    case 'init':
      return {...state, board: new Array(9).fill('') }

    case 'updateCell':
      if(action.position === undefined) throw new Error('Position is needed')
      const newBoard = state.board
      newBoard[action.position] = action.player!
      return {...state, board: newBoard, totalMoves: state.totalMoves + 1}

    default:
      throw new Error('Invalid action')
  }
}

