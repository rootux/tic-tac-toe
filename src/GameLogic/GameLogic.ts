import InvalidMoveError from "../errors/InvalidMoveError";

export type PlayerId = 'O' | 'X'
export type GameBoard = Map<any, any>;

export interface IGame {
  fillSquare: (position:number) => void
  clearBoard: () => void
}

class GameLogic implements IGame {
  private board: GameBoard;

  constructor() {
    this.board = new Map();
  }

  checkInPositions(positions: number[], playerId: PlayerId) {
    if (
      this.checkPosition(positions[0], playerId) &&
      this.checkPosition(positions[1], playerId) &&
      this.checkPosition(positions[2], playerId)
    ) {
      return positions;
    }
  }

  checkInColumns(playerId: PlayerId) {
    return (
      this.checkInPositions([0, 3, 6], playerId) ||
      this.checkInPositions([1, 4, 7], playerId) ||
      this.checkInPositions([2, 5, 8], playerId)
    );
  }

  checkInDiagonalUpRight(playerId: PlayerId) {
    return this.checkInPositions([2, 4, 6], playerId);
  }

  checkInDiagonalUpLeft(playerId: PlayerId) {
    return this.checkInPositions([0, 4, 8], playerId);
  }

  checkInRows(playerId: PlayerId) {
    return (
      this.checkInPositions([0, 1, 2], playerId) ||
      this.checkInPositions([3, 4, 5], playerId) ||
      this.checkInPositions([6, 7, 8], playerId)
    );
  }

  checkPosition(position: number, playerId: PlayerId) {
    return this.board.get(position) === playerId;
  }

  clearBoard() {
    this.board.clear();
  }

  fillSquare(position: number) {
    const currentPlayer = 'X'
    if (this.board.get(position)) {
      throw new InvalidMoveError("Position already set")
    }

    if (this.board.size < 9) {
      this.board.set(position, currentPlayer);
    }
  }

  checkWinner() {
    let winner = this.getWinner();

    if (winner || this.board.size === 9) {
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

export default GameLogic;
