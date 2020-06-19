export interface IProcessStorage {
  Prepare: {
    getData: (processID: string, name: string) => Promise<any>;
    setData: (processID: string, name: string, data: any) => Promise<void>;
  };
  Process: {
    getData: (processID: string, name: string) => Promise<any>;
    setData: (processID: string, name: string, data: any) => Promise<void>;
  };
  Flow: {
    getProcess: (processID: string) => Promise<string>;
    setProcess: (processID: string, name: string) => Promise<void>;
    doneProcess: (processID: string) => Promise<void>;
  };
}
