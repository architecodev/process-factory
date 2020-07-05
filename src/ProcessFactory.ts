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

          return undefined as any;
        },
        processHandler,
        options = {},
      } = Process;
      const {
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
          const isVerified = await verifyProcess(Storage, processID, name);

          if (!isVerified) {
            throw verifyException({ processID, name });
          }

          const context = Context.resolve(processID, name);
          const anyData: any = data;
          const result = await processHandler(processID, anyData, context);

          return result;
        },
      };
    },
  }),
};
