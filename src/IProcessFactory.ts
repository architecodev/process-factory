import { IProcess } from "./IProcess";
import { IProcessContext } from "./IProcessContext";
import { IProcessResult } from "./IProcessResult";

export interface IProcessFactory {
  create: (
    struct: {
      name: string;
      prepareStruct?: (processID: string, data: any, context: IProcessContext) => Promise<any>;
      processStruct: (processID: string, data: any, context: IProcessContext) => Promise<IProcessResult>;
    },
  ) => IProcess;
}
