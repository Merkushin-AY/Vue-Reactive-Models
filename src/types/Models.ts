export interface Constructor<M> {
    new(...args: any[]): M;
}

export type ModelData<M> = {
    [P in keyof M as M[P] extends (...args: any[]) => any ? never : P]: M[P];
}