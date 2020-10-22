<template>
  <div>
    <img :src="bus" style="width: 100%;height: 100%;text-align: center;"/>
  </div>
</template>

<script>
	
  export default{
    data(){
      return{
        bus:''
      }
    },
    created() {
      this.$http.post('/policy',{
      }).then((res)=>{
        this.bus = res.data.data
      })
    }
  }
</script>

<style scoped="scoped">

</style>
