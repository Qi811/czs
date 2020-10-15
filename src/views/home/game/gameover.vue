<template>
  <div class="over">
    <div class="gametitle">
      <span @click="black"><</span><span>完成列表</span>
    </div>
    <div class="homeall">
      <!-- 任务 -->
      <div class="allson" v-for="(item, index) in list" :key="index">
        <div class="taskphoto" :style="'backgroundImage: url(' + item.imgurl + '); backgroundSize:100%;backgroundColor:none'"></div>
        <div class="tackmess">
          <div class="tacknames">{{item.info2}}</div>
          <div class="tacknames">{{item.info1}}</div>
          <div class="tacknames">{{item.info3}}</div>
          <div class="number">
            开始时间:{{item.pay_time | formatDate}}
          </div>
        </div>
        <div>
        </div>
        <div class="tackmoney" style="font-size: 13px;">+{{item.price}}元</div>
      </div>
        <!-- 暂无数据 -->
      <div
        v-if="nono"
        style="
          color: #999999;
          text-align: center;
          line-height: 50px;
          font-size: 15px;
          background: #f3f3f3;
        "
      >
        {{gameitem}}
      </div>
    </div>
    <div class="hiit" v-if="hint">
      <div class="hint">
        <div>抱歉！该功能暂不支持您的型号</div>
        <button @click="hintbtn">确认</button>
      </div>
     </div>
   </div>
</template>

<script>
  export default{
    data(){
      return{
        list:[],
        hint: false,
        nono:false,
        reslist:[],
      }
    },
    filters: {
      formatDate: function (value) {
        return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
      }
    },
    created() {
      var page = 1;
      var size = 5;
      var ptype = localStorage.getItem("ptype")
      if(ptype == 2){
        this.$http.post('/xwFinish',{
          userId:localStorage.getItem('id'),
          page: page,
          size: size
        }).then((res) =>{
          console.log(res)
          this.list = res.data.data
          if(this.list.length == 0){
            this.nono = true
            this.gameitem = '暂无数据'
          }else{
            this.nono = false
          }
        });
        window.addEventListener("scroll", function () {
          var scr = document.documentElement.scrollTop || document.body.scrollTop; // 向上滚动的那一部分高度
          var clientHeight = document.documentElement.clientHeight; // 屏幕高度也就是当前设备静态下你所看到的视觉高度
          var scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // 整个网页的实际高度，兼容Pc端
          if (scrHeight - clientHeight - scr <= 0.4001) {
            setTimeout(function(){
              page+=5;
            },1500);
            for(let i=0;i<page;i++){
              if(this.list[i]=undefined){
                this.nono = true;
                this.gameitem = "暂无更多...";
              }
            }
          }

        })
      }else{
        this.hint = true;
      }
    },
    methods:{
      hintbtn() {
        this.hint = false;
        this.$router.push("/home");
      },
      black(){
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped="scoped">
  .gametitle{
    background-color: #1D77FF;
    display: flex;
    height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .allson{
    height: 90px;
  }
  .gametitle span{
    line-height: 55px;
    text-align: left;
    color: #EEEEEE;
  }
  .gametitle span:nth-child(1){
    font-size: 35px;
    padding-left: 20px;
    flex: 0.5;
  }
  .tacknames{
    font-family: "Microsoft Yahei";
    font-size: 13px;
    margin-bottom: 10px;
  }
</style>
