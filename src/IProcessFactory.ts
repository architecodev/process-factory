import { IProcessContext } from "./IProcessContext";
import { IProcessStorage } from "./IProcessStorage";

export type AnyPrepareData = any;
export type AnyProcessData = any;
export type AnyPrepareResult = any;
export type AnyProcessResult = any;

export interface IProcessFactory {
  createProcess: <PrepareData = AnyPrepareData, ProcessData = AnyProcessData, PrepareResult = AnyPrepareResult, ProcessResult = AnyProcessResult>(Process: {
    name: string;
    prepareHandler: (processID: string, data: PrepareData | undefined, context: IProcessContext) => Promise<PrepareResult>;
    processHandler: (processID: string, data: ProcessData | undefined, context: IProcessContext) => Promise<ProcessResult>;
    options?: {
      verifyException?: () => any;
      verifyProcess?: (Storage: IProcessStorage, processID: string, name: string) => Promise<boolean>;
      ttl?: number; // Default Time-to-Live: 3600
    };
  }) => {
    prepare: (processID: string, data?: PrepareData) => Promise<{
      processID: string;
      name: string;
      data: PrepareResult;
    }>;
    process: (processID: string, data?: ProcessData) => Promise<{
      processID: string;
      name: string;
      data?: ProcessResult;
    }>;
  };
}
