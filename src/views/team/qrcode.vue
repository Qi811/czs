<template>
	<div class="ewm" :style="{backgroundImage:'url(' + require('@/assets/images/bg/' + imgList[num] ) + ')'}">
		<div class="inner">
			<div class="inertwo">
				<div class="award">
					<div class="teamaward">
						<p class="hd">团队获得奖励</p>
						<p class="shu">{{teamPrice}}</p>
					</div>
					<div class="sucees">
						<p class="hd">已成功邀请</p>
						<p class="shu">{{teamSuccess}}<span style="font-size: 15px;padding-left: 10px;">人</span></p>
					</div>
				</div>
			</div>
			<div class="hy">
				<button class="seefriends" @click="lookFriend">
					查看好友
				</button>
			</div>
			<div class="share">
				<div class="inshare">
					<span>
						分享连接：{{url}}
					</span>
				</div>
			</div>
			<div class="incode">
				<div class="code" id="imageWrapper">
					<img :src="dataImg" id="qrcode" ref="qrcode" class="wm" />
				</div>
			</div>
			<div class="twobtn">
				<button class="btno" @click="save">保存二维码</button>
				<button class="btnt" @click="copyText(url)">复制推广链接</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ewm",
		data() {
			return {
				imgList: [
					'erw.png',
					'22.jpg',
					'33.jpg',
					'44.jpg',
					'55.jpg'
				],
				num: 0,
				timer: '',
				dataImg: '',
				dataImgs: '',
				url: '',
				teamPrice: '',
				teamSuccess: '',
				id: localStorage.getItem('id'),
				dataImgs: ""
			}
		},
		created() {
			this.getRandom(0, 4)
			this.$http.post('/shareInfo', {
				userId: this.id
			}).then((res) => {
				// console.log(res);
				this.dataImg = res.data.data
				this.url = res.data.url
			})
			this.$http.post('/teamMoney', {
				userId: this.id
			}).then((res) => {
				this.teamPrice = res.data.teamMoney
			})
			this.$http.post('/inviteNum', {
				id: this.id
			}).then((res) => {
				this.teamSuccess = res.data.number
			})
		},
		mounted() {
			// this.timer = setInterval(()=>{
			//   this.getRandom(0,9)
			// },2000)
		},
		methods: {
			getRandom(minNum, maxNum) {
				this.num = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum)
			},
			lookFriend() {
				this.$router.push('/friend')
			},
			copyText(shareLink) {
				// console.log(shareLink)
				var input = document.createElement("input");
				input.value = shareLink;
				document.body.appendChild(input);
				input.select();
				document.execCommand("Copy");
				document.body.removeChild(input);
				this.bus.$emit('tips', {
					show: true,
					title: '复制成功'
				})
			},
			save() {
				var that = this
				if(!window.plus) return;
					var pant = this.dataImg
					plus.gallery.save(pant, function () {
					  var main = plus.android.runtimeMainActivity();
					  var intent= plus.android.importClass('android.content.Intent');
					  var Uri= plus.android.importClass('android.net.Uri');
					  main.sendBroadcast(new intent(intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(pant)));
					  that.bus.$emit('tips', {
					   show: true,
					   title: '图片保存成功'
					  })
					},function(){
					  that.bus.$emit('tips', {
					   show: true,
					   title: '图片保存失败'
					  })
				});
			},
			beforeDestroy() {
				clearInterval(this.timer)
			},
		},
	}
</script>

<style scoped="scoped">
	.ewm {
		width: 100%;
		height: 100vh;
		position: relative;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		/* margin-bottom: 57px; */
		/* background-size: cover; */
		/* background-position: center; */
	}

	.inertwo {
		width: 100%;
		height: 90px;
		position: absolute;
		top: 23%;
		bottom: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.award {
		width: 90%;
		height: 90px;
		background: white;
		display: flex;
		border-radius: 7px;
	}

	.teamaward,
	.sucees {
		width: 50%;
		padding: 20px;
	}

	.sucees {
		text-align: center;
		margin-left: 40px;
		position: relative;
	}

	.shu {
		color: #FF7700;
		margin-top: 10px;
		margin-left: 20px;
		font-size: 24px;
		font-weight: bold;
	}

	.hy {
		width: 100%;
		height: 45px;
		position: absolute;
		top: 23%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.seefriends {
		height: 45px;
		padding: 10px 20px 10px 20px;
		border-radius: 5px;
		margin-top: 140px;
		background: #007EFF;
		font-size: 20px;
		color: white;
		font-weight: bold;
		letter-spacing: 2px;
	}

	.share {
		position: absolute;
		top: 43%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inshare {
		width: 90%;
	}

	.inshare span {
		color: #FFFFFF;
		word-break: break-all;
		display: inline-block;
	}

	.incode {
		width: 100%;
		height: 100px;
		position: absolute;
		top: 55%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5px;
	}

	.code {
		width: 170px;
		height: 160px;
		background-color: #E0DED9;
	}

	.wm {
		width: 160px;
		height: 150px;
		background: #FFFFFF;
		margin: 5px;
	}

	.twobtn {
		width: 100%;
		top: 80%;
		position: absolute;
		text-align: center;
	}

	.btno,
	.btnt {
		height: 45px;
		padding: 10px 20px 10px 20px;
		border-radius: 5px;
		background: #007EFF;
		font-size: 20px;
		color: white;
		letter-spacing: 2px;
	}

	.btnt {
		margin-left: 15px;
	}
</style>
