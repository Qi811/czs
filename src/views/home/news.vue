<template>
  <div class="homeall">
    <div
      class="allson"
      @click="detail(item.id)"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="taskphoto"></div>
      <div class="tackmess">
        <div class="tackname">{{ item.title }}</div>
        <div class="number">
          <span>剩余{{ item.max_num }}份</span
          ><span>已领{{ item.apply_num }}份</span>
        </div>
      </div>
      <div class="tackmoney">{{ item.price.toFixed(2) }}<span>元</span></div>
    </div>
  </div>
</template>

<script>
	
export default {
  data() {
    return {
      list: [],
      obj: 1
    };
  },
  created() {
    var that = this;
    // var obj = that.obj
    // var size = 10
    // var price = 15
    this.$http.post("/taskNewList").then(res => {
      that.list = res.data.data;
      // console.log(that.list);
    });
  },
  methods: {
    detail(id) {
      this.$router.push({ path: "/taskdetail/" + id });
    }
  }
};
</script>

<style scoped></style>
