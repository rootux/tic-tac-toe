export default class ServerError extends Error {
  private result:any
  constructor(message:string, result: any) {
    super(message);
    this.name = "ServerError"
    this.result = result
  }
}
