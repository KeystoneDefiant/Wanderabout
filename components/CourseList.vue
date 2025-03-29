<template>
  <div class="relative">
    <!-- Fixed pane at the top -->
    <div class="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
      <div class="flex justify-between items-center">
        <p class="text-lg font-semibold">Course List</p>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          @click="allEnable"
        >
          Enable All
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          @click="allDisable"
        >
          Disable All
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          @click="closePane"
        >
          Close
        </button>
      </div>
    </div>

    <!-- Main content -->
    <div class="p-4 pt-20">
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          class="bg-white shadow-md rounded-lg p-1 border border-gray-200 flex flex-col"
          v-for="courseGroup in courseStore.getGroupedByFriendlyName"
          :key="courseGroup.friendlyName"
        >
          <p class="text-lg font-semibold mb-4 text-center">{{ courseGroup.friendlyName }}</p>
          <div class="flex flex-col sm:flex-row sm:justify-between gap-4 mt-auto">
            <button
              :class="[
                'px-4 py-2 rounded text-sm font-semibold',
                courseGroup.normal?.enabled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
              ]"
              @click="toggleCourse(courseGroup.normal)"
            >
              Normal
            </button>
            <button
              :class="[
                'px-4 py-2 rounded text-sm font-semibold',
                courseGroup.hard?.enabled ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700',
              ]"
              @click="toggleCourse(courseGroup.hard)"
            >
              Hard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCourseStore, type Course } from '@/stores/courseStore';
import { useStateStore } from '@/stores/stateStore';

const courseStore = useCourseStore();
const stateStore = useStateStore();

const toggleCourse = (course?: Course) => {
  if (course) {
    courseStore.toggleCourse(course.id, !course.enabled);
    console.log(courseStore.getCourseById(course.id));
  }
};

const allEnable = () => {
  courseStore.courses.forEach((course) => {
    if (!course.enabled) {
      courseStore.toggleCourse(course.id, true);
    }
  });
};

const allDisable = () => {
  courseStore.courses.forEach((course) => {
    if (course.enabled) {
      courseStore.toggleCourse(course.id, false);
    }
  });
};

const closePane = () => {
  stateStore.setCurrentView("MainMenu");
};

onMounted(() => {
  console.log('CourseList mounted');
  console.log(courseStore.getGroupedByFriendlyName);
});
</script>

<style scoped>
</style>