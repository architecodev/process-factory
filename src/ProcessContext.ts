import { IProcessContext } from "./IProcessContext";
import { IProcessStorage } from "./IProcessStorage";

export const ProcessContext = {
  compose: (Storage: IProcessStorage) => (ProcessID: string, Process: string): IProcessContext => ({
    PrepareProcess: {
      getData: async (process) =>
        Storage.PrepareProcess.getData(ProcessID, process),
      setData: async (data) =>
        Storage.PrepareProcess.setData(ProcessID, Process, data),
    },
    Process: {
      getData: async (process) =>
        Storage.Process.getData(ProcessID, process),
      setData: async (data) =>
        Storage.Process.setData(ProcessID, Process, data),
    },
    done: async () => {
      await Storage.Flow.doneProcess(ProcessID);

      return {
        data: undefined,
        process: "",
        processID: ProcessID,
      };
    },
  }),
};