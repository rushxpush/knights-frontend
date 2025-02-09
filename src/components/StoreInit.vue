<template>
  <div></div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
await authStore.initializeStore();
</script>

<style scoped></style>
