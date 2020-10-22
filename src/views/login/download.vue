<template>
  <div class="bg">
    <span class="el-icon-close" @click="goback"></span>
    <div class="bt">
      <div class="bto">
        <button @click="durl">Android下载</button>
      </div>
      <div class="btt" @click="iosD">
        <button>IOS下载</button>
      </div>
    </div>
    <div class="bgin">
      <div class="im">
        <img src="http://www.hnchengben.com/img/qrcode.png" alt="公众号二维码"/>
      </div>
      <span class="spt" style="font-size: 15px;padding-right: 10px;">公众号二维码</span>
    </div>
    <div class="hiits" v-if="exit">
      <div class="hints">
        <div>暂时没有IOS版本可供下载</div>
        <div class="bts">
          <div class="btos">
            <button id="sures" @click="surebtn">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        andsrc:"http://www.hnchengben.com/android/android.apk",
        exit:false
      }
    },
    methods:{
      iosD(){
        // this.bus.$emit('tips', {
        //   show: true,
        //   title: '暂时没有IOS版本可供下载'
        // })
        this.exit = true
      },
      durl(){
        this.$store.commit('getUrl',this.andsrc)
        this.$router.push({path:'/gamerquest'})
        // window.location.href = this.andsrc;
      },
      surebtn(){
        this.exit = false
      },
      goback(){
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped="scoped">
  .bg{
    width: 100%;
    height: 100vh;
    background: url(../../assets/images/bg/erw.png);
    background-size: cover;
    display: flex;
  }
  .el-icon-close{
    color: white;
    font-size: 23px;
    position: relative;
    top: 25px;
    left: 12px;
    z-index: 111;
    height: 30px;
  }
  .spt{
    color: white;
    font-size: 23px;
    position: relative;
    top: 25px;
    z-index: 111;
    height: 30px;
  }
  .bt{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    display: flex;
    text-align: center;
  }
  .bto,.btt{
    height: 40px;
    background: white;
    margin: 25px;
    flex: 1;
    line-height: 2.5;
    border-radius: 10px;
  }
  .bto button{
    background: white;
  }
  .btt button{
    background: white;
  }
  .bgin{
    position: absolute;
    top: 65%;
    right: 0;
    left: 0;
    width: 100%;
    height: 150px;
    text-align: center;
  }
  .im{
    width: 100%;
    height: 130px;
    text-align: center;
  }
  .im img{
    width: 120px;
    height: 120px;
  }
.hiits {
    width: 100vw;
    height: 1000vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 130;
}
.hints {
    width: 75%;
    height: 150px;
    background-color: #fff;
    border-radius: 15px;
    position: fixed;
    top: 30%;
    left: 10%;
    z-index: 99;
}
.hints div {
    text-align: center;
    line-height: 80px;
    font-size: 4vw;
}
.hints button {
    width: 20%;
    height: 30px;
    background: linear-gradient( -135deg, rgba(0, 0, 255, 0.5), rgba(255, 42, 255, 0.5));
    border: none;
}
.bts{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    display: flex;
    text-align: center;
}
.btos{
  height: 40px;
  flex: 1;
}
#sures {
  text-align: center;
    background: rgb(0, 123, 219, 0.5);
}
</style>
