import BaseModel from './BaseModel';
import type UserModel from './UserModel';
import type { ModelData } from '@/types/Models';
import storage from '@/utils/storage';

export default class ArticleModel extends BaseModel {
    id: number | undefined;
    author?: UserModel;
    title: string = '';
    text: string = '';
    likes: number = 0;
    isLikedByCurrentUser?: boolean;

    toggleLike() {
        if (this.isLikedByCurrentUser) {
            this.removeLike();
        } else {
            this.addLike();
        }
    }

    addLike() {
        if (this.isLikedByCurrentUser) return;
        this.likes++;
        this.isLikedByCurrentUser = true;
    }

    removeLike() {
        if (!this.isLikedByCurrentUser) return;
        this.likes--;
        this.isLikedByCurrentUser = false;
    }

    async fetchDataById(id: number) {
        return this.set(await ArticleModel.fetchFromStorage(id));
    }


    static async fetchById(id: number) {
        return ArticleModel.transform(await this.fetchFromStorage(id));
    }

    static async fetchFromStorage(id: number) {
        return this.prepareStorageData(await storage.get(`/posts/${id}`));
    }

    static transformStorageData(data: Record<string, any>) {
        return this.transform(this.prepareStorageData(data));
    }

    static prepareStorageData(data: Record<string, any>): ModelData<ArticleModel> {
        return {
            id: data.id,
            title: data.title,
            text: data.body,
            likes: data.likes || 0,
        };
    }
}