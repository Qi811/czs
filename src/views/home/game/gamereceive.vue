<template>
  <div class="receive">
    <div class="gametitle">
      <span @click="black"><</span><span>接取列表</span>
    </div>
    <div class="homeall">
      <!-- 任务 -->
      <div class="allson" @click="demodetail(item.adid)" v-for="(item, index) in list" :key="index">
        <div class="taskphoto" :style="'backgroundImage: url(' + item.imgurl + '); backgroundSize:100%;backgroundColor:none'"></div>
        <div class="tackmess">
          <div class="tackname">{{item.adname}}</div>
          <div class="number">
            开始时间:{{item.starttime}}
          </div>
          <div class="number" style="margin-top: 4px;">
            结束时间:{{item.stoptime}}
          </div>
        </div>
        <div class="tackmoney" style="font-size: 13px;">{{item.showmoney}}{{item.unit}}</div>
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
    created() {
      var that = this;
      var page = 10;
      var ptype = localStorage.getItem("ptype");
      var reslist = that.reslist;
        this.$http.post('/XwPickTaskList',{
          userId:localStorage.getItem('id'),
          ptype: ptype,
          msaoaid: localStorage.getItem("aosid"),
          deviceid: localStorage.getItem("osid"),
          androidosv: localStorage.getItem("sv")
        }).then((res) =>{
          // console.log(res.data)
          reslist = eval("(" +res.data + ")");
          // console.log(reslist.list)
          this.list = reslist.list
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
              page+=5;
            for(let i=0;i<page;i++){
              if(reslist.list[i]=undefined){
                this.nono = true;
                this.gameitem = "暂无更多...";
              }
            }
          }

        })
      
    },
    methods:{
      hintbtn() {
        this.hint = false;
        this.$router.push("/home");
      },
      black(){
        this.$router.push('/home');
      },
      demodetail(id){
        this.$router.push({path:'/gamedetail/'+id});
      },
    }
  }
</script>

<style scoped="scoped">
  .gametitle{
    background-color: #1D77FF;
    display: flex;
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .gametitle span{
    line-height: 35px;
	margin-top: 35px;
    text-align: left;
    color: #EEEEEE;
  }
  .gametitle span:nth-child(1){
    font-size: 35px;
    padding-left: 20px;
    flex: 0.5;
  }
</style>
