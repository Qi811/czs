<template>
  <div class="ysh">
    <zj :dataList="dataList"></zj>
  </div>
</template>

<script>
  import zj from '@/components/zj'

  export default{
    name:'ysh',
    components:{
      zj
    },
    data(){
      return{
        dataList:[],
        id:localStorage.getItem('id'),
        page:1,
        size:10,
        status:2
      }
    },
    created() {
      var _this = this;
      var numpage = 2;
     _this.$http.post('/pickTask',{
       id:_this.id,
       page:_this.page,
       size:_this.size,
       status:_this.status
     })
     .then(function(respone){
        for(var i = 0;i < respone.data.data.length; i++){
          _this.dataList.push(respone.data.data[i])
        }
      })
      
      window.addEventListener("scroll", function () {
        var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
        var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
        var scrHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
       if (scrHeight - clientHeight - scr == 0) {
          // console.log(numpage);
         let self = _this.$http.post('/pickTask',{
        id:_this.id,
        page:numpage,
        size:_this.size,
        status:_this.status
      })
            .then((res) => {
              if (res.data.data.length != 0) {
                for (let i = 0; i < res.data.data.length; i++) {
                  _this.dataList.push(res.data.data[i]);
                }
                // console.log( _this.dataList);
      
               setTimeout(function () {
                  numpage++;
                }, 1000);
              }
              /* else {   显示暂无更多
                that.nono = true;
              } */
            });
        }
      });
      
    },
  }
</script>

<style>
</style>
