export default interface Storage {
    get: (key: string, data?: Record<string, any>) => Promise<any>;
    post: (key: string, data?: Record<string, any>) => Promise<any>;
}
