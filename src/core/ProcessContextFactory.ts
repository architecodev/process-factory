import { IProcessContext } from "../IProcessContext";
import { IProcessStorage, IProcessStorageOptions } from "../IProcessStorage";

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
        done: async () => {
          await Storage.Flow.doneProcess(processID);

          return {
            processID,
            name: "COMPLETED",
          };
        },
      };
    },
  }),
};
