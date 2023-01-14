import type { ModelData, Constructor } from '@/types/Models';

/**
 * Base model. Every model in the project should extend this model.
 * Can become reactive by default through constructor modifying (Not recommended)
 */
export default abstract class BaseModel {

    // constructor() {
    //     return reactive(this); // Makes all models reactive by default
    // }

    set<T extends BaseModel>(this: T, data: ModelData<T>, forceSet?: boolean) {
        for (const key in data) {
            if ((!this.hasOwnProperty(key) && !forceSet) || !data.hasOwnProperty(key)) continue;
            this[key as keyof T] = data[key];
        }
        return this;
    }

    static transform<T extends BaseModel>(this: Constructor<T>, data?: ModelData<T>): T;
    static transform<T extends BaseModel>(this: Constructor<T>, data?: Array<ModelData<T>>): T[];
    static transform<T extends BaseModel>(this: Constructor<T>, data?: ModelData<T> | Array<ModelData<T>>): T | T[] {
        if (Array.isArray(data)) {
            return data.map((dataItem) => new this().set(dataItem));
        }

        const instance = new this();
        if (data) instance.set(data);
        return instance;
    }


    static transformStorageData(data: any) {
        // @ts-ignore
        return this.transform(data);
    }
}