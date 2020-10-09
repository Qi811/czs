<template>
  <!-- <div class="ewm" style="background: url(/static/img/33.1bd0baa.jpg);"> -->
  <div class="ewm" :style="{backgroundImage:'url(/static/img/' + imgList[num] +')'}">
    <div class="inner">
      <div class="inertwo">
        <div class="award">
          <div class="teamaward">
		      	<div class="one"></div>
            <p class="hd">团队获得奖励</p>
            <p class="shu">220</p>
          </div>
          <div class="sucees">
            <p class="hd">已成功邀请</p>
            <p class="shu">22<span style="font-size: 15px;padding-left: 10px;">人</span></p>
			      <div class="two"></div>
          </div>
        </div>
      </div>
      <div class="hy">
        <button class="seefriends">
          查看好友
        </button>
      </div>
      <div class="share">
        <div class="inshare">
          <span>
            分享连接：http://www.hnchengben.com/new.html#/Api/pickTask?id=50&page=1&size=10&status=0
          </span>
        </div>
      </div>
      <div class="incode">
        <div class="code">
          <div class="wm">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:"ewm",
    data(){
      return{
        imgList:[
          'erw.4c27f11.png',
          '22.1609d33.jpg',
          '33.1bd0baa.jpg',
          '44.4e4182c.png',
          '55.a8c72a4.jpg',
          '66.2b181e3.jpg',
          '77.bfa36b5.jpg',
          '88.0a0a2e3.jpg',
          '99.18b84c0.jpg',
          '1010.2a51830.jpg'
        ],
        num:0,
        timer:''
      }
    },
    created() {
      this.getRandom(0,9)
    },
    mounted() {
      this.timer = setInterval(()=>{
        this.getRandom(0,9)
      },2000)
    },
    methods:{
      getRandom(minNum,maxNum){
        this.num = Math.floor(Math.random()*(maxNum - minNum + 1)+minNum)
        // console.log(this.num)
      },
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped="scoped">
  .ewm{
    width: 100%;
    height: 100vh;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-size: cover; */
    /* background-position: center; */
  }
  .inertwo{
    width: 100%;
    height: 90px;
    position: absolute;
    top: 48%;
    bottom: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .award{
    width: 90%;
    height: 90px;
    background: white;
    display: flex;
    border-radius: 7px;
  }
  .teamaward,.sucees{
    width: 50%;
    padding: 20px;
  }
  .sucees{
    text-align: center;
    margin-left: 40px;
    position: relative;
  }
  .one,.two{
    background: #FF2800;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    position: absolute;
    top: 38%;
  }
  .one{
    margin: 0px 0px 0px -30px;
  }
  .two{
    position: absolute;
    right: -10px;
  }
  .hd{
  }
  .shu{
    color: #FF7700;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 24px;
    font-weight: bold;
  }
  .hy{
    width: 100%;
    height: 45px;
    position: absolute;
    top: 48%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .seefriends{
    height: 45px;
    padding: 10px 20px 10px 20px;
    border-radius: 5px;
    margin-top: 140px;
    background: #007EFF;
    font-size: 20px;
    color: white;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .share{
    position: absolute;
    top: 68%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inshare{
    width: 90%;
  }
  .inshare span{
    color: #FFFFFF;
    word-break: break-all;
    display: inline-block;
  }
  .incode{
    width: 100%;
    height: 100px;
    position: absolute;
    top: 78%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .code{
    width: 150px;
    height: 140px;
    background-color: #E0DED9;
  }
  .wm{
    width: 130px;
    height: 120px;
    background: #FFFFFF;
    margin: 10px;
  }
</style>
