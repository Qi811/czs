<template>
  <div class="bodymoney">
    <div class="title">
      <div class="fan" @click="back"></div>
      <div class="tit">提现明细</div>
    </div>

    <div class="head">
      <div class="font">
        <span>总计：{{max}}</span>
      </div>
      <!-- <div class="num"></div> -->
    </div>
    <div id="son" v-if="nullson">
      <div class="de" v-for="(item, index) in list" :key="index">
        <div class="sonleft">
          <div class="sontop">
            {{ item.admin_remark }}
          </div>
          <div class="sonbottom">
            {{ item.create_time | formatDate }}
          </div>
        </div>
        <div class="sonright">
          <div :class="moneycolor ? rightmo : rightney">
            {{ item.price }}
          </div>
          <div class="sonbottom">
            {{ item.statusName }}
          </div>
        </div>
      </div>
    </div>
    <div :style="{ display: nullson ? 'none' : 'block' }">
        <div
          style="
            font-size: 18px;
            color: #696969;
            text-align: center;
            background-color: #F3F3F3;
            line-height: 80px;
          "
        >
          暂无数据
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page:1,
      size:100,
      nullson: false,
      moneycolor: false,
      rightmo: 'rightmo',
      rightney: 'rightney',
    }
  },
  filters: {
    formatDate: function (value) {
      return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    }
  },
  created () {
    var that = this
    var size = this.sisi
    this.$http
      .post('/tiXianInfo', {
        id: localStorage.getItem('id'),
        page:this.page,
        size:this.size
      }).then(res => {
          this.list = res.data.data
          if(res.data.data.length > 0){
            this.nullson = true
          }
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].statusName == '已转款'){
              this.moneycolor = true
            }else{
              this.moneycolor = false
            }
          }
			});
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  computed:{
    max(){
      let res = this.list.reduce((acc,cur) => {
          return acc+cur.price
      },0)
      return res
    }
  }
}
</script>

<style scoped>
html,
* {
  margin: 0px;
  padding: 0px;
}

.bodymoney {
  background: url(..\..\assets\bj.png) no-repeat;
  background-size: 100%;
  background-color: #ececec;
}

/* 标题样式 */

.title {
  height: 60px;
  width: 100%;
  color: #fefefe;
  font-size: 16.2px;
  display: flex;
  line-height: 60px;
}

.fan {
  padding-top: 45px;
  width: 45px;
  height: 26px;
  transform: rotate(90deg) scale(0.6);
  background: url(..\..\assets\down.png) no-repeat;
}

.tit {
  flex: 1;
  text-align: center;
  padding-top: 8px;
  padding-right: 35px;
}

/* 时间--总计样式 */

.head {
  position: relative;
  right: -1%;
  width: 98%;
  height: 64px;
  background: url(..\..\assets\timeback.png);
}

.font {
  width: 320px;
  height: 100%;
  line-height: 20px;
  padding-top: 8px;
  text-align: left;
}

.font span {
  display: block;
  font-size: 15px;
}

.font span:nth-child(1) {
  color: #000000;
  margin-left: 23.6px;
  line-height: 50px;
 font-size: 17px;
 font-weight: 600;
}
/*
.font span:nth-child(2) {
  color: #696969;
  margin-left: 28.4px;
}
 */

/* .num {
  width: 45px;
  height: 26px;
  background: url(..\..\assets\down.png);
  position: relative;
  right: -90%;
  top: -70%;
  transform: scale(0.4);
} */

/* 详情盒子 */

#son {
  background-color: white;
  width: 100%;
  padding-top: 10%;
  margin-top: -34.8px;
}

.de {
  width: auto;
  height: 40px;
  margin: 0px 6px;
  border-top: 1px solid rgba(204, 204, 204, 0.5);
  padding: 12px 6px;
}

.sonleft {
  flex: 1;
  float: left;
  margin-top: 20px;
}

.sonright {
  float: right;
  text-align: right;
}

.sonleft,
.sonright {
  height: 40px;
  line-height: 20px;
}

.sontop {
  font-size: 15px;
  text-align: left;
}

.rightmo {
  color: orange;
  font-size: 15px;
  text-align: right;
}

.rightney {
  color: black;
  font-size: 15px;
  text-align: right;
}

.sonbottom {
  font-size: 11.2px;
  color: gray;
}
</style>
