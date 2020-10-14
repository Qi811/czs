<template>
  <div class="demo">
    <div class="gametitle">
      <span @click="black"><</span><span>游戏试玩</span>
    </div>
    <div class="btnPlay">
      <div class="tryPlay">
        <span></span>
        <button>试玩列表</button>
      </div>
      <div class="recelivePlay">
        <span></span>
        <button>接取列表</button>
      </div>
      <div class="sucessPlay">
        <span></span>
        <button>完成列表</button>
      </div>
    </div>
    <div class="homeall">
      <!-- 任务 -->
      <div class="allson" @click="demodetail(item.adid)" v-for="(item, index) in list" :key="index">
        <div class="taskphoto" :style="'backgroundImage: url(' + item.imgurl + '); backgroundSize:100%;backgroundColor:none'"></div>
        <div class="tackmess">
          <div class="tackname">{{item.adname}}</div>
          <div class="number" v-html="item.trialinfo">
            <!-- <innerHTML>{{item.trialinfo}}</innerHTML> -->
          </div>
        </div>
        <!-- {{ item.price.toFixed(2) }} -->
        <div class="tackmoney" style="font-size: 13px;">{{item.showmoney}}</div>
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
      <!-- 提示框 -->
      <div class="hiit" v-if="hint">
        <div class="hint">
          <div>抱歉！该功能暂不支持您的型号</div>
          <button @click="hintbtn">确认</button>
        </div>
       </div>
    </div>
  </template>

<script>
  export default {
    data() {
      return {
        list: [],
        hint: false,
        nono:false,
        reslist:[],
      };
    },
   /* 任务列表内容：
    XwTaskList 接口名称
    参数：
    userId 用户ID
    ptype 手机系统 1 iPhone 2 安卓
    msaoaid OAID 10以下传0 10以上传对应数据
    deviceid 设备ID 10以上传0 10以下传对应数据
    androidosv 10以上传29  10以下传0 */
    created() {
      var that = this;
      var id = 1;
      var page = 10;//分页数据
     var ptype = localStorage.getItem("ptype");
      var aosid = localStorage.getItem("aosid");
      var osid =localStorage.getItem("osid");
      var aos = localStorage.getItem("aos");
      var sv= localStorage.getItem("sv");
      var reslist = that.reslist;
      // 判断手机系统
      if(ptype == 2){

        that.$http
          .get("/XwTaskList", {
            params: { userId: id, ptype: ptype, msaoaid: aosid, deviceid: osid, androidosv: sv},
          })
          .then((res) => {
            // console.log(res);
            reslist = eval("(" +res.data.items + ")");
            if(reslist.length==0){
              that.nono = true;
              that.gameitem = "暂无数据";
            }

           for(let i=0;i<page;i++){
             if(reslist[i]==undefined){
               that.nono = true;
               that.gameitem = "暂无更多...";
             }else{
               that.list = that.list.concat(reslist[i]);
             }
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
                if(reslist[i]!=undefined){
                  that.list = that.list.concat(reslist[i]);
                }else{
                  that.nono = true;
                  that.gameitem = "暂无更多...";
                }
               }
            }

          })


      }else{
        that.hint = true;
      }
    },
    methods: {
      hintbtn() {
        this.hint = false;
        this.$router.push("/home");
      },
      black(){
        this.$router.push("/home");
      },
      demodetail(id){
        this.$router.push({path:'/gamedetail/'+id});
      }
    },
  };
</script>

<style scoped>
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
  .gametitle span{
    line-height: 50px;
    text-align: left;
    color: #EEEEEE;
  }
  .gametitle span:nth-child(1){
    font-size: 35px;
    padding-left: 20px;
    flex: 0.5;
  }
  .hint button{
    margin-left: 100px;
  }
  .btnPlay{
    display: flex;
    background: #FFFFFF;
    margin: 60px 10px 10px 10px;
  }
  .tryPlay,.recelivePlay,.sucessPlay{
    flex: 1;
    margin: 10px;
    height: 35px;
  }
  .tryPlay{
    margin-left: 15px;
  }
  button{
    width: 90px;
    height: 30px;
    background: #0079FE;
    border-radius: 5px;
    color: #FFFFFF;
    font-size: 15px;
  }
</style>
