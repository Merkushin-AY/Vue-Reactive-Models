<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router';
    import Auth from '@/components/common/Auth.vue';
</script>

<template>
    <header class="header">
        <nav class="header_nav">
            <RouterLink class="header_navLink" to="/">Home</RouterLink>
            <RouterLink class="header_navLink" to="/shop">Shop</RouterLink>
        </nav>
    </header>

    <Auth/>

    <Suspense>
        <RouterView/>
    </Suspense>
</template>

<style>
.header {
    line-height: 1.5;
    max-height: 100vh;
}

.header_nav {
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-top: 2rem;
}

.header_navLink.router-link-exact-active {
    color: var(--color-text);
}

.header_navLink.router-link-exact-active:hover {
    background-color: transparent;
}

.header_navLink {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

.header_navLink:first-of-type {
    border: 0;
}
</style>
