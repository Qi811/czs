<template>
  <div class="body" style="background-color: #f3f3f3;">
    <div class="head">
      <img src="..\..\assets\adve.png" alt="" />
    </div>
    <div class="ify f">
      <div class="ifytype fy">
        <span class="one" @click="usermoney"></span><span>赏金榜</span>
      </div>
      <div class="ifytype fy">
        <span class="two" @click="hintactive"></span><span>游戏试玩</span>
      </div>
      <div class="ifytype fy" @click="bottom">
        <span class="btoom"></span><span>低价区</span>
      </div>
      <div class="ifytype fy" @click="height">
        <span class="height"></span><span>高价区</span>
      </div>
    </div>
    <div class="task">
      <div :id="color ? yes : no" @click="all">全部任务</div>
      <div :id="color ? no : yes" @click="news">最新任务</div>
    </div>
    <router-view></router-view>
    <div class="hiit" v-if="hint">
      <div class="hint">
        <div>该功能暂未开放，去看看其他任务吧~</div>
        <button @click="hintbtn">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'home',
  data() {
    return {
      color: true,
      yes: "yes",
      no: "null",
      hint: false,
      hurl: null,
      obj: localStorage.getItem('id'),
    };
  },
  created() {
    var that = this;
    var obj = that.obj;
    this.$http.post("/unionLogin", {
      userId: obj,
    }).then((res) => {
      that.hurl = res.data;
      // console.log(res);
    });
  },
  methods: {
    all() {
      this.color = !this.color;
      this.$router.push("/home/all");
    },
    news() {
      this.color = !this.color;
      this.$router.push("/home/news");
    },
    hintactive() {
      this.$router.push("/game");
    },
    hintbtn() {
      this.hint = false;
    },
    bottom() {
      this.$router.push("/bottom");
    },
    height() {
      this.$router.push("/height");
    },
    usermoney() {
      // window.location.href = this.hurl;
      this.$router.push("/enjoy");
    },
  },
};
</script>

<style scoped>
.body {
  background-color: #f6f6f6;
  background: url(..\..\assets\homebacg.png) no-repeat;
  background-size: 100%;
}
/* 头部 */
.head {
  margin-left: 1%;
  padding-top: 20px;
  width: 99%;
  height: 120px;
}
.head img {
  width: 100%;
  height: 100%;
}
/* 选择类别 */
.ify {
  margin: 0px 10px;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
}
.ifytype {
  font-family: NSimSun;
  font-size: 14px;
}
.ifytype span:nth-child(1) {
  height: 30px;
  width: 30px;
  padding-bottom: 10px;
  background-size: 100%;
}
.one {
  background: url(..\..\assets\money.png) no-repeat;
}
.two {
  background: url(..\..\assets\game.png) no-repeat;
}
.btoom {
  background: url(..\..\assets\bottom.png) no-repeat;
}
.height {
  background: url(..\..\assets\height.png) no-repeat;
}
/* 任务 */
.task {
  margin: 0px 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #3b3b3b;
  font-family: SimHei;
}
.task div {
  flex: 1;
  line-height: 48px;
  border-bottom: 2px solid rgba(00, 00, 00, 0);
}
#yes {
  border-bottom: 2px solid blue;
  z-index: 2;
}

</style>
