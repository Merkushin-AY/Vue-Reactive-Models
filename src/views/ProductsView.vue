<script setup lang="ts">
    import ProductsShopModel from '@/models/ProductsShopModel';
    import Pagination from '@/components/common/Pagination.vue';
    import { makeGlobalReactiveModel } from '@/globalModels';

    const shop = makeGlobalReactiveModel('productsShop', ProductsShopModel);
    shop.init();
</script>

<template>
    <div class="flex">
        <div>
            <div class="mb16">
                <div v-for="element in shop.elements">
                    <h3>{{ element.title }}</h3>
                    <div>
                        <b>{{ element.price }}</b>
                        <button @click="() => shop.basket.addItem(element)">Buy</button>
                    </div>
                </div>
            </div>
            <Pagination :paginationModel="shop"/>
        </div>

        <div class="mb16">
            <h3>Basket</h3>
            <div class="mb16">
                <b>
                    totalPrice: {{ shop.basket.getFormattedTotalPrice() }} <br>
                    totalCount: {{ shop.basket.totalCount }}
                </b>
            </div>
            <div>
                <div v-for="entry in shop.basket.entries">
                    {{ entry.item.title }}({{ entry.count }}): {{ entry.totalPrice }}
                </div>
            </div>
        </div>
    </div>
</template>