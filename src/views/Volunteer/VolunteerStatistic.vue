<template>
  <div>
    <div
      ref="lineChart"
      style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.createLineChart();
  },
  methods: {
    createLineChart() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
      params:{
          year:2024
      },
      headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/volunteer/statistics/time", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            var countCheckOutList = response.data.data.countCheckOutList;
            var countCheckInList = response.data.data.countCheckInList;
            that.lineChart = that.$echarts.init(that.$refs.lineChart);
            that.lineChart.setOption({
              title: {
                text: "离开访问时间对比"
              },
              // 提示框
              tooltip: {
                trigger: "axis"
              },
              // 图例
              legend: {
                icon: "circle",
                left: "center",
                top: 0,
                data: ["离职", "入职"]
              },
              grid: {
                left: "3%",
                right: "3%",
                bottom: "3%",
                containLabel: true
              },
              // 工具栏
              toolbox: {
                feature: {
                  saveAsImage: {
                    type: "png"
                  },
                  magicType: {
                    type: ["line", "bar"]
                  }
                }
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: [
                  "一月",
                  "二月",
                  "三月",
                  "四月",
                  "五月",
                  "六月",
                  "七月",
                  "八月",
                  "九月",
                  "十月",
                  "十一月",
                  "十二月"
                ]
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  name: "离开",
                  type: "line",
                  data: countCheckOutList
                },
                {
                  name: "访问",
                  type: "line",
                  data: countCheckInList
                }
              ]
            });
          } else {
            this.$message({
              type: "error",
              message: "查询失败"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "网络问题，失败"
          });
        });
    }
  }
};
</script>