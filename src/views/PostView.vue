<script setup lang="ts">
    import { reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import ArticleModel from '@/models/ArticleModel';

    const route = useRoute();

    const article = reactive(new ArticleModel());
    article.fetchDataById(+route.params.id);
</script>

<template>
    <div>
        <h1>{{ article.title }}</h1>
        <p>{{ article.text }}</p>
    </div>
</template>
