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
  top: 10%;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
}

p {
  background-color: rgba(0, 0, 0, .6);
  border-radius: 3rem;
  padding: 2%;
  line-height: 100%;
  position: relative;
  text-align: center;
}

.friendlyName {
  font-size: 420%;
  color: white;
  text-shadow: 0px 0px 10px black;
  transform: translateY(0%) rotate(-8deg) ;
}
.difficulty {
  font-size: 200%;
  color: white;
  text-shadow: 0px 0px 10px black;
  transform: translateY(-10%) translateX(170%) rotate(8deg);
}

</style>