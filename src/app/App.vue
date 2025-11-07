<template>
  <div class="flex min-h-screen">
    <NavigationComponent />
    <main class="flex-1 p-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from '@/shared/ui/navigation/NavigationComponent.vue'
</script>
