import BaseModel from '@/models/BaseModel';

export interface FilledProductModel extends ProductModel {
    id: number,
    price: number,
}

export default class ProductModel extends BaseModel implements FilledProductModel {
    id: number = 0;
    title?: string;
    description?: string;
    price: number = 0;
    image?: string;
    rating?: {
        rate: number,
        count: number,
    };
}