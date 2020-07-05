import { InvalidProcessException } from "../core/InvalidProcessException";

export const VerifyException = (props: { processID: string; name: string; nextProcess: string; }) =>
  new InvalidProcessException(props.processID, props.name, props.nextProcess);
