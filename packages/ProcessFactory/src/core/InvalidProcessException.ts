export class InvalidProcessException extends Error {
  public code: string;
  public description: string;

  constructor(processID: string, name: string, nextProcess: string) {
    super(`Calling Invalid Process: '${name}' - [ProcessID: ${processID}]`);

    Object.defineProperties(this, {
      code: {
        configurable: false,
        enumerable: true,
        value: "INVALID_PROCESS",
        writable: false,
      },
      description: {
        configurable: false,
        enumerable: true,
        value: this.message,
        writable: false,
      },
      name: {
        configurable: false,
        enumerable: true,
        value: "InvalidProcessException",
        writable: false,
      },
      nextProcess: {
        configurable: false,
        enumerable: false,
        value: nextProcess,
        writable: false,
      },

    })
  }
}
