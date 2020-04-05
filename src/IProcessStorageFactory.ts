import { IProcessStorage } from "./IProcessStorage";
import { IProcessStorageConfigs } from "./IProcessStorageConfigs";

export interface IProcessStorageFactory {
  setup: (configs: IProcessStorageConfigs) => IProcessStorage;
}
