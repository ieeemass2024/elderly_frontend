<template>
  <div>
    <div class="chart-title">
      <label>请选择统计年份：</label>
      <el-select v-model="selectedValue" placeholder="请选择统计年份" @change="changeCVal">
        <el-option value="2023" label="2023"></el-option>
        <el-option value="2024" label="2024"></el-option>
      </el-select>
    </div>
    <div
      ref="lineChart"
      style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
    <div
      ref="myChart2"
      style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
    <div
      ref="myChart3"
      style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedValue: "2024"
    };
  },
  mounted() {
    this.createLineChart();
    this.createColumnChart();
    this.createTypeChart();
  },

  methods: {
    changeCVal(val) {
      this.selectedValue = val;
      this.createLineChart();
      this.createColumnChart();
      this.createTypeChart();
    },
    createLineChart() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        params: {
          year: this.selectedValue
        },
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/event/statistics/time", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            var countMonthList = response.data.data.countMonthList;
            that.lineChart = that.$echarts.init(that.$refs.lineChart);
            that.lineChart.setOption({
              title: {
                text: "事件发生时间统计"
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
                data: ["次数"]
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
                  name: "次数",
                  type: "line",
                  data: countMonthList
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
    },
    createColumnChart() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        params: {
          year: this.selectedValue
        },
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/event/statistics/location", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            console.log(response.data.data);
            var locationList = response.data.data.locationList;
            var countList = response.data.data.countList;
            that.myChart2 = that.$echarts.init(that.$refs.myChart2);
            that.myChart2.setOption({
              title: {
                text: "事件发生地点统计",
                left: "top",
                // top: '43%',
                subtextStyle: {
                  fontSize: 18
                }
              },
              tooltip: {
                trigger: "item"
              },
              xAxis: {
                axisLabel: {
                  interval: 0
                },

                type: "category",
                data: locationList
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  data: countList,
                  type: "bar"
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
    },
    createTypeChart() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        params: {
          year: this.selectedValue
        },
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/event/statistics/type", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            console.log(response.data.data);
            var eventTypeList = response.data.data.eventTypeList;
            var countList = response.data.data.countList;
            that.myChart3 = that.$echarts.init(that.$refs.myChart3);
            that.myChart3.setOption({
              title: {
                text: "事件类型统计",
                left: "top",
                // top: '43%',
                subtextStyle: {
                  fontSize: 18
                }
              },
              tooltip: {
                trigger: "item"
              },
              xAxis: {
                axisLabel: {
                  interval: 0
                },

                type: "category",
                data: eventTypeList
              },
              yAxis: {
                type: "value"
              },
              series: [
                {
                  data: countList,
                  type: "bar"
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