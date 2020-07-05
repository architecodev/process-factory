export interface IProcessContextOptions {
  ttl?: number;
}

export interface IProcessContext {
  Prepare: {
    getData: <Data = any>(name?: string) => Promise<Data>;
    setData: (data: any, options?: IProcessContextOptions) => Promise<void>;
  };
  Process: {
    getData: <Data = any>(name: string) => Promise<Data>;
    setData: (data: any, options?: IProcessContextOptions) => Promise<void>;
  };
  done: <IData = any>(data?: IData) => Promise<{
    success: true;
    processID: string;
    data?: IData;
  }>;
  error: (
    error?: any,
    options?: {
      isErrorThrown?: boolean;
      isFinishProcess?: boolean;
    }
  ) => Promise<{
    success: false;
    processID: string;
    error?: any;
  } | {
    processID: string;
    nextProcess: string;
    error?: any;
  }>;
}
