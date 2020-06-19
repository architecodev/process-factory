export interface IProcessContext {
  Prepare: {
    getData: (name?: string) => Promise<any>;
    setData: (data: any) => Promise<void>;
  };
  Process: {
    getData: (name: string) => Promise<any>;
    setData: (data: any) => Promise<void>;
  };
  done: () => Promise<{
    processID: string;
    name: string;
  }>;
}
