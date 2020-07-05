export interface IProcessStorageOptions {
  ttl: number;
}

export interface IProcessStorage {
  Prepare: {
    getData: (processID: string, name: string) => Promise<any>;
    setData: (processID: string, name: string, data: any, options: IProcessStorageOptions) => Promise<void>;
  };
  Process: {
    getData: (processID: string, name: string) => Promise<any>;
    setData: (processID: string, name: string, data: any, options: IProcessStorageOptions) => Promise<void>;
  };
  Flow: {
    getProcess: (processID: string) => Promise<string>;
    setProcess: (processID: string, name: string, options: IProcessStorageOptions) => Promise<void>;
    doneProcess: (processID: string) => Promise<void>;
  };
}
