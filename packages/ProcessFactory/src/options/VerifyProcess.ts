import { IProcessStorage } from "process-factory-core";

export const VerifyProcess = async (Storage: IProcessStorage, processID: string, name: string) => {
  const value = await Storage.Flow.getProcess(processID);

  return {
    isVerified: name === value,
    nextProcess: value,
  };
};
