<template>
  <div class="zj">
    <div class="xh" v-for="item in dataList" :key="item.id" v-if="dataList != ''" @click="goDetail(item.task_id)">
      <div class="tp">
        <div class="tpn"></div>
      </div>
      <div class="rg">
        <p class="bt">{{item.title}}</p>
        <p class="ywc">已完成{{item.member_id}}份  剩余{{item.task_id}}份</p>
        <p class="sj">最晚将于{{item.end_time | formatDate}}前完成审核,请耐心等待</p>
      </div>
      <div class="jg">
        <span class="jgy">{{item.price}}</span>元
      </div>
    </div>
    <div class="wsj" v-if="dataList == ''">
      <div style="font-size: 18px;color: #696969;text-align: center;background-color: #F3F3F3;line-height: 80px;">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'zj',
    props:{
      dataList:{
        type:Array
      }
    },
    data(){
      return{
      }
    },
    methods:{
      goDetail(id){
        this.$router.push({ path: "/taskdetail/" + id });
      }
    },
    filters: {
      formatDate: function (value) {
        return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    }
  }
</script>

<style scoped="scoped">
  .zj{
    width: 100vw;
    height: 100vh;
    background-color: #F3F3F3;
    margin-top: 110px;
    padding-top: 0px;
    font-family: "lucida console";
  }
  .xh{
    width: 100vw;
    height: 120px;
    display: flex;
    background-color: white;
    margin-bottom: 2px;
  }
  .tp{
    width: 80px;
    height: 120px;
  }
  .tpn{
    width: 60px;
    height: 60px;
    background-color: #FFFF00;
    border-radius: 10px;
    margin: 30px 5px 20px 15px;
  }
  .rg{
    flex: 1;
    margin-left: 5px;
  }
  .bt{
    font-size: 15px;
    font-weight: bolder;
    padding-top: 25px;
  }
  .ywc,.sj{
    font-size: 12px;
    color: gray;
    padding-top: 8px;
  }
  .sj{
    line-height: 1.2;
  }
  .jg{
    width: 60px;
    height: 120px;
    display: flex;
    align-items: center;
  }
  .jgy{
    color: red;
    margin-left: 0px;
    font-size: 18px;
  }
</style>
