<template>
  <div class="demo">
    <div class="gametitle">
      <span @click="black"><</span><span>游戏试玩</span>
    </div>
    <div class="btnPlay">
      <div :class="buttonact==1?'actionbtn recelivePlay':'recelivePlay'">
        <button @click="gameregame(1)">试玩列表</button>
      </div>
      <div :class="buttonact==2?'actionbtn recelivePlay':'recelivePlay'">
        <button @click="gameregame(2)">接取列表</button>
      </div>
      <div :class="buttonact==3?'actionbtn recelivePlay':'recelivePlay'">
        <button @click="gameregame(3)">完成列表</button>
      </div>
    </div>
    <router-view></router-view>
    </div>
  </template>

<script>
  export default {
    data() {
      return {
        hint: false,
        buttonact:1,
      };
    },

    created() {
	  if (this.$router.currentRoute.path == "/gameover") {
	        this.buttonact = 3;
	      } else if (this.$router.currentRoute.path == "/gamereceive") {
	        this.buttonact = 2;
	      } else if (this.$router.currentRoute.path == "/gametry"){
	        this.buttonact = 1;
	      }
    },
    methods: {
      hintbtn() {
        this.hint = false;
        this.$router.push("/home");
      },
      black(){
        this.$router.push("/home");
      },
      gameregame(e){
        this.buttonact=e;
        if(e==1){
          this.$router.push("/gametry");
        }else if(e==2){
          this.$router.push("/gamereceive");
        }else if(e==3){
          this.$router.push("/gameover");
        }
      }
    },
  };
</script>

<style scoped>
  .gametitle{
    background-color: #1D77FF;
    display: flex;
    height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .gametitle span{
    line-height: 55px;
    text-align: left;
    color: #EEEEEE;
  }
  .gametitle span:nth-child(1){
    font-size: 35px;
    padding-left: 20px;
    flex: 0.5;
  }
  .hint button{
    margin-left: 100px;
  }
  .btnPlay{
    display: flex;
    background: #FFFFFF;
    margin: 60px 10px 10px 10px;
  }
  .recelivePlay{
    flex: 1;
    margin: 10px;
    height: 35px;
    text-align: center;
  }
  button{
    width: 90px;
    height: 30px;
    background: none;
    font-size: 15px;
    border-bottom: 2px solid rgba(0,0,0,0);
  }
  .actionbtn{
    color: #0079FE;
    border-bottom: 2px solid rgba(0,79,240,0.8);
  }
</style>
