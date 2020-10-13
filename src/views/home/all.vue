<template>
  <div class="homeall" id="homesall">
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
    <div
      v-if="nono"
      style="
        color: #999999;
        text-align: center;
        line-height: 50px;
        font-size: 15px;
        background: #f3f3f3;
      "
    >
      暂无更多...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      obj: 1,
      nono: false,
    };
  },
  created() {
    var that = this;
    var obj = that.obj;
    var size = 10;
    var price = "";
    var numpage = 2;
    // var homesall = document.getElementById("homesall");
    // console.log(homesall.offsetTop);
    // console.log(homesall.offsetHeight);
    this.$http
       .post("/taskList", {
        page: obj, size: size, price: price, userId: localStorage.getItem('id')
      })
      .then((res) => {
        that.list = res.data.data;
        // console.log(that.list);
      });

    window.addEventListener("scroll", function () {
      var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
      var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      var scrHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
      if (scrHeight - clientHeight - scr <= 0.20002) {
        // console.log(numpage);
       let self = that.$http
      .post("/taskList", {
        page: numpage,
        size: size,
        price: price,
        userId: localStorage.getItem('id')
      })
          .then((res) => {
            if (res.data.data.length != 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                that.list.push(res.data.data[i]);
              }
              // console.log(that.list);

              setTimeout(function () {
                numpage++;
              }, 1000);
            } else {
              that.nono = true;
            }
          });
      }
      // console.log(scrHeight - clientHeight - scr);
      // console.log(scrHeight - clientHeight - 488.79998779296875);0.20001220703125
    });
  },
  methods: {
    detail(id) {
      this.$router.push({ path: "/taskdetail/" + id });
    },
  },
};
</script>

<style scoped>
</style>
