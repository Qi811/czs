<template>
  <div class="hello">
    <div class="page_top"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  components: {},
};
</script>

<style scoped>
.hello {
  margin: 0px;
  padding: 0px;
}
.page_top {
  width: 100%;
  height: 60px;
  background: url(https://s.tuniu.net/qn/images/f69e495e9785b8bae9027823b56cc66e.jpg)
    no-repeat top center;
}
</style>
