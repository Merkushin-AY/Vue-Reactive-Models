import type Storage from '@/types/Storage';

/**
 * Simple REST-like api
 * It calls "storage" because it is just example of data storage with async access to it.
 * It can be anything (DB, store) and anywhere (back, front) you want.
 */
class Api implements Storage {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get(url: string) {
        return await this.request(url);
    }

    async post(url: string, data?: Record<string, any>) {
        return await this.request(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : '',
        });
    }

    private async request(url: string, options?: RequestInit) {
        const response = await fetch(this.getFullUrl(url), options);
        return await response.json();
    }

    private getFullUrl(url: string) {
        return this.baseUrl + url;
    }
}

export default new Api('http://localhost:5001');