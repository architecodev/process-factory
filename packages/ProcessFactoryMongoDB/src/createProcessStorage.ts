import * as MongoDB from "mongodb";
import { IProcessStorage } from "process-factory-core";

const resolveExpiredAt = (options: { ttl: number; }) => {
  const now = Date.now();

  return new Date(now + (options.ttl * 1000));
};

export const createProcessStorage = (flow: string, Collection: () => Promise<MongoDB.Collection>): IProcessStorage => ((): IProcessStorage => {
  let COLLECTION: any;

  const ResolveCollection = async (): Promise<MongoDB.Collection> => {
    if (!COLLECTION) {
      COLLECTION = await Collection();
      await COLLECTION.createIndex({
        expiredAt: 1,
      }, {
        expireAfterSeconds: 0,
        name: "expiredAt",
      });
    }

    return COLLECTION;
  };

  return {
    Flow: {
      doneProcess: async (processID) => {
        const collection = await ResolveCollection();
        await collection.deleteOne({ _id: processID });
      },
      getProcess: async (processID) => {
        const collection = await ResolveCollection();
        const data = await collection.findOne({ _id: processID }, { projection: { _id: 1, name: 1 } });

        if (data) {
          return data.name;
        } else {
          return "";
        }
      },
      setProcess: async (processID, name, options) => {
        const collection = await ResolveCollection();
        const expiredAt = resolveExpiredAt(options);
        await collection.updateOne({
          _id: processID,
        }, {
          $set: {
            flow,
            name,
            expiredAt,
          },
        }, {
          upsert: true,
        });
      },
    },
    Prepare: {
      getData: async (processID, name) => {
        const collection = await ResolveCollection();
        const data = await collection.findOne({
          _id: processID,
        });

        return data && data[name] && data[name].prepare ? data[name].prepare : undefined;
      },
      setData: async (processID, name, data, options) => {
        const collection = await ResolveCollection();
        const expiredAt = resolveExpiredAt(options);
        const prop = `${name}.prepare`;
        await collection.updateOne({
          _id: processID,
        }, {
          $set: {
            [prop]: data,
            expiredAt,
          },
        }, {
          upsert: true,
        });
      },
    },
    Process: {
      getData: async (processID, name) => {
        const collection = await ResolveCollection();
        const data = await collection.findOne({
          _id: processID,
        });

        return data && data[name] && data[name].process ? data[name].process : undefined;
      },
      setData: async (processID, name, data, options) => {
        const collection = await ResolveCollection();
        const expiredAt = resolveExpiredAt(options);
        const prop = `${name}.process`;
        await collection.updateOne({
          _id: processID,
        }, {
          $set: {
            [prop]: data,
            expiredAt,
          },
        }, {
          upsert: true,
        });
      },
    },
  };
})();
