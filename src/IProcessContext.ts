export interface IProcessContextOptions {
  ttl?: number;
}

export interface IProcessContext {
  Prepare: {
    getData: (name?: string) => Promise<any>;
    setData: (data: any, options?: IProcessContextOptions) => Promise<void>;
  };
  Process: {
    getData: (name: string) => Promise<any>;
    setData: (data: any, options?: IProcessContextOptions) => Promise<void>;
  };
  done: () => Promise<{
    processID: string;
    name: string;
  }>;
}
