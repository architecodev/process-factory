import { IProcessContext } from "./IProcessContext";
import { IProcessStorage } from "./IProcessStorage";

export type AnyPrepareData = { [key: string]: any; };
export type AnyProcessData = { [key: string]: any; };
export type AnyPrepareResult = any;
export type AnyProcessResult = any;

export interface IProcessFactory {
  createProcess: <PrepareData extends object = AnyPrepareData, ProcessData extends object = AnyProcessData, PrepareResult = AnyPrepareResult, ProcessResult = AnyProcessResult>(Process: {
    name: string;
    prepareHandler: (props: { processID: string; data?: PrepareData; }, context: IProcessContext) => Promise<PrepareResult>;
    processHandler: (props: { processID: string; data?: ProcessData; }, context: IProcessContext) => Promise<ProcessResult>;
    options?: {
      verifyException?: () => any;
      verifyProcess?: (Storage: IProcessStorage, processID: string, name: string) => Promise<boolean>;
      ttl?: number; // Default Time-to-Live: 3600
    };
  }) => {
    prepare: (processID: string, data: PrepareData) => Promise<{
      processID: string;
      name: string;
      data: PrepareResult;
    }>;
    process: (processID: string, data: ProcessData) => Promise<{
      processID: string;
      name: string;
      data?: ProcessResult;
    }>;
  };
}
