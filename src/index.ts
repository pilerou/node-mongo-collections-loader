import { MongoClient } from 'mongodb';

export interface InstanceDescription {
     id: string;
     collections: string[];
}

export interface DbConfig {
    url: string;
    options?: object;
}

export interface DbConfigMap {
    [key: string]: DbConfig;
}

export const MongoCollectionsLoader = mongoCollectionsLoader;

async function mongoCollectionsLoader (dbsConfig:  DbConfigMap, instancesDescription: InstanceDescription[]) {
    const mongoInstances = {};
    for(const instance of instancesDescription) {
        const instanceDbconfig = dbsConfig[instance.id];
        const client = await MongoClient.connect(instanceDbconfig.url, instanceDbconfig.options)
        mongoInstances[instance.id] = {
            closeDb: () => client.close(),
        };
        const instanceObj = mongoInstances[instance.id];
        for(const collectionName of instance.collections) {
            instanceObj[collectionName] = client.db(instance.id)
                .collection(collectionName);
        }
    }
    return mongoInstances;
};