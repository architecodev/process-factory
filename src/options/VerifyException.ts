export class InvalidProcessException extends Error {
  constructor(processID: string, name: string) {
    super(`Invalid Process [ProcessID:${processID}] - Process: ${name}`);
  }
}

export const VerifyException = (props: { processID: string; name: string; }) =>
  new InvalidProcessException(props.processID, props.name);
