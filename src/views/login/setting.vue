<template>
  <div class="setting">
    <div class="bg"></div>
    <div class="cont">
      <div class="yuan">
        <div class="yy">
        <div class="yyy"></div>
        </div>
      </div>
      <div class="kk">
        <div class="wz">
          <span @click="isactive=1" :class="{'active':isactive==1}">
            <router-link :to="{name:'login'}">登录</router-link>
          </span>
          <span @click="isactive=2" :class="{'active':isactive==2}">
            <router-link :to="{name:'register'}">注册</router-link>
          </span>
        </div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name:'setting',
  data(){
    return{
      isactive:localStorage.getItem('isactive')?localStorage.getItem('isactive'):1
    }
  },
  updated() {
    // localStorage.setItem('isactive',this.isactive)
  }
}
</script>

<style scoped="scoped">
  .setting,.bg{
    width: 100%;
    height: 100vh;
  }
  .setting{
    background: url('../../assets/images/tc3.png');
    background-size: cover;
    position: relative;
  }
  .bg{
    background-image: url('../../assets/images/timg.png');
    opacity: 0.2;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cont{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .yuan{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
  }
  .yy{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
   .yyy{
    background-image: url("../../assets/images/7.jpg");
    background-position: 0% 0%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    border-radius: 60px;
   }
  .kk{
    background-color: white;
    position: absolute;
    /* top: 25%;
    left: 10%;
    bottom: 10%;
    right: 10%; */
    margin-top: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .wz{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wz span{
    flex: 1;
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
  }
  .wz span.active ::before{
    content: '';
    width: 75px;
    height: 2px;
    background-color: #007EFF;
    position: absolute;
    top: 50px;
    margin-left: -15px;
  }
</style>
