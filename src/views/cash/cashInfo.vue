<template>
  <div class="cashInfo">
    <div class="title">
      <div class="fan" @click="back"></div>
      <div class="tit">提现资料</div>
    </div>
    <div class="bo">
      <div class="zf">
        <div class="lx">支付类型</div>
        <div class="xzo">
          <select class="se" v-model="isLx" @change="isSelect">
            <option value="0">支付宝</option>
            <option value="1">银行卡</option>
          </select>
        </div>
      </div>
      <div class="bank" v-if="isbank">
        <div class="banklx">
          <div class="lx">银行名称</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="bankName" placeholder="请输入银行名称"/>
          </div>
        </div>
        <div class="banklx">
          <div class="lx">支行名称</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="subbranchName" placeholder="请输入支行名称"/>
          </div>
        </div>
        <div class="banklx">
          <div class="lx">用户名</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="bankUser" placeholder="请输入用户名"/>
          </div>
        </div>
        <div class="banklx">
          <div class="lx">卡号</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="bankNumber" placeholder="请输入卡号"/>
          </div>
        </div>
      </div>
      <div class="zfb" v-if="iszfb">
        <div class="zfblx">
          <div class="lx" style="width: 80px;">用户名</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="zfbUser" placeholder="请输入用户名"/>
          </div>
        </div>
        <div class="zfblx">
          <div class="lx">支付宝账号</div>
          <div class="xz">
            <input type="text" class="ipt" v-model="zfbkNumber" placeholder="请输入支付宝账号"/>
          </div>
        </div>
      </div>
      <div class="bt">
        <button class="confirm-btn" @click="save">提 交</button>
      </div>
      <div style="padding: 16px 32px;font-size: 12px;color: #999999;text-align: center;">
        提示：请正确填写收款人的卡号和真实的收款人姓名，否则将无法正常收款
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        bankName:'',
        subbranchName:'',
        bankUser: '',
        bankNumber: '',
        zfbUser:'',
        zfbkNumber:'',
        isbank:false,
        iszfb:true,
        status:0,
        isLx:0
      }
    },
    created() {
      let uid = localStorage.getItem('id');
      if (uid) {
        var id = localStorage.getItem('id');
        this.$http.post("/payInfo", {
          userId: id,
        }).then(res => {
          this.status = res.data.status
          if(this.isLx == 1 || this.status == 3){
            this.isLx = 1,
            this.isbank = true,
            this.iszfb = false
            if (uid) {
              var id = localStorage.getItem('id');
              this.$http.post("/payInfo", {
                userId: id,
              }).then(res => {
                this.bankName=res.data.bank_name;
                this.subbranchName=res.data.subbranch_name;
                this.bankUser=res.data.bank_user;
                this.bankNumber=res.data.bank_number;
              });
            }
          }else if(this.isLx == 0 || this.status == 2){
            this.isLx = 0,
            this.isbank = false,
            this.iszfb = true
            if (uid) {
              var id = localStorage.getItem('id');
              this.$http.post("/payInfo", {
                userId: id,
              }).then(res => {
                this.zfbUser=res.data.bank_user;
                this.zfbkNumber=res.data.bank_number;
              });
            }
          }
        });
      }
    },
    methods:{
      back () {
        this.$router.push("/cash");
      },
      isSelect(){
        if(this.isLx == 0){
          this.iszfb = true,
          this.isbank = false
        }else{
          this.iszfb = false,
          this.isbank = true
        }
      },
      save(){
        if(this.isLx == 0){ //支付宝
          if (!this.zfbUser) {
            this.bus.$emit('tips', {
              show: true,
              title: '请输入支付宝名称'
            })
          } else if (!this.zfbkNumber) {
            this.bus.$emit('tips', {
              show: true,
              title: '请输入支付宝账号'
            })
          } else {
            this.$http.post("/userInfoSave", {
              userId: localStorage.getItem('id'),
              bankName:'支付宝',
              subbranchName:'',
              bankUser: this.zfbUser,
              bankNumber: this.zfbkNumber,
              status:2
            }).then(res => {
              if (res.data.code == 0) {
                this.bus.$emit('tips', {
                  show: true,
                  title: '修改成功'
                })
                this.isLx = 0,
                this.isbank = false,
                this.iszfb = true,
                this.$router.go(-1)
              } else {
                this.bus.$emit('tips', {
                  show: true,
                  title: res.data.message
                })
              }
            });
          }
        }else if(this.isLx == 1){
          if(!this.bankName){
            this.bus.$emit('tips', {
              show: true,
              title: '请输入银行名称'
            })
          }else if(!this.subbranchName){
            this.bus.$emit('tips', {
              show: true,
              title: '请输入支行名称'
            })
          }else if(!this.bankUser){
            this.bus.$emit('tips', {
              show: true,
              title: '请设置收款人姓名'
            })
          }else if(!this.bankNumber){
            this.bus.$emit('tips', {
              show: true,
              title: '请设置卡号'
            })
          }else{
            this.$http.post("/userInfoSave", {
              userId: localStorage.getItem('id'),
              bankName:this.bankName,
              subbranchName:this.subbranchName,
              bankUser: this.bankUser,
              bankNumber: this.bankNumber,
              status:3
            }).then(res =>{
              if (res.data.code == 0) {
                this.bus.$emit('tips', {
                  show: true,
                  title: '修改成功'
                })
                this.isLx = 1,
                this.isbank = true,
                this.iszfb = false,
                this.$router.go(-1)
              } else {
                this.bus.$emit('tips', {
                  show: true,
                  title: res.data.message
                })
              }
            });
          }
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .cashInfo{
    width: 100%;
    height: 100vh;
    background-size: 100%;
    background-color: #F3F3F3;
  }
  .title {
    height: 60px;
    width: 100%;
    color: #fefefe;
    font-size: 16.2px;
    display: flex;
    line-height: 60px;
    background-color: #FF5B41;
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
  .bt{
    width: 100%;
    text-align: center;
  }
  .confirm-btn{
    width: 300px;
    height: 42px;
    line-height: 42px;
    border-radius: 30px;
    margin-top: 35px;
    background: #e10a07;
    color: #fff;
    font-size: 16px;
  }
  .bo{
    margin-top: 10px;
  }
  .zf,.banklx,.zfblx{
    height: 30px;
    padding: 10px;
    border-bottom: 1px solid white;
    line-height: 30px;
    display: flex;
  }
  .xz{
      margin-left: 20px;
      flex-shrink: 0;
  }
  .xzo{
      margin-left: 16px;
      flex-shrink: 0;
  }
  .lx{
      flex-shrink: 0;
      width: 80px;
  }
  .se,.ipt{
    outline: none;
    border: none;
    background-color: #F3F3F3;
    font-size: 14px;
  }
  @media screen and (max-width: 310px){
    .lx{
      font-size: 12px;
      flex-shrink: 0;
      width: 80px;
    }
    .xz{
      flex-shrink: 0;
    }
    .confirm-btn{
      width: 280px;
    }
  }
</style>
