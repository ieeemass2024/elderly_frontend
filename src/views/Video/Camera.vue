<template>
  <div>
    <el-select v-model="selectedValue" placeholder="请选择摄像头" @change="changeCVal">
      <el-option value="1" label="307监控"></el-option>
      <el-option value="2" label="情绪识别"></el-option>
      <el-option value="3" label="摔倒检测"></el-option>
    </el-select>
    <el-button style="margin-left:10px;" @click="changeCamera" type="primary" plain>切换</el-button>
    <div class="line"></div>
    <br />
    <div class="vid">
      <img
        ref="image"
        style="text-align: center; height: 500px; width: 600px; z-index: -1;"
        @error="onImageError"
        :src="imageSrc"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 加载视频前顶替用的图片
      // imageSrc: require("../../assets/images/blank.jpg"),
      imageSrc: require("../../assets/images/jiankong.png"),
      selectedValue: "",
      changeValueC: ""
    };
  },
  methods: {
    changeCVal(val) {
      this.changeValueC = val;
    },
    changeCamera() {
      var camera = this.changeValueC;
      if (camera === "1") {
        this.gotoCameraOne();
      } else if (camera === "2") {
        this.gotoCameraTwo();
      } else if (camera === "3") {
        this.gotoCameraThree();
      }
    },
    changeAVal(val) {
      this.changeValueA = val;
    },
    onImageError() {
      // 图片404时展示这张图
      this.imageSrc = require("../../assets/images/error.jpg");
    },

    async gotoCameraOne() {
      const server_url = "http://localhost:8090/api/v1/cv/video";
      const image1 = this.$refs.image;
      const url1 = server_url;
      try {
        await this.loadImage(image1, url1, 5000); // 设置加载超时时间为 5000 毫秒（5秒）
      } catch (error) {
        console.error(error);
        // 视频流加载失败
        // 展示超时对应的图片
        this.imageSrc = require("../../assets/images/timeout.jpg");
      }
    },

    async gotoCameraTwo() {
      const server_url = "http://localhost:8090/api/v1/cv/face";
      const image2 = this.$refs.image;
      const url2 = server_url;
      try {
        await this.loadImage(image2, url2, 5000); // 设置加载超时时间为 5000 毫秒（5秒）
      } catch (error) {
        console.error(error);
        // 视频流加载失败
        // 展示超时对应的图片
        this.imageSrc = require("../../assets/images/timeout.jpg");
      }
    },
    async gotoCameraThree() {
      const server_url = "http://localhost:8090/api/v1/cv/fall";
      const image3 = this.$refs.image;
      const url3 = server_url;
      try {
        await this.loadImage(image3, url3, 5000); // 设置加载超时时间为 5000 毫秒（5秒）
      } catch (error) {
        console.error(error);
        // 视频流加载失败
        // 展示超时对应的图片
        this.imageSrc = require("../../assets/images/timeout.jpg");
      }
    },
    loadImage(element, url, timeout) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const timer = setTimeout(() => {
          reject(new Error("Image loading timed out"));
        }, timeout);
        img.onload = () => {
          clearTimeout(timer);
          element.src = url;
          resolve();
        };
        img.onerror = error => {
          clearTimeout(timer);
          reject(error);
        };
        img.src = url;
      });
    }
  }
};
</script>
<style>
.image {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>