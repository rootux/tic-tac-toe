import {PlayerId} from "../GameLogic/GameLogic";

export interface State {
  board: PlayerId[]
  totalMoves: number
  winner: PlayerId | undefined
  currentPlayerTurn: PlayerId | string
}

export interface Action {
  type: string
  board?: PlayerId[]
  position?: number
  player?: PlayerId
}

export const initialState = {
  board: Array(9).fill(''),
  totalMoves: 0,
  currentPlayerTurn: 'X',
  winner: undefined,
};

const nextPlayer = (currentPlayerTurn: PlayerId) => {
  if(currentPlayerTurn === 'X') return 'O'
  else return 'X'
}

export function gameReducer (state:State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return {...initialState }

    case 'UPDATE_BOARD':
      return {...state, board: action.board!, totalMoves: state.totalMoves + 1,
        currentPlayerTurn: nextPlayer(action.player!)}

    case 'UPDATE_CELL':
      if(action.position === undefined) throw new Error('Position is needed')
      const newBoard = [...state.board]
      newBoard[action.position] = action.player!
      return {...state, board: newBoard, totalMoves: state.totalMoves + 1,
        currentPlayerTurn: nextPlayer(action.player!)}

    case 'UPDATE_WINNER':
      return {...state, winner: action.player!}


    default:
      throw new Error('Invalid action')
  }
}

