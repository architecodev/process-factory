import { InvalidProcessException } from "../core/InvalidProcessException";

export const VerifyException = (props: { processID: string; name: string; }) =>
  new InvalidProcessException(props.processID, props.name);
