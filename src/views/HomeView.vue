<script setup lang="ts">
    import { watch } from 'vue';
    import BlogModel from '@/models/BlogModel';
    import Pagination from '@/components/common/Pagination.vue';
    import { makeGlobalReactiveModel, currentUser } from '@/globalModels';

    // global models allow us to save data when leaving the page
    const blog = makeGlobalReactiveModel('blog', BlogModel);
    blog.init(); // get first elements and fetch users for filter

    // every time when some value has changed or new filter has added, blog will refetch elements
    watch(() => blog.extractFilterNamedValues(), () => blog.filter()); // it is should be debounced, don't use in production straightway

    function filterByUser(id: number) {
        // clean user filer if click target is selected element
        blog.filters.userId.value = blog.filters.userId.value === id ? '' : id;
    }
</script>

<template>
    <main>
        <h1 class="mb16">Blog</h1>
        <div class="mb16" v-if="blog.filters.userId.options?.length">
            Filter by author:
            <button v-for="user in blog.filters.userId.options" @click="filterByUser(user.id)">
                {{ (currentUser.id === user.id) ? 'My articles' : user.name }}
                {{ user.id === blog.filters.userId.value ? '*' : '' }}
            </button>
        </div>
        <div class="mb8">
            Search by name:
            <input v-model="blog.filters.search.value"/>
        </div>

        <div class="mb16">
            <div class="mb8" v-for="article in blog.elements">
                <div>
                    {{ article.title }}
                </div>
                <div>
                    {{ article.likes }}
                    <button @click="() => article.toggleLike()">{{
                            article.isLikedByCurrentUser ? 'Dislike' : 'Like'
                        }}
                    </button>
                </div>
                <div>
                    <RouterLink :to="`/posts/${article.id}`">Read</RouterLink>
                    <span v-if="currentUser.id && currentUser.id === article.id">You are the author</span>
                </div>

            </div>
        </div>

        <div v-show="blog.loading">
            Loading...
        </div>
        <Pagination v-show="!blog.loading" :paginationModel="blog"/>
    </main>
</template>
