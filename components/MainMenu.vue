<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 px-3">

    <div class="flex justify-center items-center mt-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">Walkabout Rando 3000</h1>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!enabledCourseCount"
        @click="getCourse()"
      >
        Randomize Any Course <span class="badge bg-blue-900 text-white px-2 rounded-full ml-2">{{enabledCourseCount}}</span>
      </button>
      <button
        class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!enabledNormalCount"
        @click="getCourse('Normal')"
      >
        Randomize Normal Course <span class="badge bg-green-900 text-white px-2 rounded-full ml-2">{{enabledNormalCount}}</span>
      </button>
      <button
        class="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="!enabledHardCount"
        @click="getCourse('Hard')"
      >
        Randomize Hard Course <span class="badge bg-purple-900 text-white px-2 rounded-full ml-2">{{enabledHardCount}}</span>
      </button>
    </div>
    <div class="flex justify-center items-center mt-8">
      <button
        class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded shadow-md"
        @click="configureCourses"
      >
        Configure Courses
      </button>
    </div>
    <div class="justify-center items-center mt-8">
      <p class="text-gray-500 mb-3 text-center">
        Courses selected by the randomizer will be disabled and will not be added to the randomization pool.
      </p>

      <p class="text-gray-500 mb-3 text-center">
        Enabled and Disabled Courses will be saved to your local browser storage and will persist across sessions.
      </p>

      <p class="text-gray-500 mb-3 text-center">
        You can enable and disable courses manually in the Configure Courses menu.
      </p>
    </div>  
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCourseStore } from '@/stores/courseStore';
import { useStateStore } from '@/stores/stateStore';

const courseStore = useCourseStore();
const stateStore = useStateStore();

// Computed property to check if there are enabled courses
const enabledCourseCount = computed(() => courseStore.getAllEnabledCourses.length);
const enabledNormalCount = computed(() => courseStore.getAllEnabledCoursesByDifficulty("Normal").length);
const enabledHardCount = computed(() => courseStore.getAllEnabledCoursesByDifficulty("Hard").length);

const getCourse = (difficulty?: string) => {
  const courses = difficulty != null ? courseStore.getAllEnabledCoursesByDifficulty(difficulty) : courseStore.getAllEnabledCourses;
  if (courses.length > 0) {
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    courseStore.toggleCourse(randomCourse.id, false);
    console.log(`Random ${difficulty} Course:`, randomCourse);
    stateStore.setSelectedCourse(randomCourse);
    stateStore.setCurrentView('SelectedCourse');
  } else {
    console.log(`No ${difficulty} courses available to randomize.`);
  }
};

const configureCourses = () => {
  stateStore.setCurrentView('CourseList');
};

</script>

<style scoped>
.badge{
  position: absolute;
  padding: 0.25em 0.5em;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  text-decoration: none;
  border-radius: 1rem;
  top: -5px;
  right: -5px;
}
button {
  position: relative;
}
</style>