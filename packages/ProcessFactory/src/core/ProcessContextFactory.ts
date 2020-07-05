import {
  IProcessContext,
  IProcessStorage,
  IProcessStorageOptions,
} from "process-factory-core";

export const ProcessContextFactory = {
  createInstance: (Storage: IProcessStorage, Options: IProcessStorageOptions) => ({
    resolve: (processID: string, process: string): IProcessContext => {
      return {
        Prepare: {
          getData: async (name) => {
            return Storage.Prepare.getData(processID, name || process);
          },
          setData: async (data, options = {}) => {
            await Storage.Prepare.setData(processID, process, data, { ttl: options.ttl || Options.ttl });
          },
        },
        Process: {
          getData: async (name) => {
            return Storage.Process.getData(processID, name);
          },
          setData: async (data, options = {}) => {
            await Storage.Process.setData(processID, process, data, { ttl: options.ttl || Options.ttl });
          },
        },
        done: async (data) => {
          await Storage.Flow.doneProcess(processID);

          return {
            success: true,
            processID,
            data,
          };
        },
        error: async (error, options = {}) => {
          const {
            isErrorThrown = false,
            isFinishProcess = false,
          } = options;

          if (isErrorThrown && error) {
            await Storage.Flow.doneProcess(processID);

            throw error;
          } else if (isFinishProcess) {
            await Storage.Flow.doneProcess(processID);

            return {
              success: false,
              processID,
              error,
            };
          } else {
            return {
              processID,
              nextProcess: error && error.nextProcess ? error.nextProcess : process,
              error,
            };
          }
        },
      };
    },
  }),
};
