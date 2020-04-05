import * as UUID from "uuid";
import { IProcessFactory } from "./IProcessFactory";
import { IProcessStorageConfigs } from "./IProcessStorageConfigs";
import { IProcessStorageFactory } from "./IProcessStorageFactory";
import { ProcessContext } from "./ProcessContext";

export const ProcessFactory = {
  setup: (StorageFactory: IProcessStorageFactory, configs: IProcessStorageConfigs): IProcessFactory => {
    const Storage = StorageFactory.setup(configs);
    const Context = ProcessContext.compose(Storage);

    return {
      create: (struct) => {
        const {
          name,
          prepareStruct,
          processStruct,
        } = struct;

        return {
          prepareProcess: async (processID, data) => {
            processID = processID || UUID.v4();
            let response;

            if (prepareStruct) {
              response = await prepareStruct(processID, data, Context(processID, name));
            }

            return {
              data: response,
              processID,
              process: name,
            };
          },
          process: async (processID, data) => {
            const response = await processStruct(processID, data, Context(processID, name));
            await Storage.Flow.setProcess(processID, response.process);

            return response;
          },
        }
      },
    };
  },
};