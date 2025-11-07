<template>
  <nav class="w-64 bg-gray-100 p-6 flex flex-col gap-4">
    <RouterLink
      to="/"
      class="px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
      active-class="bg-gray-300 font-semibold"
    >
      Home
    </RouterLink>
    <RouterLink
      to="/chamber-of-secrets"
      class="px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
      active-class="bg-gray-300 font-semibold"
    >
      Chamber of Secrets
    </RouterLink>
  </nav>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<style scoped></style>
