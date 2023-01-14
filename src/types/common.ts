export type ConstructorReturnType<F> = F extends new (...args: any[]) => infer R ? R : never;

export interface Filter {
    name: string,
    value: string | number | boolean,
    type?: string,
    options?: any[],
}

export type Filters = Record<Filter['name'], Filter>;
