import ShopModel from '@/models/ShopModel';
import ProductModel from '@/models/ProductModel';
import type { FilterValues } from '@/models/PaginationModel';
import storage from '@/utils/storage';


export default class ProductsShopModel extends ShopModel<ProductModel> {
    async fetchElements(filterValues: FilterValues) {
        let url = `/products?_limit=${filterValues['limit']}&_page=${filterValues['page']}`;
        const posts = await storage.get(url);
        return posts.map((post: any) => ProductModel.transformStorageData(post));
    }
}