<template>
  <div class="out">
    <iframe class="inner" :src="hurl" ref="iframe"></iframe>
    <!-- <a :href="hurl"></a> -->
  </div>
</template>

<script>
  export default{
    data(){
      return{
        hurl:this.$store.state.url
      }
    },
  }
</script>

<style scoped="scoped">
  .out{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
  .inner{
    width: 100%;
    height: 100%;
  }
</style>
