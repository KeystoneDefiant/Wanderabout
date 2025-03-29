<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import CourseList from './components/CourseList.vue';
import SelectedCourse from './components/SelectedCourse.vue';
import MainMenu from './components/MainMenu.vue';
import { useCourseStore } from '@/stores/courseStore';
import { useStateStore } from '@/stores/stateStore';

const courses = useCourseStore();
const stateStore = useStateStore();

// Map state to components
const componentMap = {
  MainMenu,
  CourseList,
  SelectedCourse,
};

// Computed property to get the current component
const currentComponent = computed(() => componentMap[stateStore.getCurrentView] || MainMenu);

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
    console.log('no courses, loading them thangs');
    await courses.loadCourses();
  }
});

</script>

<style>
body {
  background-color: #3d3d3d;
}
</style>