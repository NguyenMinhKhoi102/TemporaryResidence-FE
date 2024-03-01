<template>
  <div>
    <Home></Home>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Home from '../../components/Home/Home.vue';

export default defineComponent({
  components: {
    Home,
  },
  setup(props, context) {

  }
})
</script>
