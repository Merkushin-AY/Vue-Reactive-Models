import ArticleModel from '@/models/ArticleModel';
import storage from '@/utils/storage';
import PaginationModel from '@/models/PaginationModel';
import type { FilterValues } from '@/models/PaginationModel';
import type { Filters } from '@/types/common';
import UserModel from '@/models/UserModel';

export default class BlogModel extends PaginationModel<ArticleModel> {
    constructor(pageElementsLimit = 10, filters?: Filters) {
        super(pageElementsLimit, 'replace', filters || {
            search: {
                name: 'search',
                value: '',
            },
            userId: {
                name: 'userId',
                value: '',
                options: [] as UserModel[],
            },
        });
    }

    async init() {
        return await Promise.all([
            super.init(),
            (this.filters.userId && !this.filters.userId.options?.length) ? this.fetchUsersForFilter() : Promise.resolve(),
        ]);
    }

    async fetchElements(filterValues: FilterValues) {
        let url = `/posts?_limit=${filterValues['limit']}&_page=${filterValues['page']}`;
        if (filterValues.userId) url += `&userId=${filterValues.userId}`;
        if (filterValues.search) url += `&title_like=${filterValues.search}`;
        const posts = await storage.get(url);
        return posts.map((post: any) => ArticleModel.transformStorageData(post));
    }

    async fetchUsersForFilter() {
        this.filters.userId.options = await UserModel.getAll();
    }
}