<template>
  <div :class="gamebtn?'divstyle':'divslle'">
    <div class="gametitle">
      <span @click="black"><</span>
      <span>试玩步骤</span>
    </div>
    <div style="padding-top: 70px;">
      <div style="padding: 15px; background-color: #fff; display: flex;">
        <div class="gameimg" :style="'backgroundImage: url(' + toplist.imgUrl + '); backgroundSize:100%;backgroundColor:none'"></div>
        <div class="gamecontent">
          <div>{{toplist.adName}}</div>
          <span>{{toplist.appSize}}</span>
          <span>{{toplist.appIntro}}</span>
        </div>
        <div class="gametime">
          <div>{{toplist.appAMoney}}</div>
          <span class="times">剩余<span>{{listtime}}</span>天</span>
        </div>
      </div>
      <div style="color: red;" v-html="toplist.appShowMsg"></div>
    </div>
    <!-- 高额奖励 -->
    <div class="titles">
      <span  v-for="(items,index) in list.awardName" :key="index" @click="titleindex(index)" :class="{titleactive:tiindex == index}">{{items}}</span>
    </div>
    <!-- 任务详情 -->
    <div :style="gameson?'display:block;':'display:none;'">
      <div class="gameuser" v-for="(userit,idx) in userlist.award0" :key="idx">
        <div class="gameindex">{{userit.dlevel}}</div>
        <div class="usercenten"><span>{{userit.event}}</span><span>{{userit.groupname}}</span></div>
        <div class="gamemo">+{{userit.money}}{{userit.unit}}</div>
      </div>
    </div>
    <!-- 充值超返 -->
    <div :style="gameon?'display:block;':'display:none;'">
      <div class="gameuser" v-for="(userit,idx) in userlist.award1" :key="idx">
        <div class="gameindex">{{userit.dlevel}}</div>
        <div class="usercenten"><span>{{userit.event}}</span><span>{{userit.groupname}}</span></div>
        <div class="gamemo">+{{userit.money}}{{userit.unit}}</div>
      </div>
    </div>
    <!-- 福利活动 -->
    <div :style="gamefu?'display:block;':'display:none;'">
      <div class="gameuser" v-for="(userit,idx) in userlist.award2" :key="idx">
        <div class="gameindex">{{userit.dlevel}}</div>
        <div class="usercenten"><span>{{userit.event}}</span><span>{{userit.groupname}}</span></div>
        <div class="gamemo">+{{userit.money}}{{userit.unit}}</div>
      </div>
    </div>
    <!-- 暂无数据 -->
    <div :style="nodata?'display:block;':'display:none;'">
        <div style="font-size: 17px;color: #595959;text-align: center;line-height: 60px;">暂时还没有东西哦~</div>
    </div>
    <!-- 底部开始任务 -->
    <div class="gamebottom" v-if="gamebtn">
      <div class="btnbot" @click="begin">{{btnlist.butName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        obj: localStorage.getItem("id"),
        tiindex: 0,
        list:[],
        listtime:0,
        userlist:[],
        gameson:true,
        gameon:false,
        gamefu:false,
        nodata:false,
        reslist:[],
        gamebtn:true,
        toplist:[],
        btnlist:[]
      }
    },
    /* 详情接口
    XwTaskDetails
    参数
    * 参数1：用户ID  userId
    * 参数2：手机系统型号（安卓 IOS） ptype
    * 参数3：安全联盟OAID  msaoaid
    * 参数4：设备号 android取设备号  deviceid
    * 参数5：安卓操作系统版本 androidosv
    * 参数6：广告编号 adid */
    created() {
      var that = this;
      var id = this.$route.params.id; //游戏id
      var obj = that.obj; //用户id
      var ptype = localStorage.getItem("ptype");
      var aosid = localStorage.getItem("aosid");
      var osid = localStorage.getItem("osid");
      var aos = localStorage.getItem("aos");
      var sv = localStorage.getItem("sv");
     that.$http
         .post("/XwTaskDetails", {
            userId: obj,
            ptype: ptype,
            msaoaid: aosid,
            deviceid: osid,
            androidosv: sv,
            adid:id
         })
         .then((res) => {
           that.list = res.data.ADInfo;
           that.userlist = that.list.awardList;
           that.toplist = that.list.baseInfo;
           that.btnlist = that.list.butInfo;
           var date1 = new Date(that.list.baseInfo.nowDate); //开始时间
           var date2 = new Date(that.list.baseInfo.stopTime); //结束时间
           function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
                   var dateSpan,
                       tempDate,
                       iDays;
                   sDate1 = Date.parse(sDate1);
                   sDate2 = Date.parse(sDate2);
                   dateSpan = sDate2 - sDate1;
                   dateSpan = Math.abs(dateSpan);
                   iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
                   return iDays
               };
           that.listtime =  datedifference(date1,date2);
         })
    },
	/* beforeRouteLeave(to,from,next) {
		this.$router.back(+1);
		// console.log(this);
		next();
	}, */
    methods: {
      black() {
        this.$router.push('/gametry');
      },
      titleindex(index) {
        var that = this;
        this.tiindex = index;
        that.gameson=false;
        that.gameon=false;
        that.gamefu = false;
        that.nodata = false;
        if(index ==1){
          if(that.userlist.award1==undefined){
            that.nodata = true;
          }else{
            that.gameon = true;
          }
        }else if(index ==0){
          if(that.userlist.award0==undefined){
            that.nodata = true;
          }else{
            that.gameson = true;
          }
        }else{
          if(that.userlist.award2==undefined){
            that.nodata = true;
          }else{
            that.gamefu = true;
          }
        }
      },
      begin(){
        var that = this;
        var id = this.$route.params.id; //游戏id
        var obj = that.obj; //用户id
        var ptype = localStorage.getItem("ptype");
        var aosid = localStorage.getItem("aosid");
        var osid = localStorage.getItem("osid");
        var aos = localStorage.getItem("aos");
        var sv = localStorage.getItem("sv");
        var reslist = that.reslist;
        that.$http.post('/XwDownload',{
          userId:obj,
          ptype:ptype,
          msaoaid:aosid,
          deviceid:osid,
          androidosv:sv,
          adid:id
        }).then((res) =>{
          reslist = eval("(" +res.data + ")");
          if(reslist.status == 0){
            // window.location.href = reslist.APPUrl;
            // console.log(reslist.APPUrl)
            this.$store.commit('getUrl',reslist.APPUrl)
            this.$router.push({path:'/gamerquest'})
            if(that.btnlist.showBut==0){
              that.gamebtn = false;
            }
          }else{
            this.bus.$emit('tips', {
              show: true,
              title: reslist.msg
            })
          }
        })
      }
    }
  };
</script>

<style>
  .divstyle{
    background-color: #F3F3F3;    
	height: 100%;
    width: 100%;
    min-height: 616px;
   padding-bottom: 50px;
  }
  .divslle{
    background-color: #F3F3F3;    
	height: 100%;
    width: 100%;
    min-height: 616px;
  }
  .gametitle {
    background: #00aaff;
    display: flex;
    height: 70px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }

  .gametitle span {
    line-height: 35px;
	margin-top: 35px;
    text-align: left;
    color: #EEEEEE;
  }

  .gametitle span:nth-child(1) {
    font-size: 35px;
    padding-left: 20px;
    flex: 0.5;
  }

  /* 广告开头 */
  .gameimg {
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }

  .gamecontent {
    margin-left: 10px;
    text-align: left;
    flex: 2;
  }

  .gamecontent div {
    font-size: 15px;
    font-weight: 600;
    line-height: 23px;
  }

  .gamecontent span {
    color: #595959;
    font-size: 12px;
        display: block;
        line-height: 22px;
  }

  .gametime {
    text-align: right;
    margin-right: 8px;
  }

  .gametime div {
    width: 70px;
    height: 25px;
    border-radius: 7px;
    text-align: center;
    background-color: coral;
    line-height: 25px;
    margin: 4px 0px;
    color: #fff;
  }

  .times {
    color: #969696;
    font-size: 12px;
        display: inline-block;
        letter-spacing: 1.5px;
        margin-top: 10px;
  }

  .times span {
    color: coral;
    border: solid 1px #959595;
    display: inline-block;
    width: 23px;
    text-align: center;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
  }

  /* 标题 */
  .titles {
    display: flex;
    margin-top: 5px;
    height: 50px;
    background: #FFFFFF;
  }

  .titles span {
    flex: 1;
    line-height: 50px;
    text-align: center;
    color: #555;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
  }

  .titles .titleactive {
    color: coral;
    z-index: 2;
    border-bottom: 2px solid coral;
  }

  /* 任务 */
  .gameuser {
    display: flex;
    background-color: #fff;
    margin: 10px 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    height: 60px;
    line-height: 60px;
  }

  .gameindex {
    width: 25px;
    height: 25px;
    text-align: center;
    border-radius: 50%;
    background-color: orange;
    color: #FFFFFF;
    margin-top: 15px;
    line-height: 30px;
    margin-left: 10px;
    box-shadow: 0px 0px 8px rgb(239, 159, 00);
  }

  .usercenten {
    flex: 2;
    font-size: 13px;
    text-align: left;
    display: flex;
    flex-direction: column;
    line-height: 15px;
    margin-top: 15px;
    margin-left: 10px;
  }

  .usercenten span:nth-child(2) {
    font-size: 12px;
    color: gray;
  }

  .gamemo {
    color: coral;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1px;
    margin-right: 8px;
  }
  /* 开始任务 */
  .gamebottom{
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .btnbot{
    width: 300px;
    height: 40px;
    margin: 5px 25px;
    border-radius: 10px;
    background-color: coral;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
</style>
