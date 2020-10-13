<template>
  <div class="ewm" :style="{backgroundImage:'url(' + require('@/assets/images/bg/' + imgList[num] ) + ')'}">
    <div class="inner">
      <div class="inertwo">
        <div class="award">
          <div class="teamaward">
		      	<div class="one"></div>
            <p class="hd">团队获得奖励</p>
            <p class="shu">{{teamPrice}}</p>
          </div>
          <div class="sucees">
            <p class="hd">已成功邀请</p>
            <p class="shu">{{teamSuccess}}<span style="font-size: 15px;padding-left: 10px;">人</span></p>
			      <div class="two"></div>
          </div>
        </div>
      </div>
      <div class="hy">
        <button class="seefriends" @click="lookFriend">
          查看好友
        </button>
      </div>
      <div class="share">
        <div class="inshare">
          <span>
            分享连接：{{url}}
          </span>
        </div>
      </div>
      <div class="incode">
        <div class="code">
          <img :src="data" class="wm"/>
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
          'erw.png',
          '22.jpg',
          '33.jpg',
          '44.png',
          '55.jpg',
          '66.jpg',
          '77.jpg',
          '88.jpg',
          '99.jpg',
          '1010.jpg'
        ],
        num:0,
        timer:'',
        data:'',
        url:'',
        teamPrice:'',
        teamSuccess:'',
        id:localStorage.getItem('id')
      }
    },
    created() {
      this.getRandom(0,9)
      this.$http.post('/shareInfo',{
        userId:this.id
      }).then((res) => {
        this.data = res.data.data
        this.url = res.data.url
      })
      this.$http.post('/teamMoney',{
        userId:this.id
      }).then((res) => {
        this.teamPrice = res.data.teamMoney
      })
      this.$http.post('/inviteNum',{
        id:this.id
      }).then((res) => {
        this.teamSuccess = res.data.number
      })
    },
    mounted() {
      // this.timer = setInterval(()=>{
      //   this.getRandom(0,9)
      // },2000)
    },
    methods:{
      getRandom(minNum,maxNum){
        this.num = Math.floor(Math.random()*(maxNum - minNum + 1)+minNum)
      },
      lookFriend(){
        this.$router.push({path:'/friend'})
      }
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
    /* margin-bottom: 57px; */
    /* background-size: cover; */
    /* background-position: center; */
  }
  .inertwo{
    width: 100%;
    height: 90px;
    position: absolute;
    top: 33%;
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
    top: 33%;
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
    top: 53%;
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
    top: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .code{
    width: 170px;
    height: 160px;
    background-color: #E0DED9;
  }
  .wm{
    width: 160px;
    height: 150px;
    background: #FFFFFF;
    margin: 5px;
  }
</style>
