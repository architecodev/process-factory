import { IProcessContext } from "../IProcessContext";
import { IProcessStorage } from "../IProcessStorage";

export const ProcessContextFactory = {
  createInstance: (Storage: IProcessStorage) => ({
    resolve: (processID: string, process: string): IProcessContext => {
      return {
        Prepare: {
          getData: async (name) => {
            return Storage.Prepare.getData(processID, name || process);
          },
          setData: async (data) => {
            await Storage.Prepare.setData(processID, process, data);
          },
        },
        Process: {
          getData: async (name) => {
            return Storage.Process.getData(processID, name);
          },
          setData: async (data) => {
            await Storage.Process.setData(processID, process, data);
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
