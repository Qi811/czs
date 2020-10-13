<template>
  <div class="friend">
  	<div class="he">
      <span class="el-icon-arrow-left" @click="goback"></span>
      <span style="text-align: center;font-size: 20px;position: absolute;left: 38%;margin-top: 3px;">
        下级人员
      </span>
    </div>
    <div class="xh" v-for="item in dataList" :key="item.id" v-if="dataList != ''" >
      <div class="tp">
        <div class="tpn"></div>
      </div>
      <div class="rg">
        <p class="ywc">{{item.nickname}}</p>
        <p class="sj">邀请时间：{{item.create_time | formatDate}}</p>
      </div>
    </div>
    <div class="wsj" v-if="dataList == ''">
      <div style="font-size: 16px;color: #696969;text-align: center;background-color: #F3F3F3;line-height: 80px;">
        暂无好友
      </div>
    </div>
  </div>
</template>

<script>
  import tops from '@/components/top'
  export default{
    name:'friend',
    components:{
      tops
    },
    data(){
      return{
        dataList:[]
      }
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }
    },
    filters: {
      formatDate: function (value) {
        return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },
    created() {
      this.$http.post('/inviteDetails',{
        id:localStorage.getItem('id')
      }).then((res) =>{
        this.dataList = res.data.data
      })
    }
  }
</script>

<style scoped="scoped">
  .he{
    background: #007EFF;
    width: 100%;
    height: 55px;
    position: relative;
  }
  .he span{
    color: white;
    font-size: 23px;
    position: relative;
    top: 15px;
    left: 16px;
  }
  .xh{
    width: 100vw;
    height: 80px;
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
    margin: 10px 5px 20px 10px;
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
  .ywc{
    margin-top: 30px;
    font-size: 16px;
    font-weight: bold;
    color: #6B7D93;
  }
  .sj{
    font-size: 12px;
    line-height: 1.2;
    color: gray;
    padding-top: 5px;
  }
</style>
