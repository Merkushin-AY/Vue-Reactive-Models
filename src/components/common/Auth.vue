<script setup lang="ts">
    import { ref } from 'vue';
    import { currentUser } from '@/globalModels';
    const login = ref('');
    const password = ref('');

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        currentUser.login(login.value, password.value);
    }
</script>

<template>
    <div>
        <form v-if="!currentUser.isLoggedIn()" @submit="handleSubmit">
            <input type="text" name="login" placeholder="Login" v-model="login"/>
            <input type="password" name="password" placeholder="Password" v-model="password"/>
            <button type="submit">Log in</button>
            <p>Try login "Bret". Password is unnecessary.</p>
        </form>
        <div v-else>
            Hello, {{ currentUser.name }}
        </div>
    </div>
</template>