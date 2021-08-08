export type PlayerId = 'O' | 'X' | ''
export type GameBoard = string[]

export enum GameResult {
  NoWinnerYet,
  Tie,
  HumanWon,
  ComputerWon
}

class GameLogic {

  static getGameResult(board: PlayerId[]): GameResult {
    if(this.checkWinner(board, 'O')) {
      return GameResult.ComputerWon
    }else if(this.checkWinner(board, 'X')) {
      return GameResult.HumanWon
    }else if(this.isGameFinishedInTie(board)) {
      return GameResult.Tie
    }
    return GameResult.NoWinnerYet
  }

  static checkWinner(board: PlayerId[], player: PlayerId) {
    let isWinner =
      this.checkInRows(board, player) ||
      this.checkInColumns(board, player) ||
      this.checkInDiagonalUpRight(board, player) ||
      this.checkInDiagonalUpLeft(board, player)

    return !!isWinner
  }

  static isGameFinishedInTie(board: PlayerId[]) {
    for(let i=0;i<board.length;i++) {
      if(!board[i]) return false
    }
    return true
  }

  static checkInPositions(board: PlayerId[], positions: number[], playerId: PlayerId) {
    if (
      this.checkPosition(board, positions[0], playerId) &&
      this.checkPosition(board, positions[1], playerId) &&
      this.checkPosition(board, positions[2], playerId)
    ) {
      return positions
    }
  }

  static checkInColumns(board: PlayerId[], playerId: PlayerId) {
    return (
      this.checkInPositions(board, [0, 3, 6], playerId) ||
      this.checkInPositions(board, [1, 4, 7], playerId) ||
      this.checkInPositions(board, [2, 5, 8], playerId)
    )
  }

  static checkInDiagonalUpRight(board: PlayerId[], playerId: PlayerId) {
    return this.checkInPositions(board, [2, 4, 6], playerId)
  }

  static checkInDiagonalUpLeft(board: PlayerId[], playerId: PlayerId) {
    return this.checkInPositions(board, [0, 4, 8], playerId)
  }

  static checkInRows(board: PlayerId[], playerId: PlayerId) {
    return (
      this.checkInPositions(board, [0, 1, 2], playerId) ||
      this.checkInPositions(board, [3, 4, 5], playerId) ||
      this.checkInPositions(board, [6, 7, 8], playerId)
    )
  }

 static checkPosition(board: PlayerId[], position: number, playerId: PlayerId) {
    return board[position] === playerId
  }
}

export default GameLogic
