import BaseModel from '@/models/BaseModel';
import { computed } from 'vue';

export interface DefaultBasketItem {
    id: number,
    price: number
}

export interface BasketEntry<Item extends DefaultBasketItem> {
    item: Item,
    count: number,
    totalPrice: number,
}

export type BasketEntries<Item extends DefaultBasketItem> = {
    [key: number]: BasketEntry<Item>,
}

export default class BasketModel<Item extends DefaultBasketItem> extends BaseModel {
    entries: BasketEntries<Item> = {};
    totalPrice: number = 0;
    totalCount: number = 0;

    setTotalPrice(value: number) {
        this.totalPrice = +value.toFixed(2);
    }

    getFormattedTotalPrice() {
        return Intl.NumberFormat(navigator?.language, {currency: 'EUR'}).format(this.totalPrice);
    }

    addItem(item: Item) {
        const itemId = item.id;
        if (!this.entries[itemId]) {
            this.entries[itemId] = {
                count: 0,
                totalPrice: 0,
                item: item,
            };
        }
        this.entries[itemId].count++;
        this.entries[itemId].totalPrice = +(this.entries[itemId].totalPrice + item.price).toFixed(2);
        this.setTotalPrice(this.totalPrice + item.price);
        this.totalCount += 1;
    }

    removeItem(item: Item, all: boolean) {
        const basketEntry = this.entries[item.id];
        const currentTotalItemPrice = basketEntry.totalPrice;
        if (!basketEntry) return false;
        this.totalCount -= (all) ? basketEntry.count : 1;
        basketEntry.count = (all) ? 0 : basketEntry.count - 1;
        if (basketEntry.count <= 0) delete this.entries[item.id];
        const priceToRemove = (all) ? currentTotalItemPrice : item.price;
        basketEntry.totalPrice = +(basketEntry.totalPrice - priceToRemove).toFixed(2);
        this.setTotalPrice(this.totalPrice - priceToRemove);
    }

    clear() {
        this.entries = {};
        this.totalPrice = 0;
        this.totalCount = 0;
    }
}