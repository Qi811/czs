<template>
  <div class="cash">
    <div class="title">
      <div class="fan" @click="back"></div>
      <div class="tit">余额提现</div>
      <div class="jr" @click="gojr">记录</div>
    </div>
    <div class="canMoney">
      <span>可提现总额</span>
    </div>
    <div class="lookMoney">
      <span>¥ 0</span>
    </div>
    <div class="hz">
      <div class="inn">
        <div class="one">
          <span>提现金额</span>
          <span>提现最低额度10元</span>
        </div>
        <div class="two">
          <span>¥</span>
          <input type="text" v-model="money" placeholder="请输入金额" />
        </div>
      </div>
    </div>
    <div class="bz">
      <div class="inner">
        <div class="wz">备注：</div>
        <div class="bzin">
          <textarea v-model="content" @keydown="contentshow=true" placeholder="请输入内容">
          </textarea>
          <span @click="content = '',contentshow = false"
            style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
            :class="contentshow?'el-icon-circle-close':''">
          </span>
        </div>
      </div>
    </div>
    <div class="tx">
      <button @click="getCash">提现</button>
    </div>
    <div class="txSetting">
      <button @click="getcashInfo">提现账号设置</button>
    </div>
  </div>
</template>

  <script>
    export default{
      data(){
        return{
          money: '',
          content: '',
          user: '',
          bankNumber:'',
          contentshow:false
        }
      },
      created() {
        this.$http.post("/userInfo", {
          id: localStorage.getItem('id'),
        }).then(res => {
          this.user = res.data;
          this.bankNumber=res.data.bank_number;
        });
      },
      methods: {
        back () {
          this.$router.push('/my')
        },
        gojr(){
          this.$router.push('/cashList')
        },
        getCash() {
          if (!this.bankNumber) {
            this.bus.$emit('tips', {
              show: true,
              title: '请先设置提现账号'
            })
          }else{
            this.$http.post("/tiXianSubmit", {
              member_id: localStorage.getItem('id'),
              price: this.money,
              admin_remark: this.content
            }).then(res => {
              if (res.data.code == 0) {
                  this.bus.$emit('tips', {
                    show: true,
                    title: '提现成功'
                  })
                this.userInfo();
              } else {
                this.bus.$emit('tips', {
                  show: true,
                  title: res.data.message
                })
              }
            });
          }
        },
        getcashInfo(){
          this.$router.push('/cashInfo')
        }
      }
    }
  </script>

<style scoped="scoped">
.cash{
  width: 100%;
  height: 100vh;
  background: url(../../assets/backgroud.png) no-repeat;
  background-size: 100%;
  background-color: #ececec;
}
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
  padding-right: 25px;
}
.jr{
  padding-top: 8px;
  padding-right: 5px;
}
.canMoney{
  width: 100%;
  text-align: center;
  padding-top: 20px;
}
.canMoney span{
  color: white;
  font-size: 16px;
}
.lookMoney{
  width: 100%;
  padding-top: 10px;
  text-align: center;
}
.lookMoney span{
  font-size: 29px;
  color: rgb(255, 255, 255);
}
.hz{
  width: 100%;
  text-align: center;
}
.inn{
  width: 90%;
  height: max-content;
  margin-left: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: lightslategray 0px 1px 10px;
  margin-top: 15px;
  border-radius: 10px;
}
.one,.two{
  display: flex;
  flex-direction: row;
  padding: 10px;
}
.one :nth-child(1){
  font-size: 16px;
  color: rgb(51, 51, 51);
}
.one :nth-child(2){
  font-size: 11px;
  color: rgb(51, 51, 51);
  margin-left: 10px;
  margin-top: 5px;
}
.two :nth-child(1){
  font-size: 14px;
  color: rgb(51, 51, 51);
}
.two :nth-child(2){
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  margin-left: 4px;
}
.bz{
  width: 100%;
  text-align: center;
}
.inner{
  height: max-content;
  margin: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: lightslategray 0px 1px 10px;
  margin-top: 25px;
  border-radius: 10px;
  padding: 10px;
}
.wz{
  font-size: 16px;
  color: rgb(51, 51, 51);
  display: flex;
  flex-direction: row;
}
.bzin {
  display: flex;
  flex-direction: row;
  color: rgb(192, 196, 204);
  padding-top: 20px;
}
.bzin textarea{
  width: 90%;
  height: 60px;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  font-family: '正体';
}
.tx{
  width: 100%;
  text-align: center;
}
.tx button{
  width: 343px;
  margin: 16px;
  font-size: 18px;
  background: rgb(230, 67, 64);
  color: white;
  border-radius: 10px;
  height: 40px;
  line-height: 40px;
}
.txSetting{
  display: flex;
  width: 100%;
  justify-content: center;
}
.txSetting button{
  color: grey;
  padding-bottom: 30px;
  padding-top: 10px;
  background: #ececec;
}
 </style>
