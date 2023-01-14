<script setup lang="ts">
    import type PaginationModel from '@/models/PaginationModel';

    const props = defineProps<{
      paginationModel: PaginationModel,
    }>();
</script>

<template>
    <div>
        <button @click="props.paginationModel.goPrev()">Prev page</button>
        <span>{{ props.paginationModel.currentPage }}</span>
        <button @click="props.paginationModel.goNext()">Next page</button>
    </div>
</template>
