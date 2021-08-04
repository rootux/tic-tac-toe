export default class InvalidMoveError extends Error {
  private result:any
  constructor(message:string, result: any) {
    super(message);
    this.name = "InvalidMoveError"
    this.result = result
  }
}
