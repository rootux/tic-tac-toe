export default class TicTacToeError extends Error {
  constructor(message:string) {
    super(message);
    this.name = "TicTacToeError"
  }
}
