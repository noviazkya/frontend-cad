<template>
  <div>
    <NavbarMain></NavbarMain>
    <div class="mt-12" :class="{ 'overflow-hidden': !showContent }">
      <router-view></router-view>
    </div>
    <FooterMain />
  </div>
</template>

<script>
import NavbarMain from '../components/main/NavbarMain.vue';
import FooterMain from '../components/main/FooterMain.vue';

export default {
  components: {
    NavbarMain,
    FooterMain
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
