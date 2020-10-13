<template>
  <div class="body">
    <div class="top">
      <div class="user">
        <div class="userimg"></div>
        <div class="username">
          <span>{{ list.nickname }}</span>
          <span>ID:{{ list.id }}</span>
        </div>
      </div>
      <div class="usermess">
        <div class="level">{{ list.levelName }}</div>
        <div class="bar">
          <span
            class="nav"
            ref="nav"
            :style="'position: relative;margin-left: -20px;top: -18px;left: ' + navleft + 'px;'"
            >93%</span
          >
          <div class="plan">
            <span ref="planspan" :style="' width:' + spanwidth + 'px'"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="sum">
      <div class="sumtitle">
        <span>当前余额</span>
        <span>累计金额</span>
      </div>
      <div class="sumnum">
        <span>{{ price }}</span>
        <span>{{ pricenum }}</span>
      </div>
    </div>
    <div class="type">
      <div class="one" @click="received">
        <span></span>
        <span>已接任务</span>
      </div>
      <div class="two" @click="sonmoney">
        <span></span>
        <span>收支记录</span>
      </div>
      <div class="three" @click="balance">
        <span></span>
        <span>余额提现</span>
      </div>
    </div>
    <div class="choose">
      <div>新手指南</div>
      <div @click="uptdPaw">修改密码</div>
      <div>商务合作</div>
      <div @click="clearLogin">退出登录</div>
    </div>
    <div class="hiit" v-if="exit">
      <div class="hint">
        <div>确定要退出吗？</div>
        <button id="cancel" @click="cancelbtn">取消</button>
        <button id="sure" @click="surebtn">确认</button>
      </div>
    </div>
    <div class="hiit" v-if="hin">
      <div class="hint" style="height: 100px">
        <div>{{ tishi }}</div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      list: [],
      price: null,
      pricenum: null,
      spanwidth: 100,
      du: 69,
      navleft: 200,
      hin: false,
      exit: false,
      tishi: "",
    };
  },
  created() {
    var obj = localStorage.getItem('id');
    var that = this;
    this.$http.post("/userInfo", { id: obj }).then(res => {
      that.list = res.data;
      that.price = that.list.price.toFixed(2);
      that.pricenum = that.list.totalPrice.toFixed(2);
      that.spanwidth = res.data.percentage
      that.navleft = res.data.percentage
      that.du = res.data.percentage
      // console.log(that.list);
      this.spanwidth = 220 * (that.du * 0.01);
      this.navleft = 220 * (that.du * 0.01);
      this.$refs.nav.innerHTML = this.du + "%";
    });
  },
  mounted() {
    var that = this;
    this.spanwidth = 220 * (that.du * 0.01);
    this.navleft = 220 * (that.du * 0.01);
    this.$refs.nav.innerHTML = this.du + "%";
  },
  methods: {
    sonmoney() {
      this.$router.push({ path: "/income" });
    },
    received(){
      this.$router.push({ path: "/one/daiwc" });
    },
    uptdPaw(){
      this.$router.push({ path: "/uptpd" });
    },
    clearLogin(){
      this.exit = true;
    },
    cancelbtn(){
      this.exit = false;
    },
    surebtn(){
      localStorage.removeItem('id')
      this.$router.push('/setting/login')
    },
    balance(){
      this.$router.push({ path: "/cash" });
    }
  }
};
</script>

<style>
.body {
  background-color: #f3f3f3;
}
/* 用户信息 头部 */
.top {
  width: 100%;
  background: url(..\..\assets\txbj.png) no-repeat;
  background-size: 100%;
}
.usermess,
.user {
  display: flex;
}
.user {
  padding-top: 40px;
  padding-left: 20px;
}
.userimg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
}
.username span {
  display: block;
  text-align: left;
}
.username {
  font-family: KaiTi;
  font-size: 20px;
  line-height: 30px;
  margin-left: 15px;
}
.level {
  font-size: 13px;
  font-weight: 600;
  line-height: 50px;
  width: 80px;
  font-family: zcool;
  transform: scale(1.5, 0.9);
}
.usermess {
  height: 50px;
  padding-left: 15px;
}

/* 进度条 */
.bar{
  margin-top: 8px;
}
.plan {
  width: 220px;
  height: 10px;
  margin-top: -20px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 1px 2px 1px rgba(30, 30, 30, 0.5);
}
.plan span {
  width: 100px;
  height: 10px;
  float: left;
  display: block;
  background: linear-gradient(-135deg, #ffcc9e, #eee);
}

/* 水滴 */
.nav {
  height: 40px;
  width: 40px;
  display: block;
  z-index: 1;
  font-size: 14px;
  line-height: 40px;
  background: #009dd9;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  color: #fff;
  text-align: center;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
.nav:after {
  content: "";
  height: 0px;
  width: 0px;
  border: 10px transparent solid;
  display: block;
  position: absolute;
  bottom: -23px;
  left: 5px;
  border-right: 15px solid transparent;
  border-top: 20px solid #009dd9;
  border-left: 15px solid transparent;
}
/* 用户金额 */
.sum {
  margin: 10px 10px 5px 10px;
  height: 60px;
  background: url(..\..\assets\jebj.png) no-repeat;
  background-size: 100%;
  padding-top: 10px;
  border: 1px #fff solid;
  border-radius: 5px;
}
.sumtitle,
.sumnum {
  display: flex;
}
.sumtitle span,
.sumnum span {
  flex: 1;
  font-family: 宋体;
  font-weight: 700;
  padding-top: 5px;
}

/* 用户任务 */
.type {
  margin: 0px 10px;
  height: 90px;
  border-radius: 5px;
  background-color: #fff;
  font-family: 宋体;
  display: flex;
  border: 1px rgb(69, 69, 69, 0.2) solid;
}
.type div {
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.type div span:nth-child(1) {
  width: 40px;
  height: 40px;
  background-size: 100%;
}
.one span:nth-child(1) {
  background: url(../../assets/yjrw.png) no-repeat;
}
.two span:nth-child(1) {
  background: url(../../assets/szjr.png) no-repeat;
}
.three span:nth-child(1) {
  background: url(../../assets/yetx.png) no-repeat;
}

/* 选项 */
.choose {
  background-color: #fff;
  margin: 10px;
}
.choose div {
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 18px;
  border: 1px rgb(69, 69, 69, 0.2) solid;
}
.choose div:first-child,
.choose div:nth-child(2) {
  border-bottom: none;
}
.choose div:last-child {
  border-top: none;
}
</style>
