<template>
  <div class="relative bg-gray-700">
    <!-- Fixed pane at the top -->
    <div class="fixed top-0 left-0 w-full bg-gray-600 text-white p-4 shadow-lg z-50">
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
          class="bg-gray-200 shadow-md rounded-lg px-2 py-1 border border-gray-600 flex flex-col"
          v-for="courseGroup in courseStore.getGroupedByFriendlyName"
          :key="courseGroup.friendlyName"
        >
          <p class="text-lg font-semibold mb-4 text-center">{{ courseGroup.friendlyName }}</p>
          <div class="flex flex-col sm:flex-row sm:justify-between gap-4 mt-auto px-4 py-2">
            <button
              :class="[
                'px-4 py-2 rounded text-sm font-semibold',
                courseGroup.normal?.enabled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 text-gray-700'
              ]"
              @click="toggleCourse(courseGroup.normal)"
            >
              Normal
            </button>
            <button
              :class="[
                'px-4 py-2 rounded text-sm font-semibold',
                courseGroup.hard?.enabled ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 hover:bg-gray-500 text-gray-700',
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

</script>

<style scoped>
</style>