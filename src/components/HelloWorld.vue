  <template>
  <div class="hello">
    <router-view></router-view>
    <div class="end">
        <img @click="home"
          :id="imgcolor == 1 ? 'color' : 'null'"
          src="..\assets\home.png"
          alt="主页"
        />
        <img @click="friend"
          :id="imgcolor == 2 ? 'color' : 'null'"
          src="..\assets\friend.png"
          alt="好友"
        />
        <img @click="my"
          :id="imgcolor == 3 ? 'color' : 'null'"
          src="..\assets\my.png"
          alt="我的"
          style="transform: scale(0.18)"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      imgcolor: 1
    };
  },
  components: {},
  created() {
    // console.log(this.$router.currentRoute.path);
    if (this.$router.currentRoute.path == "/my") {
      this.imgcolor = 3;
    } else if (this.$router.currentRoute.path == "/home/all") {
      this.imgcolor = 1;
    } else if (this.$router.currentRoute.path == "/qrcode"){
      this.imgcolor = 2;
    }
  },
  methods: {
    home() {
      this.$router.push("/home");
      this.imgcolor = 1;
    },
    friend() {
      this.$router.push("/qrcode");
      this.imgcolor = 2;
    },
    my() {
      this.$router.push("/my");
      this.imgcolor = 3;
    }
  }
};
</script>

<style scoped>
.hello {
  margin: 0px;
  padding: 0px;
}
/* 底部 */
.end {
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  border-top: 2px rgb(69, 69, 69, 0.2) solid;
}

.dd {
  width: 100%;
  height: 57px;
}
.end {
  flex: 1;
}
.end img {
  width: 100%;
  height: 200%;
  transform: scale(0.4);
  filter: grayscale(100%);
}
#color {
  filter: grayscale(0%);
}
</style>
