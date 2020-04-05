export interface IProcessStorage {
  PrepareProcess: {
    getData: (processID: string, process: string) => Promise<any>;
    setData: (processID: string, process: string, data: any) => Promise<void>;
  };
  Process: {
    getData: (processID: string, process: string) => Promise<any>;
    setData: (processID: string, process: string, data: any) => Promise<void>;
  };
  Flow: {
    getProcess: (processID: string) => Promise<string>;
    setProcess: (processID: string, process: string) => Promise<void>;
    doneProcess: (processID: string) => Promise<void>;
  };
}
