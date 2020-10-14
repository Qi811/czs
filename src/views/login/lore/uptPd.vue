<template>
  <div class="uptpd">
    <tops :uptList="uptList" class="tops"></tops>
    <div class="ubo">
      <div class="umm">
        <input class="ipt" @keydown="nowshow=true" maxlength="18" minlength="6" v-model="nowpassword" :type="isnowshow ? password : text" placeholder="请输入当前密码" />
        <!-- <span @click="nowpassword = '',nowshow = false"
          style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
          :class="nowshow?'el-icon-circle-close':''">
        </span> -->
        <div v-if="nowshow">
          <img src="../../../assets/open.png" @click="isnowshow = false" v-if="isnowshow" style="float: right;margin-top: -37px;width: 25px;height: 30px;position: absolute;right: 62px;"/>
          <img src="../../../assets/close.png" @click="isnowshow = true" v-if="!isnowshow" style="float: right;margin-top: -28px;width: 20px;height: 13px;margin-right: 2px;position: absolute;right: 62px;"/>
        </div>
      </div>
      <div class="umm">
        <input class="ipt" @keydown="newshow=true" maxlength="18" minlength="6" v-model="newpassword" :type="isnewshow ? password : text" type="password" placeholder="请输入新密码" />
        <!-- <span @click="newpassword = '',newshow = false"
          style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
          :class="newshow?'el-icon-circle-close':''">
        </span> -->
        <div v-if="newshow">
          <img src="../../../assets/open.png" @click="isnewshow = false" v-if="isnewshow" style="float: right;margin-top: -37px;width: 25px;height: 30px;position: absolute;right: 62px;"/>
          <img src="../../../assets/close.png" @click="isnewshow = true" v-if="!isnewshow" style="float: right;margin-top: -28px;width: 20px;height: 13px;margin-right: 2px;position: absolute;right: 62px;"/>
        </div>
      </div>
      <div class="umm">
    <input class="ipt" @keydown="agashow=true" maxlength="18" minlength="6" v-model="againpassword" :type="isagashow ? password : text" type="password" placeholder="请再次输入密码" />
      <!-- <span @click="againpassword = '',agashow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="agashow?'el-icon-circle-close':''">
      </span> -->
        <div v-if="agashow">
          <img src="../../../assets/open.png" @click="isagashow = false" v-if="isagashow" style="float: right;margin-top: -37px;width: 25px;height: 30px;position: absolute;right: 62px;"/>
          <img src="../../../assets/close.png" @click="isagashow = true" v-if="!isagashow" style="float: right;margin-top: -28px;width: 20px;height: 13px;margin-right: 2px;position: absolute;right: 62px;"/>
        </div>
      </div>
      <div>
        <button class="zc" @click="isOK()">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>

import tops from '@/components/top'

export default{
  name:'uptpd',
  components:{
    tops
  },
  data(){
    return{
      uptList:['el-icon-close','修改密码'],
      nowpassword:"",
      newpassword:"",
      againpassword:"",
      nowshow:false,
      newshow:false,
      agashow:false,
      isnowshow:true,
      isnewshow:true,
      isagashow:true,
      text:"text",
      password:"password"
    }
  },
  methods:{
    isOK(){
      var id = localStorage.getItem('id')
      var _this = this;
      if(this.nowpassword == ""){
        this.bus.$emit('tips', {
          show: true,
          title: '请输入旧密码'
        })
      }else if (this.nowpassword.length < 6) {
        this.bus.$emit('tips', {
          show: true,
          title: '旧密码不正确'
        })
      }else if(this.newpassword == ""){
        this.bus.$emit('tips', {
          show: true,
          title: '请输入新密码'
        })
      }else if (this.newpassword.length < 6) {
        this.bus.$emit('tips', {
          show: true,
          title: '密码不安全，建议6位以上'
        })
      }else if(this.nowpassword == this.newpassword){
        this.bus.$emit('tips', {
          show: true,
          title: '新密码和旧密码不能一样'
        })
      }else if(this.newpassword != this.againpassword){
        this.bus.$emit('tips', {
          show: true,
          title: '新密码和确认密码不一致'
        })
      }else if(this.newpassword === this.againpassword && this.newpassword != this.nowpassword){
        _this.$http.post('/revisepwd',{
          userId:id,
          oldpassword: this.nowpassword,
          newpassword: this.newpassword,
          password: this.againpassword
          }).then(function(respone){
            console.log(respone)
              if(respone.data.code === 0){
                _this.bus.$emit('tips', {
                  show: true,
                  title: "密码修改成功"
                })
              }else{
                _this.bus.$emit('tips', {
                  show: true,
                  title: respone.data.message
                })
              }
          })
      }
    }
  }
}
</script>

<style>
  .tops{
    padding: 10px 0px 0px 10px;
  }
  .el-input__inner{
    color: black;
    font-size: 12px;
    letter-spacing: 2px;
    background: #F3F3F3;
  }
  .umm{
    width: 90%;
    height: 45px;
    font-size: 16px;
    line-height: 3;
    font-family: '黑体';
    margin-left: 2%;
    margin-top: 15px;
    border-bottom: 1px solid gainsboro;
  }
  .ipt{
    outline: none;
    border: none;
    background: #F3F3F3;
    height: 40px;
    width: 90%;
    font-size: 17px;
  }
  .zc{
    width: 90%;
    margin-left: 5%;
    margin-top: 40px;
    height: 40px;
    border: none;
    outline: none;
    border-radius: 20px;
    background: #007EFF;
    color: white;
    font-size: 18px;
    letter-spacing: 1px;
    text-align: center;
  }
</style>
