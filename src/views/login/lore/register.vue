<template>
	<div class="register">
		<div class="usern">
		  <span>昵称</span>
		  <input type="text" v-model="nickname" maxlength="10" minlength="1" placeholder="请输入昵称"/>
      <span @click="nickname = '',nicknameshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="nicknameshow?'el-icon-circle-close':''">
      </span>
		</div>
		<div class="sjh">
		  <span>手机号</span>
		  <input type="number" maxlength="11" v-model="tel" @keydown="telshow=true" placeholder="请输入手机号"/>
      <span @click="tel = '',telshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="telshow?'el-icon-circle-close':''">
      </span>
		</div>
		<!-- <div class="yzm">
		  <span>验证码</span>
		  <input type="text" v-model="code" placeholder="请输入验证码" class="yzmk"/>
		  <button class="hqu">获取验证码</button>
		</div> -->
		<div class="mm">
		  <span>密码</span>
		  <input type="password" maxlength="18" minlength="6" @keydown="mmshow=true" v-model="pass" placeholder="请输入密码" class="ag"/>
      <!-- <span @click="pass = '',mmshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="mmshow?'el-icon-circle-close':''">
      </span> -->
		</div>
		<div class="agmm">
		  <span>确认密码</span>
		  <input type="password" maxlength="18" minlength="6" @keydown="ammshow=true" v-model="twopassword" placeholder="再次输入密码"/>
      <!-- <span @click="twopassword = '',ammshow = false"
        style="float: right;margin-top: 18px;width: 5px;height: 5px;margin-right: 15px;"
        :class="ammshow?'el-icon-circle-close':''">
      </span> -->
		</div>
		<div class="tuij">
		  <span>邀请码</span>
		  <input type="number" disabled="disabled" maxlength="6" v-model="memberId" placeholder="邀请码" style="background: white;"/>
		</div>
		<div class="zcn">
		  <button class="zc" @click="regi()">注册</button>
		</div>
	</div>
</template>

<script>

export default{
	name:'register',
	data(){
		return{
      nickname:"",
      tel:"",
      // code:"",
      pass:"",
      twopassword:"",
      memberId:"",
			cs : /^1[3-9]{1}[0123456789]{9}$/,
      nicknameshow:false,
      telshow:false,
      // mmshow:false,
      // ammshow:false
		}
	},
  created() {
    if( params.userId){
    this.MemberId = params.userId;
    }
  },
  methods:{
    regi(){
      if (this.nickname == ""){
        this.bus.$emit('tips', {
          show: true,
          title: '请输入昵称'
        })
      }
      else if (this.tel == ""){
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
      // else if(this.code == ""){
      //   console.log("验证码不能为空")
      // }
      else if(this.pass == ""){
        this.bus.$emit('tips', {
          show: true,
          title: '请设置密码'
        })
      }else if(this.twopassword == ""){
        this.bus.$emit('tips', {
          show: true,
          title: '确认密码不能为空'
        })
      }else if(this.pass.length < 6){
        this.bus.$emit('tips', {
          show: true,
          title: '密码不安全,建议6位或6位以上'
        })
      }else if(this.pass != this.twopassword){
        this.bus.$emit('tips', {
          show: true,
          title: '密码和确认密码输入不一致'
        })
      }else{
        var _this = this
        this.bus.$emit('tips', {
          show: true,
          title: '注册中...'
        })
        _this.$http.post('/register',{
          username:this.tel,
          password:this.pass,
          twopassword:this.twopassword,
          nickname:this.nickname,
          MemberId:this.memberId
        }).then(res => {
						if (res.data.code == 0) {
              localStorage.getItem("id",res.data.id)
						    // this.$Raichu.reLaunch('/pages/index/index');
                console.log('注册成功',res.data.message)
                this.bus.$emit('tips', {
                  show: true,
                  title: '注册成功'
                })
                this.$router.replace({path:'/home/all'})
						} else {
              this.bus.$emit('tips', {
                show: true,
                title: '注册失败' + res.data.message
              })
              this.$router.replace({ path: "/setting/login" })
						}
					});
      }
    }
  },
  updated() {
    if(this.nickname != ''){
      this.nicknameshow = true
    }else{
      this.nicknameshow = false
    }
    if(this.tel != ''){
      this.telshow = true
    }else{
      this.telshow = false
    }
  }
}
</script>

<style scoped="scoped">
  .sjh,.yzm,.mm,.agmm,.usern,.tuij{
    width: 90%;
    height: 40px;
    border-bottom: 1px solid gainsboro;
    font-size: 16px;
    line-height: 3;
    padding-left: 6px;
    font-family: '黑体';
    margin-left: 5%;
    margin-top: 11px;
  }
  .agmm input{
    width: 50%;
  }
  input{
    width: 60%;
    outline: none;
    border: none;
    margin-left: 20px;
    padding-left: 2px;
    height: 30px;
    font-size:17px;
  }
  .ag{
    margin-left: 35px;
  }
  /* .hqu{
    background: #007EFF;
    border: none;
    outline: none;
    width: 90px;
    height: 30px;
    float: right;
    padding: 5px;
    margin-top: 10px;
    color: white;
  } */
  .zcn{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zc{
    width: 255px;
    margin-top: 32px;
    margin-bottom: 10px;
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
