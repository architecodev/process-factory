import { IProcessResult } from "./IProcessResult";

export interface IProcessContext {
  PrepareProcess: {
    getData: (process?: string) => Promise<any>;
    setData: (data: any) => Promise<void>;
  };
  Process: {
    getData: (process: string) => Promise<any>;
    setData: (data: any) => Promise<void>;
  };
  done: () => Promise<IProcessResult>;
}
