export class InvalidProcessException extends Error {
  constructor(public processID: string, public process: string) {
    super(`Invalid Process [ProcessID:${processID}] - Process: ${process}`);

    this.name = "InvalidProcess";
  }
}
