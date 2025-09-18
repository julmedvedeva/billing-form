<template>
  <NavigationComponent />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from '@/components/NavigationComponent.vue'
</script>
