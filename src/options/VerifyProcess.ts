import { IProcessStorage } from "../IProcessStorage";

export const VerifyProcess = async (Storage: IProcessStorage, processID: string, name: string) => {
  const value = await Storage.Flow.getProcess(processID);

  return name === value;
};
