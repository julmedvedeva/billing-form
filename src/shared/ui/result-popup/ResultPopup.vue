<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/40 z-50 z-9999"
  >
    <div
      class="bg-white rounded-2xl shadow-lg p-6 w-[320px] text-center transition-all"
    >
      <h2
        :class="[
          'text-lg font-semibold mb-4',
          type === 'success' ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ type === 'success' ? 'Успешно!' : 'Ошибка' }}
      </h2>

      <p class="mb-6 text-gray-700">{{ message }}</p>

      <button
        @click="closePopup"
        class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        Закрыть
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePopup } from '@/shared/lib/composables/usePopup'

const { isOpen, message, type, closePopup } = usePopup()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
