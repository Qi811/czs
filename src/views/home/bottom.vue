<template>
  <div>
    <div class="sontitle" style="position: fixed;left: 0;top: 0;">
      <span style="float: left" @click="tui"></span>
      <span>低价区</span>
    </div>
    <div class="homeall" style="padding-top:80px ;">
      <div class="allson" v-for="(item, index) in list" :key="index" @click="goDetail(item.id)">
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
    <div :style="{ display: nullson ? 'none' : 'block' }">
        <div
          style="
            font-size: 18px;
            color: #696969;
            text-align: center;
            background-color: #F3F3F3;
            line-height: 80px;
          "
        >
          暂无数据
        </div>
    </div>
  </div>
</template>

<script>
	
export default {
  data () {
    return {
      list: [],
      obj: 1,
      nullson:false
    }
  },
  created () {
    var that = this
    var obj = that.obj
    var size = 10
    var price = 5
    this.$http
      .post('/taskList', {
        userId:localStorage.getItem('id'),
        page: obj,
        size: size,
        price: price,
      })
      .then((res) => {
        that.list = res.data.data
        if (that.list.length == 0) {
          this.nullson = false;
        } else {
          this.nullson = true;
        }
        // console.log(that.list);
      })
  },
  methods: {
    tui () {
      this.$router.push('/home');
    },
    goDetail(id){
      this.$router.push({ path: "/taskdetail/" + id });
    }
  }
}
</script>

<style>
</style>
