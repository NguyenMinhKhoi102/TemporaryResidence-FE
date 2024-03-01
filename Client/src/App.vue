<template>
  <div class="progress-circular text-center" v-if="state.state">
    <v-progress-circular :indeterminate="state.state"></v-progress-circular>
  </div>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import 'vue3-toastify/dist/index.css';
import 'leaflet/dist/leaflet.css';
import { defineComponent } from 'vue';
import { usePropressCircular } from "./stores/progressCircular";
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';
export default defineComponent({
  components: {
    VProgressCircular,
  },
  setup(props, context) {
    const state = usePropressCircular();
    return {
      state
    }
  }
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  margin: 0;
  font-family: 'Nunito', sans-serif;
}

.progress-circular {
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.157);
  z-index: 99999;
}
</style>