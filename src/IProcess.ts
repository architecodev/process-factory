import { IProcessResult } from "./IProcessResult";

export interface IProcess {
  prepareProcess: (processID?: string, data?: any) => Promise<IProcessResult>;
  process: (processID: string, data: any) => Promise<IProcessResult>;
}
