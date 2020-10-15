<template>
  <div class="one">
    <div class="bodymoney">
      <!-- 标题 -->
      <div class="twbody">
        <div class="title">
          <div class="fan" @click="back"></div>
          <div class="tit">已接任务</div>
        </div>
        <div class="wa">
          <div class="inn">
            <ul class='wz'>
              <li @click="isActive=1" :class="{'active':isActive==1}" >
                <router-link :to="{name:'daiwc'}">待完成</router-link>
              </li>
              <li @click="isActive=2" :class="{'active':isActive==2}">
                <router-link :to="{name:'shz'}">审核中</router-link>
              </li>
              <li @click="isActive=3" :class="{'active':isActive==3}">
                <router-link :to="{name:'ysh'}">已审核</router-link>
              </li>
              <li @click="isActive=4" :class="{'active':isActive==4}">
                <router-link :to="{name:'shsb'}">审核失败</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <div class="xs">
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
  export default{
    name:'one',
    data(){
      return{
        isActive:localStorage.getItem('isActive')?localStorage.getItem('isActive'):1
      }
    },
    created() {
      // this.isActive = 1
      // localStorage.setItem('isActive',1)
    },
    updated() {
      localStorage.setItem('isActive',this.isActive)
    },
    methods: {
      back () {
        this.$router.push('/my')
      }
    },
    beforeRouteLeave(to,from,next) {
      localStorage.setItem('isActive',1)
      next()
    }
  }
</script>

<style scoped="scoped">

.bodymoney {
  background-size: 100%;
  background-color: #F3F3F3;
}
  /* 标题样式 */
  .twbody{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .title {
    height: 60px;
    width: 100%;
    color: #fefefe;
    font-size: 16.2px;
    display: flex;
    line-height: 60px;
    background: url(../../assets/bj.png) no-repeat;
  }

  .fan {
    padding-top: 45px;
    width: 45px;
    height: 26px;
    transform: rotate(90deg) scale(0.6);
    background: url(../../assets/down.png) no-repeat;
  }

  .tit {
    flex: 1;
    text-align: center;
    padding-top: 8px;
    padding-right: 35px;
  }
  .wa{
    width: 100vw;
    height: 50px;
    background: #FE6E49;
    margin-top: -1px
  }
  .inn{
    height: 20px;
    padding-top: 20px;
  }
  ul{
    display: flex;
  }
  a{
    color: white;
  }
  .router-link-active{
    color: yellow;
  }
  .wz{
    width: 100vw;
    height: 30px;
    margin-left: auto;
  }
  .wz li{
    flex: 1;
    font-size: 15px;
    text-align: center;
  }
  .wz li.active ::before{
    content: '';
    width: 75px;
    height: 2px;
    background-color: yellow;
    position: absolute;
    top: 100px;
    margin-left: -15px;
  }
  .wz li:last-child.active ::before{
    background-color: #4169E1;
    content: '';
    width: 75px;
    height: 2px;
    background-color: yellow;
    position: absolute;
    top: 100px;
    margin-left: -7px;
  }

</style>
