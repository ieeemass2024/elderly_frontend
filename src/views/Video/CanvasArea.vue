<template>
  <div>
    <h1>区域框选</h1>
    <div
      ref="imageContainer"
      @mousedown="startSelection"
      @mousemove="updateSelection"
      @mouseup="endSelection"
      style="position: relative; display: inline-block; height: 500px; width: 600px;"
    >
      <img
        src="../../assets/images/jiankong.png"
        style="height: 100%; width: 100%"
        alt="Selectable"
        ref="image"
      />
      <!-- 显示当前选框 -->
      <div v-if="isSelecting" :style="selectionStyle" class="selection-box"></div>
      <!-- 显示结束后的选框 -->
      <div v-if="selection" :style="completedSelectionStyle" class="selection-box"></div>
    </div>
    <p v-if="selection">选区坐标：{{ selection }}</p>
    <button v-if="selection" @click="completeProcess(selection)">完成框选</button>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      isSelecting: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      selection: null,
      location: []
    };
  },
  computed: {
    selectionStyle() {
      const left = Math.min(this.startX, this.currentX);
      const top = Math.min(this.startY, this.currentY);
      const width = Math.abs(this.startX - this.currentX);
      const height = Math.abs(this.startY - this.currentY);

      return {
        position: "absolute",
        border: "2px solid blue",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      };
    },
    completedSelectionStyle() {
      if (!this.selection) return {};

      const { startX, startY, endX, endY } = this.selection;
      const img = this.$refs.image;
      const container = this.$refs.imageContainer;

      // 计算比例
      const scaleX = container.clientWidth / img.naturalWidth;
      const scaleY = container.clientHeight / img.naturalHeight;

      // 转换坐标到容器尺寸
      const left = Math.min(startX, endX) * scaleX;
      const top = Math.min(startY, endY) * scaleY;
      const width = Math.abs(startX - endX) * scaleX;
      const height = Math.abs(startY - endY) * scaleY;

      return {
        position: "absolute",
        border: "2px solid red",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      };
    }
  },
  methods: {
    async gotoCamera(url) {
      const server_url = url;
      const image1 = this.$refs.image;
      // const video_url1 = "rtmp://8.130.142.19:1935/hls/lym";
      // const url1 = `${server_url}?video_url=${video_url1}`;
      const url1 = server_url;
      try {
        await this.loadInitialImage(image1, url1, 10000);
      } catch (error) {
        console.error(error);
        // 视频流加载失败
        // 展示超时对应的图片
        this.imageSrc = require("../../assets/images/timeout.jpg");
      }
    },
    async loadInitialImage(element, url, timeout) {
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
    },
    async setDetectArea(url) {
      return new Promise(async (resolve, reject) => {
        try {
          // 发送POST请求设置检测范围
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              loc: this.location
            })
          });
          if (!response.ok) throw new Error("Network response was not ok.");
          this.gotoCamera("http://localhost:8090/api/v1/cv/area");
        } catch (error) {
          reject(error);
        }
      });
    },
    getMousePos(event) {
      const rect = this.$refs.imageContainer.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    },
    getScaledCoords(x, y) {
      const img = this.$refs.image;
      const container = this.$refs.imageContainer;
      const scaleX = img.naturalWidth / container.clientWidth;
      const scaleY = img.naturalHeight / container.clientHeight;
      return {
        x: x * scaleX,
        y: y * scaleY
      };
    },
    startSelection(event) {
      const { x, y } = this.getMousePos(event);
      const { x: scaledX, y: scaledY } = this.getScaledCoords(x, y);
      this.startX = x;
      this.startY = y;
      this.currentX = x;
      this.currentY = y;
      this.isSelecting = true;
      this.selection = null; // 清除之前的选框
      this.tempSelection = {
        startX: scaledX,
        startY: scaledY,
        endX: scaledX,
        endY: scaledY
      };
    },
    updateSelection(event) {
      if (!this.isSelecting) return;
      const { x, y } = this.getMousePos(event);
      const { x: scaledX, y: scaledY } = this.getScaledCoords(x, y);
      this.currentX = x;
      this.currentY = y;
      this.tempSelection.endX = scaledX;
      this.tempSelection.endY = scaledY;
    },
    endSelection() {
      this.isSelecting = false;
      this.selection = { ...this.tempSelection };
    },
    completeProcess(selection) {
      console.log("完成框选", selection);
      // 图像的总宽度和高度
      const imageWidth = this.$refs.image.naturalWidth;
      const imageHeight = this.$refs.image.naturalHeight;

      // 计算四个顶点的相对位置
      const loc = [
        selection.startY / imageHeight,
        selection.startX / imageWidth, // 左上角
        selection.endY / imageHeight,
        selection.startX / imageWidth, // 左下角
        selection.endY / imageHeight,
        selection.endX / imageWidth, // 右下角
        selection.startY / imageHeight,
        selection.endX / imageWidth // 右上角
      ];

      console.log(loc);
      this.location = loc;
      // 发请求
      this.setDetectArea("http://localhost:8090/api/v1/cv/area");
      this.selection = null;
    }
  },
  mounted() {
    this.gotoCamera("http://localhost:8090/api/v1/cv/area");
  }
};
</script>
  
<style>
.selection-box {
  background-color: rgba(0, 0, 255, 0.2);
}
</style>