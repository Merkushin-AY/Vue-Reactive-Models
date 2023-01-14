import type BaseModel from '@/models/BaseModel';
import { reactive } from 'vue';
import UserModel from '@/models/UserModel';
import type { ConstructorReturnType } from '@/types/common';


/**
 * Map contains models that available globally for all components on any page.
 * If u want to save your data between pages just use makeGlobalReactiveModel function
 */
const globalModels: Record<string, BaseModel> = {};
export default globalModels;

export function makeGlobalReactiveModel<
    Constructor extends new (...args: any[]) => BaseModel,
    Model extends ConstructorReturnType<Constructor>,
> (key: string): Model | false

export function makeGlobalReactiveModel<
    Constructor extends new (...args: any[]) => BaseModel,
    Model extends ConstructorReturnType<Constructor>,
> (key: string, defaultConstructor: Constructor, ...constructorParams: ConstructorParameters<Constructor>): Model

export function makeGlobalReactiveModel<
    Constructor extends new (...args: any[]) => BaseModel,
    Model extends ConstructorReturnType<Constructor>,
> (key: string, defaultConstructor?: Constructor, ...constructorParams: ConstructorParameters<Constructor>) {
    const globalModel = globalModels[key];
    if (globalModel) return globalModel;
    if (!defaultConstructor) return false;
    const newModel = reactive(new defaultConstructor(...constructorParams));
    globalModels[key] = newModel;
    return newModel;
}


/**
 * Some initial global models can be created straightway.
 */

const currentUser = makeGlobalReactiveModel('currentUser', UserModel, true);
export { currentUser };