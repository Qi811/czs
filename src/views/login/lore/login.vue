<template>
  <div class="login">
    <div class="tel">
      <p>手机号</p>
      <input class="ipt" maxlength="11" @keydown="isshow=true" v-model="tel" type="text" placeholder="请输入手机号" />
      <span @click="tel = '',isshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="isshow?'el-icon-circle-close':''">
      </span>
    </div>
    <div class="pass">
      <p>密码</p>
      <input class="ipt" @keydown="mmshow=true" v-model="paw" type="text" placeholder="请输入密码" />
      <span @click="paw = '',mmshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="mmshow?'el-icon-circle-close':''">
      </span>
    </div>
    <div class="btn">
      <button class="dl" @click="logins()">登录</button>
    </div>
  </div>
</template>

<script>

export default{
  name:'login',
  data(){
    return{
      tel:'',
      paw:'',
      mmshow:false,
      isshow:false,
      cs : /^1[3-9]{1}[0123456789]{9}$/
    }
  },
  methods:{
    logins(){
      var _this = this;
      if(this.tel == ''){
        this.bus.$emit('tips', {
          show: true,
          title: '请输入手机号'
        })
      }
      else if (this.tel.length != 11) {
        this.bus.$emit('tips', {
          show: true,
          title: '请输入正确的手机号'
        })
      }
      else if (!this.cs.test(this.tel)){
        this.bus.$emit('tips', {
          show: true,
          title: '手机号输入格式不正确'
        })
      }
      else if (this.paw == '') {
        this.bus.$emit('tips', {
          show: true,
          title: '请输入密码'
        })
      }
      else{
        _this.$http.post('/externalApi/login',{
          username:this.tel,
          password: this.paw
        }).then(res => {
            console.log(res)
            if(res.data.id){
              localStorage.setItem("id",res.data.id)
              this.bus.$emit('tips', {
                show: true,
                title: '登录成功'
              })
            }else{
              this.bus.$emit('tips', {
                show: true,
                title: res.data.message
              })
            }
        })
      }
    }
  }
}
</script>

<style scoped="scoped">
  .tel,.pass{
    border-bottom: 1px solid gainsboro;
    font-size: 1.2em;
    line-height: 3;
    padding-left: 6px;
    font-family: '黑体';
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 15px;
  }
  .ipt{
    outline: none;
    border: none;
    height: 40px;
    width: 90%;
    font-size: 17px;
  }
  .btn{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dl{
    width: 255px;
    margin-left: 5%;
    margin-top: 32px;
    height: 42px;
    border: none;
    outline: none;
    border-radius: 20px;
    background: #007EFF;
    color: white;
    font-size: 1.3rem;
    letter-spacing: 10px;
    text-align: center;
  }
</style>
