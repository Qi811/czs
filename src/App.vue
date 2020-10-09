<template>
  <div id="app">
    <router-view />
    <tips></tips>
  </div>
</template>

<script>
import tips from '@/components/tips'
export default {
  name: "App",
  components:{tips}
};
</script>

<style>
#app {

}
</style>
