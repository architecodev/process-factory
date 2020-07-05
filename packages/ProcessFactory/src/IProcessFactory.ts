import { IProcessContext } from "./IProcessContext";
import { IProcessStorage } from "./IProcessStorage";

export type AnyPrepareData = any;
export type AnyProcessData = any;
export type AnyPrepareResult = any;
export type AnyProcessResult = any;

export interface IProcessFactory {
  createProcess: <PrepareData = AnyPrepareData, ProcessData = AnyProcessData>(Process: {
    name: string;
    prepareHandler?: (processID: string, data: PrepareData, context: IProcessContext) => Promise<any>;
    processHandler: (processID: string, data: ProcessData, context: IProcessContext) => Promise<any>;
    options?: {
      isErrorThrown?: boolean;
      isFinishProcess?: boolean;
      ttl?: number;  // DEFAULT ttl (Time-to-Live): 3600
      verifyException?: () => any;
      verifyProcess?: (Storage: IProcessStorage, processID: string, name: string) => Promise<{ isVerified: boolean; nextProcess: string; }>;
    };
  }) => {
    prepare: (props?: { processID?: string; data?: PrepareData; }) => Promise<{
      processID: string;
      nextProcess: string;
      data?: any;
    }>;
    process: (props: { processID: string; data?: ProcessData; }) => Promise<any>;
  };
}
