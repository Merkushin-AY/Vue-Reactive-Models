import BaseModel from '@/models/BaseModel';
import type { Filters } from '@/types/common';


/**
 * Extend this model if you want to filter list of some elements
 * Inheritor must implement fetchElements method, which returns array of elements
 */
export default abstract class FilterModel<Elem extends BaseModel> extends BaseModel {
    elements: Elem[] = []; // current visible elements
    filters: Filters = {};
    loading = false;

    constructor(filters: Filters = {}) {
        super();
        this.filters = filters;
    }

    async filter(namedValues?: Record<string, any>) {
        try {
            const filterNamedValues = namedValues || this.extractFilterNamedValues();
            this.loading = true;
            this.elements = await this.fetchElements(filterNamedValues);
        } catch (e: any) {}

        this.loading = false;
        return this.elements;
    }

    extractFilterNamedValues() {
        const namedValues: Record<string, any> = {};
        Object.values(this.filters).forEach((filter) => namedValues[filter.name] = filter.value);
        return namedValues;
    }

    abstract fetchElements(filtersValues: Record<string, any>): Promise<Elem[]>
}
