<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-3">
    <div class="flex flex-col items-center">
      <!-- Spinner -->
      <div class="loader mb-4"></div>
      <!-- Loading Text -->
      <p class="text-lg font-semibold text-gray-700">Now Loading...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStateStore } from '@/stores/stateStore';
const stateStore = useStateStore();

onMounted(() => {
  stateStore.setCurrentView("MainMenu");
});
</script>

<style scoped>
/* Spinner styles */
.loader {
  border: 4px solid #e5e7eb; /* Light gray */
  border-top: 4px solid #3b82f6; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>