<template>
  <div class="body">
    <div class="title">
      <img src="../../assets/tui.png" alt="" @click="back" />任务详情
    </div>
    <div class="taskname">
      <div class="tasktop">
        <div class="tasktopleft"></div>
        <div class="tasktopright">
          <span>任务名称：{{ list.title }}</span>
          <span>完成时间：{{ time }}</span>
        </div>
      </div>
      <div class="taskbtom">
        <span>剩余：{{ list.maxNum }}</span>
        <span
          >任务金额：+<span class="taskmo">{{ list.price }}</span></span
        >
      </div>
    </div>
    <div class="taskstate">
      <div class="state">任务说明：</div>
      <div class="statent" ref="state">加载中.......请稍后........</div>
    </div>
    <div :class="taskpull ? tanull : takpull">
      <div class="taskpullimg">
        <div class="state">任务提交：</div>
        <!-- :file-list="imagelist" -->
        <el-upload
          action="http://47.99.210.93:8080/externalApi/upload"
          list-type="picture-card"
          :auto-upload="true"
          :on-change="upchange"
          :limit="5"
          :file-list="fileList"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
                style="font-size: 15px"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file, fileList)"
                style="font-size: 15px"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <!-- <form
          action="192.168.0.7/Api/upload"
          method="post"
          enctype="multipart/form-data"
        >
          选择：<input type="file" name="file" multiple />
          <input type="submit" value="提交" />
        </form> -->
      </div>
      <div class="taskpulltxt">
        <div>备注：</div>
        <textarea type="text" v-model="textva" placeholder="您可以输入手机号码(13xxxxxxxxx),及想对发单者说的内容!(非必填)"></textarea>
      </div>
    </div>
    <div class="btom" v-if="fucktask">
      <div :class="taskpull ? tanull : takpull">
        <button @click="taskup">放弃任务</button>
        <button @click="taskupload">提交任务</button>
      </div>
      <button @click="pull" v-if="taskpull">领取任务</button>
    </div>
    <div class="hiit" v-if="hint">
      <div class="hint">
        <div>记得上传验证图片哦~</div>
        <button @click="hintbtn" style="margin-left: -10px;">确认</button>
      </div>
    </div>
    <div class="hiit" v-if="exit">
      <div class="hint">
        <div>确定要放弃吗？(注:放弃便不能再领取)</div>
        <button id="cancel" @click="cancelbtn">取消</button>
        <button id="sure" @click="surebtn">确认</button>
      </div>
    </div>
    <div class="hiit" v-if="hin">
      <div class="hint" style="height: 100px">
        <div>{{ tishi }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      con: null,
      createtime: null,
      endtime: null,
      time: "",
      taskpull: false,
      tanull: "tanull",
      takpull: "takpull",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      hint: false,
      hin: false,
      fileList: [],
      upimage: "",
      tishi: "",
      exit: false,
      imagelist: [],
      textva: "",
      id : this.$route.params.id,
      obj : localStorage.getItem("id"),
      iftask:0,
      fucktask:true
    };
  },
  created() {
    var id = this.$route.params.id;
    var obj = this.obj;
    var that = this;

    this.$http
      .post("/taskDetails",  { taskID: id, userId: obj  })
      .then((res) => {
        // console.log(res);
        that.list = res.data.data;
        that.con = that.list.content;
        var stat = res.data.statusInfo;
         if(stat == 1){ //已领取
          that.taskpull = false;
        }
        else if(stat == 2||stat==5||stat==3||stat==4){//放弃||审核失败||等待审核||已完成
          that.fucktask = false;
          that.taskpull = true;
        }else if(stat == 0){//未领取
          that.taskpull = true;
        }

        // console.log(that.list);
        that.$refs.state.innerHTML = that.con;
        this.$moment.locale("zh-cn");
        that.createtime = this.$moment(that.list.createTime).format(
          "YYYY/MM/DD hh:mm:ss"
        );
        that.endtime = this.$moment(that.list.endTime).format(
          "YYYY/MM/DD hh:mm:ss"
        );

        // 计算时间差
        var date1 = new Date(that.createtime); //开始时间
        var date2 = new Date(that.endtime); //结束时间
        var date3 = date2.getTime() - date1.getTime(); //时间差的毫秒数 //计算出相差天数
        var days = Math.floor(date3 / (24 * 3600 * 1000)); //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000)); //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差秒数

        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        that.time = hours + "小时 " + minutes + " 分钟" + seconds + " 秒";

        // console.log(that.createtime + "时间" + that.endtime);
      });
  },
  methods: {
    back() {
      this.$router.push('/home');
    },
    pull() {

		var that = this;
		  this.$http
			.post("/taskGain", {

				taskId: that.id,
				id: that.obj,

			})
			.then((res) => {
			  // console.log(res);

			 if( res.data.code==0){
			   that.hin = true;
			   that.tishi="领取成功！快去完成任务吧";
			   setTimeout(function(){
				 that.hin = false;
			   },1500);
			   that.iftask = 1;
			   this.taskpull = false;

			 }else{
			   that.hin = true;
			   that.tishi=res.data.message;
			   setTimeout(function(){
				 that.hin = false;
			   },1500);
			   that.iftask = 1;
			   this.taskpull = true;
			 }
		})
    },
    taskup() {
      this.exit = true;
    },
    taskupload() {
      var that = this;
      for (let i = 0; i < that.fileList.length; i++) {
        that.imagelist.length = that.fileList.length;
        that.imagelist[i] = that.fileList[i].res;
        that.upimage = that.imagelist.join(",");
      }
      // console.log(that.upimage);
      if (that.upimage == "") {
        this.hint = true;
      }else {
        var id = this.$route.params.id - 0;
        var obj = this.obj;
        var userin = that.textva;
        var upfile = that.upimage;
        var that = this;
        this.$http
          .post("/taskSubmit", {
            id: id, file: upfile, userId: obj, userInfo: userin
          })
          .then((res) => {
            // console.log(res);
            if (res.data.code == 0) {
              that.tishi = "提交成功！";
              that.hin = true;
              setTimeout(function () {
                that.hin = false;
                that.fileList = [];
                that.taskpull = false;
                that.$router.go(-1);
              }, 2000);
            } else {
              that.tishi = "提交失败，请重新提交";
              that.hin = true;
              setTimeout(function () {
                that.hin = false;
              }, 2000);
            }
          });
	  }
    },
    hintbtn() {
      this.hint = false;
    },
    cancelbtn() {
      this.exit = false;
    },
    surebtn() {
      var that = this;
      this.$http
        .post("/taskAbandon", {
           id: that.id, userId: that.obj
        })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
              that.fucktask = false;
              that.taskpull = true;
          } else {
           that.hin = true;
          }
        })
      this.exit = false;
      this.taskpull = false;
      this.fileList = [];
    },
    upchange(file) {
      var that = this;
      if (file.response != undefined) {
        that.fileList.push({
          name: file.name,
          url: file.url,
          res: file.response.data,
          status: "...",
        });
        // console.log(that.fileList);
      }
    },
    handleRemove(file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].url == file.url) {
          this.fileList.splice(i, 1);
        }
      }
      // console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped="scoped">
.body {
  width: 100%;
  height: 100%;
  background: url(../../assets/detailsback.png) no-repeat;
  background-size: 100%;
  background-color: #ececec;
}
label {
  display: block;
}
/* 页面标题 */
.title {
  width: 100%;
  height: 20px;
  padding-top: 35px;
	padding-bottom: 5px;
  font-size: 18px;
  color: #fff;
  letter-spacing: 4px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #0079FE;
  z-index: 999;
}
.title img {
  width: 20px;
  height: 20px;
  padding-left: 20px;
  float: left;
}

/* 任务概述 */
.taskname {
  height: 180px;
  margin: 60px 10px 0px 10px;
  border: 1px solid rgba(95, 95, 95, 0.4);
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}
.tasktop,
.taskbtom {
  display: flex;
}
.tasktopleft {
  width: 60px;
  height: 60px;
  margin: 15px 20px 20px 10px;
  background: url(../../assets/cheng.png) no-repeat;
  background-size: 100%;
}
.tasktopright {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  line-height: 25px;
  font-size: 15px;
  font-weight: 550;
  text-align: left;
  justify-content: center;
}
.taskbtom {
  justify-content: space-between;
  padding: 20px 5px 0px 5px;
}
.taskbtom span:nth-child(2) {
  color: #ff4e00;
  font-size: 18px;
  font-family: Arial;
}
.taskmo {
  font-size: 22px;
  font-family: Hannotate SC;
  padding-left: 5px;
}

/* 任务说明 */
.taskstate {
  margin: 5px 10px 0px 10px;
  border: 1px solid rgba(95, 95, 95, 0.4);
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  overflow: hidden;
  white-space: normal;
  word-break: break-all;
}
.state {
  text-align: left;
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 17px;
  font-weight: 550;
}
.statent {
  padding: 10px 20px;
  background-color: #eaeaea;
  line-height: 25px;
  text-align: left;
  font-size: 15px;
}
img{
  width: 100%;
  height: 100%;
}

/* 任务步骤 */
/* .step {
  padding: 10px 20px;
  line-height: 25px;
  text-align: left;
  font-size: 15px;
}
.stepimg {
  width: 320px;
}
.stepimg img {
  width: 100%;
} */

/* 底部领取任务*/
.btom {
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}
.btom button {
  width: 120px;
  height: 45px;
  color: #eee;
  font-size: 15px;
  border-radius: 15px;
  border: none;
  background-color: #1d77ff;
}
.btom button:active {
  opacity: 0.5;
}
/* 领取提交放弃任务 */
.tanull {
  display: none;
}
.takpull {
  display: block;
  height: 100%;
  margin: 10px 10px;
  padding-bottom: 10px;
}
.takpull button {
  margin: 0px 10px;
}
.takpull button:nth-child(1) {
  border: 2px solid #1d77ff;
  background: #eee;
  color: #1d11ff;
}
/* 提交图片 */
.taskpullimg,
.taskpulltxt {
  height: 200px;
  border: 1px solid rgba(95, 95, 95, 0.4);
  border-radius: 5px;
  background: #fff;
  padding: 10px;
}
.taskpulltxt {
  margin-top: 10px;
  text-align: left;
}
.taskpulltxt textarea {
  border: none;
  outline: none;
  font-size: 15px;
  margin-top: 15px;
  color: gray;
  width: 100%;
  height: 80px;
}
/* 备注 */

</style>
