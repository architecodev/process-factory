import * as UUID from "uuid";
import { IProcessFactory } from "./IProcessFactory";
import { IProcessStorage } from "./IProcessStorage";
import { ProcessContextFactory } from "./core/ProcessContextFactory";
import { VerifyException, VerifyProcess } from "./options";

export const ProcessFactory = {
  createInstance: (Storage: IProcessStorage): IProcessFactory => {
    return {
      createProcess: (Process) => {
        const { name, prepareHandler, processHandler, options = {} } = Process;
        const Context = ProcessContextFactory.createInstance(Storage);

        return {
          prepare: async (processID = UUID.v4(), data) => {
            await Storage.Flow.setProcess(processID, name);
            const context = Context.resolve(processID, name);
            const result = await prepareHandler(processID, data, context);

            return {
              processID,
              name,
              data: result,
            };
          },
          process: async (processID, data) => {
            const {
              verifyException = VerifyException,
              verifyProcess = VerifyProcess,
            } = options;

            const isVerified = await verifyProcess(Storage, processID, name);

            if (!isVerified) {
              throw verifyException({ processID, name });
            }

            const context = Context.resolve(processID, name);
            const result = await processHandler(processID, data, context);

            return {
              processID,
              name,
              data: result,
            };
          },
        };
      },
    };
  },
};
