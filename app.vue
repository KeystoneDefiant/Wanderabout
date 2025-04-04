<template>
  <div class="bg-gray-700 h-screen">
    <transition name="fade" mode="out-in">
      <component :is="currentComponent" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import CourseList from './components/CourseList.vue';
import SelectedCourse from './components/SelectedCourse.vue';
import MainMenu from './components/MainMenu.vue';
import Loading from './components/Loading.vue';
import { useCourseStore } from '@/stores/courseStore';
import { useStateStore } from '@/stores/stateStore';

const courses = useCourseStore();
const stateStore = useStateStore();

// Map state to components
const componentMap = {
  Loading,
  MainMenu,
  CourseList,
  SelectedCourse,
};

// Computed property to get the current component
const currentComponent = computed(() => componentMap[stateStore.getCurrentView] || Loading);

// Function to navigate to a new component
const navigateTo = (component: keyof typeof componentMap) => {
  console.log(`Navigating to ${component}`);
  if (componentMap[component]) {
    stateStore.setCurrentView(component);
  } else {
    console.error(`Component "${component}" does not exist in the component map.`);
  }
};

// Only load courses if the state is empty
onMounted(async () => {
  if (courses.courses.length === 0) {
    await courses.loadCourses();
  }
});
</script>

<style>
/* Fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>