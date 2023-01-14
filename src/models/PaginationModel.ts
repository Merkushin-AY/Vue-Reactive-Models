import type BaseModel from '@/models/BaseModel';
import FilterModel from '@/models/FilterModel';
import type { Filters } from '@/types/common';

export type PaginationLogic = 'add' | 'replace';
export type FilterValues = {
    page: number,
    limit: number,
    [key: string]: any,
}


/**
 * Extend this model if u want to get pagination logic in your model
 * Logic has two types (replace or add). First for endless scrolling, second for simple pagination
 */
export default abstract class PaginationModel<Elem extends BaseModel = BaseModel> extends FilterModel<Elem> {
    logic: PaginationLogic = 'replace';
    pageElementsLimit: number;
    currentPage = 0;

    constructor(pageElementsLimit: number, logic: PaginationLogic = 'replace', filters?: Filters) {
        super(filters);
        this.pageElementsLimit = pageElementsLimit;
        this.logic = logic;
    }

    async filter(namedValues?: Record<string, any>) {
        this.currentPage = 1;
        const filterNamedValues = namedValues ? this.addPageFilters(namedValues) : this.extractFilterNamedValues(true);
        return await super.filter(filterNamedValues);
    }

    async init(): Promise<any> {
        if (!this.currentPage || !this.elements?.length) await this.goTo(1);
    }

    showElements(newElements: Elem[]) {
        if (this.logic === 'add') this.elements.push(...newElements);
        if (this.logic === 'replace') this.elements = [...newElements];
        return this.elements;
    }

    async goTo(page: number, namedValues?: Record<string, any>) {
        try {
            if (page < 1) return false;
            if (this.loading) return false;
            this.loading = true;
            this.currentPage = page;
            const filterValues = namedValues ? this.addPageFilters(namedValues) : this.extractFilterNamedValues(true);
            const newElements = await this.fetchElements(filterValues);
            this.showElements(newElements);
        } catch (e) {
        }
        this.loading = false;
        return this.elements;
    }

    async goNext() {
        return this.goTo(this.currentPage + 1);
    }

    async goPrev() {
        return this.goTo(this.currentPage - 1);
    }

    extractFilterNamedValues(withPageFilters = false): FilterValues {
        let values = super.extractFilterNamedValues();
        if (withPageFilters) values = this.addPageFilters(values);
        return values as FilterValues;
    }

    addPageFilters(filterValues: Record<string, any>): FilterValues {
        return {
            ...filterValues,
            page: this.currentPage,
            limit: this.pageElementsLimit,
        };
    }

    abstract fetchElements(filtersValues: FilterValues): Promise<Elem[]>
}
