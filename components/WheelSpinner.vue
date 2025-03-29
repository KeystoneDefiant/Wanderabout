<template>
  <div class="wheel-container">
    <div class="wheel-list" :style="{ transform: `translateY(${scrollOffset}px)` }">
      <div
        v-for="(course, index) in loopedCourses"
        :key="index"
        class="wheel-item"
      >
        {{ course.friendlyName }} - {{ course.difficulty }}
      </div>
    </div>
    <button @click="spinWheel">Spin the Wheel</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/courseStore';

const courseStore = useCourseStore();
const courses = computed(() => courseStore.getAllEnabledCourses);

// Duplicate the courses to create a looping effect
const loopedCourses = computed(() => [...courses.value, ...courses.value]);

const scrollOffset = ref(0);
const itemHeight = 50; // Height of each item in pixels
const totalHeight = computed(() => courses.value.length * itemHeight);

const spinWheel = () => {
  const spins = 5; // Number of full spins
  const randomStop = Math.floor(Math.random() * courses.value.length) * itemHeight;
  const totalScroll = spins * totalHeight.value + randomStop;

  scrollOffset.value -= totalScroll;

  // Reset the scroll offset to create a looping effect
  setTimeout(() => {
    scrollOffset.value %= totalHeight.value;
    const selectedIndex = Math.abs(Math.floor(scrollOffset.value / itemHeight) % courses.value.length);
    const selectedCourse = courses.value[selectedIndex];
    console.log('Selected Course:', selectedCourse);
  }, 1000); // Match the CSS transition duration
};
</script>

<style scoped>
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>