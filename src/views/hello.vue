<!-- <template>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
  </template>
  
  <script>  
  export default {
    data() {
      return {
        xData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], //横坐标
        yData: [23, 24, 18, 25, 27, 28, 25], //人数数据
        taskDate: [10, 11, 9, 17, 14, 13, 14],
        myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
      };
    },
    mounted() {
      this.initEcharts();
    },
    methods: {
      initEcharts() {
        // 多列柱状图
        const mulColumnZZTData = {
          xAxis: {
            data: this.xData
          },
          // 图例
          legend: {
            data: ["人数", "任务数"],
            top: "0%"
          },
          yAxis: {},
          series: [
            {
              type: "bar", //形状为柱状图
              data: this.yData,
              name: "人数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top"
              }
            },
            {
              type: "bar", //形状为柱状图
              data: this.taskDate,
              name: "任务数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top"
              }
            }
          ]
        };
        const myChart = this.$echarts.init(document.getElementById("mychart"));
        myChart.setOption(mulColumnZZTData);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    }
  };
  </script> -->
  
  <!-- <template>
    <div>
        <div>导入并预览</div>
         <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"   
                  :on-change="handleChange"
                   :show-file-list="false"
                  style="margin-left: 5px; display:inline;font-size:14px;"
                  accept="image/*"   
                  :auto-upload="false"
                  :before-upload = "beforeAvatarUpload">
              <el-button size="medium" type="primary" style="margin-top: 5px;margin-bottom: 5px;">导入</el-button>
         </el-upload>
         <div v-for="(item,index) in fileList" style="position: relative;">
            <img :src="item" class="avatar">
            <span class="spanname" >
              <span @click="handelchange(item)" style="cursor: pointer;">
                <i class="el-icon-zoom-in" style="font-size:20px"></i>
              </span>
              <span style="cursor: pointer;" @click="removeimg(item)">
                <i class="el-icon-delete" style="font-size:20px"></i>
              </span>
            </span>
         </div>
         <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
          dialogVisible:false,
            fileList:[],
            imageUrl:'',
            dialogImageUrl:''  //图片预览路径
        }
    },
     methods: {
       handleChange(file,fileList,params){
         var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.raw.type)
        //  console.log(testmsg)
          const isLt5M = file.size / 1024 / 1024 < 5
          if (testmsg !=true) {
            this.$message.error('上传图片格式不对!')
            return
          }
          if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
        
         this.imageUrl=URL.createObjectURL(file.raw)
         this.fileList.push(this.imageUrl)
            },
       beforeAvatarUpload(file) {
          var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
          const isLt5M = file.size / 1024 / 1024 < 5
          if (!testmsg) {
            this.$message.error('上传图片格式不对!')
            return
          }
          if (!isLt5M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return testmsg && isLt5M
        },
        handelchange(file){
          console.log(file)
          this.dialogVisible =true
          this.dialogImageUrl = file
        },
        removeimg(item, fileList){
          this.rrrrrr(item,this.fileList)
        },
        rrrrrr(arr,item){
          var index = item.indexOf(arr)
          console.log(index)
          item.splice(index,1)
        },
    }
}
</script>
<style >
.el-upload-list__item-name{
  display: none;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .spanname{
    width: 100px;
    height: 30px;
    /* background: blue; */
    position: absolute;
    top: 75px;
    left: 40px;
  }
</style> -->
<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange">
    <button @click="uploadFile">上传文件</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadFile() {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('id', "1678703411424600065")
      formData.append('file_type', "elderly")
      console.log(this.selectedFile);
      axios.post('http://43.143.247.127:8090/info/upload', formData)
        .then(response => {
          console.log(response.data);
          // 处理成功响应
          this.$message({
              type: 'success',
              message: '上传成功'
          });
        })
        .catch(error => {
          console.error(error);
          // 处理错误
        });
    }
  }
}
</script>
