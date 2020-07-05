import * as UUID from "uuid";
import { IProcessFactory } from "./IProcessFactory";
import { IProcessStorage, IProcessStorageOptions } from "./IProcessStorage";
import { ProcessContextFactory } from "./core/ProcessContextFactory";
import { VerifyException, VerifyProcess } from "./options";

export const ProcessFactory = {
  createInstance: (Storage: IProcessStorage): IProcessFactory => ({
    createProcess: (Process) => {
      const {
        name,
        prepareHandler = async (proccesID, data, context) => {
          if (data) {
            await context.Prepare.setData(data);
          }
        },
        processHandler,
        options = {},
      } = Process;
      const {
        isErrorThrown = false,
        isFinishProcess = false,
        ttl = 3600,
        verifyException = VerifyException,
        verifyProcess = VerifyProcess,
      } = options;
      const Options: IProcessStorageOptions = {
        ttl,
      };
      const Context = ProcessContextFactory.createInstance(Storage, Options);

      return {
        prepare: async ({ processID = UUID.v4(), data } = {}) => {
          await Storage.Flow.setProcess(processID, name, Options);
          const context = Context.resolve(processID, name);
          const anyData: any = data;
          const result = await prepareHandler(processID, anyData, context);

          return {
            processID,
            nextProcess: name,
            data: result,
          };
        },
        process: async ({ processID = UUID.v4(), data }) => {
          const context = Context.resolve(processID, name);

          if (!isFinishProcess) {
            const { isVerified, nextProcess } = await verifyProcess(Storage, processID, name);

            if (!isVerified) {
              const error = verifyException({ processID, name, nextProcess });

              if (isErrorThrown) {
                throw error;
              } else {
                return context.error(error);
              }
            }
          }

          const anyData: any = data;
          const result = await processHandler(processID, anyData, context);

          return result;
        },
      };
    },
  }),
};
