import BaseModel from './BaseModel';
import storage from '@/utils/storage';
import type { ModelData } from '@/types/Models';

export default class UserModel extends BaseModel {
    id?: number;
    username?: string;
    name?: string;
    email?: string;
    balance?: number;
    isCurrent?: boolean;

    constructor(isCurrent = false) {
        super();
        this.isCurrent = isCurrent;
    }

    isLoggedIn() {
        return !!this.id && this.isCurrent;
    }

    async login(username: string, password: string) {
        // fake login
        const userData = await storage.get(`/users?username=${username}`) as Array<ModelData<UserModel>>;
        this.set(userData[0]);
    }

    static async getAll(): Promise<UserModel[]> {
        const users = await storage.get('/users') as any[];
        return UserModel.transform(users);
    }
}