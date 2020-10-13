<template>
  	<div class="he">
      <span :class="uptList[0]" @click="goback"></span>
      <span style="text-align: center;font-size: 20px;position: absolute;left: 38%;margin-top: 12px;">
        {{uptList[1]}}
      </span>
    </div>
</template>

<script>
  export default{
    name:'he',
    props:{
      uptList:{
        type:Array
      }
    },
    data(){
      return{

      }
    },
    methods:{
      goback(){
        this.$router.go(-1)
      }
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
</style>
