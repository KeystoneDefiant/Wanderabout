<template>
    <div
      id="selectedCourse"
      :style="{ backgroundImage: `url(./courses/${selectedCourse.course}.png)` }"
      @click="closePane"
    >
      <div id="textData">
        <p class="friendlyName">{{ selectedCourse.friendlyName }}</p>
        <p class="difficulty">{{ selectedCourse.difficulty }}</p>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useStateStore } from '@/stores/stateStore';
const stateStore = useStateStore();
const selectedCourse = stateStore.getSelectedCourse;

const closePane = () => {
  stateStore.setCurrentView("MainMenu");
};

</script>

<style scoped>
/* Add your styles here */

#selectedCourse {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

#textData {
  position: absolute;
  width: 110%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-10%);
  box-shadow: black 0px 0px 30px;
  background-color: rgba(150, 150, 150, .5);
}

p {
  padding: 1% 3%;
  line-height: 100%;
  text-align: center;
}

.friendlyName {
  font-size: 420%;
  color: white;
  text-shadow: 0px 0px 10px black;
}
.difficulty {
  font-size: 200%;
  color: white;
  text-shadow: 0px 0px 10px black;
}

</style>