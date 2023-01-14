import PaginationModel from '@/models/PaginationModel';
import type { Filters } from '@/types/common';
import BasketModel from '@/models/BasketModel';
import type BaseModel from '@/models/BaseModel';
import storage from '@/utils/storage';

/**
 * This is model for store (shop) creation.
 * If you want to have different stores with one basket, pass custom BasketModel in constructor.
 */
export default abstract class ShopModel<Elem extends BaseModel & { id: number, price: number }> extends PaginationModel<Elem> {
    basket: BasketModel<Elem>;

    constructor(pageElementsLimit = 10, filters?: Filters, basket?: BasketModel<Elem>) {
        super(pageElementsLimit, 'replace', filters);
        this.basket = basket || new BasketModel();
    }

    async buy() {
        // fake purchase
        if (this.basket.totalPrice <= 0) return false;
        // here currentUser balance can be changed
        const result: any = await storage.post('/buy', Object.values(this.basket.entries));
        if (!result?.success) return false;
        this.basket.clear();
        return true;
    }
}