<template>
  <div>
    <img :src="beg" style="width: 100%;height: 100%;text-align: center;"/>
  </div>
</template>

<script>
	
  export default{
    data(){
      return{
        beg:''
      }
    },
    created() {
      this.$http.post('/cooperation',{
      }).then((res)=>{
        this.beg = res.data.data
      })
    }
  }
</script>

<style scoped="scoped">

</style>
