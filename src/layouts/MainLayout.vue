<template>
  <div>
    <NavbarMain></NavbarMain>
    <div class="mt-16" :class="{ 'overflow-hidden': !showContent }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavbarMain from '../components/main/NavbarMain.vue';

export default {
  components: {
    NavbarMain
  },
  data() {
    return {
      showContent: true
    };
  }
};
</script>

<style>
.overflow-hidden {
  overflow: hidden;
  transition: all 0.3s ease;
}
</style>
