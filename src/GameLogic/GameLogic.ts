import InvalidMoveError from "../errors/InvalidMoveError"
import axios from "axios"
import config from "../config/config"
import _ from "lodash"
import TicTacToeError from "../errors/TicTacToeError";
import ServerError from "../errors/ServerError";

export type PlayerId = 'O' | 'X'
export type GameBoard = string[]

interface ServerResponse {
  board: string[][]
  success: boolean
}

export interface IGame {
  fillCell: (position:number) => void
  clearBoard: () => void
}

class GameLogic implements IGame {
  private board: GameBoard
  private totalMoves:number

  constructor() {
    this.board = new Array(9).fill('')
    this.totalMoves = 0
  }

  checkInPositions(positions: number[], playerId: PlayerId) {
    if (
      this.checkPosition(positions[0], playerId) &&
      this.checkPosition(positions[1], playerId) &&
      this.checkPosition(positions[2], playerId)
    ) {
      return positions
    }
  }

  checkInColumns(playerId: PlayerId) {
    return (
      this.checkInPositions([0, 3, 6], playerId) ||
      this.checkInPositions([1, 4, 7], playerId) ||
      this.checkInPositions([2, 5, 8], playerId)
    )
  }

  checkInDiagonalUpRight(playerId: PlayerId) {
    return this.checkInPositions([2, 4, 6], playerId)
  }

  checkInDiagonalUpLeft(playerId: PlayerId) {
    return this.checkInPositions([0, 4, 8], playerId)
  }

  checkInRows(playerId: PlayerId) {
    return (
      this.checkInPositions([0, 1, 2], playerId) ||
      this.checkInPositions([3, 4, 5], playerId) ||
      this.checkInPositions([6, 7, 8], playerId)
    )
  }

  checkPosition(position: number, playerId: PlayerId) {
    return this.board[position] === playerId
  }

  clearBoard() {
    this.board = new Array(9).fill('')
  }

  async fillCell(position: number) {
    const currentPlayer = 'X'
    if (this.board[position]) {
      throw new InvalidMoveError("Position already set")
    }

    if (this.totalMoves < 9) {
      this.board[position] = currentPlayer
      this.totalMoves++
    }

    const response = await this.sendBoard()
    const responseData = response.data as ServerResponse
    this.updateBoard(responseData)
  }

  updateBoard(response: ServerResponse) {
    if(!response.success) {
      throw new ServerError("Got invalid response", response)
    }
    this.board = _.flatten(response.board)
    this.totalMoves++
  }

  getFormattedBoard() {
    return _.chunk(this.board, 3)
  }

  sendBoard() {
    return axios.post(`${config.SERVER_URL}/engine`, {
      board: this.getFormattedBoard()
    })
  }

  checkWinner() {
    let winner = this.getWinner()

    if (winner || this.totalMoves === 9) {
      console.log('Winner is ', winner)
    } else {
      console.log('Waiting for next move')
    }
  }

  getWinner(): PlayerId | undefined {
    const player = 'X' //TODO
    let hasWinner =
      this.checkInRows(player) ||
      this.checkInColumns(player) ||
      this.checkInDiagonalUpRight(player) ||
      this.checkInDiagonalUpLeft(player)

    if (hasWinner) {
      return player //TODO
    }
  }
}

export default GameLogic
