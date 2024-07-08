<template>
  <div>
    <div
      ref="myChart"
      style="width: 400px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
    <div
      ref="myChart2"
      style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"
    ></div>
  </div>
</template>
 
<script>
export default {
  mounted() {
    // this.myChart = this.$echarts.init(this.$refs.myChart)
    // this.myChart.setOption({
    //     title: {
    //         text: '32469',
    //         subtext: '身体状况',
    //         left: 'center',
    //         top: '43%',
    //         subtextStyle: {
    //           fontSize: 18
    //         }
    //     },
    //     tooltip: {
    //         trigger: 'item'
    //     },
    //     legend: {
    //         icon: 'circle',
    //         top: '0',
    //         left: 'right'
    //     },
    //     series: [
    //         {
    //             name: '身体状况',
    //             type: 'pie',
    //             radius: ['40%', '55%'],
    //             label: {
    //                 show: true,
    //                 padding: [0, -60],
    //                 overflow: 'none',
    //                 fontSize: '15',
    //                 fontWeight: 'bold',
    //                 formatter: '{d}%\n\n{c}'
    //             },
    //             labelLine: {
    //                 show: true,
    //                 length: 15,
    //                 length2: 60
    //             },
    //             itemStyle: {
    //                 normal: {
    //                     color: function (params) {
    //                         var colorList = ['#4FC3F7', '#00C853', '#F57F17']
    //                         return colorList[params.dataIndex]
    //                     }
    //                 }
    //             },
    //             data: [
    //                 { name: '健康', value: 1048 },
    //                 { name: '身体不适', value: 735 },
    //             ]
    //         }
    //     ]
    // })
    this.createPieChart();
    this.createColumnChart();
  },

  methods: {
    createPieChart() {
      const that = this;
      const gtoken = JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/elderly/statistics/health", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            var healthData = response.data.data;
            var health = healthData["健康"];
            var unfit = healthData["身体不适"];
            that.myChart = that.$echarts.init(that.$refs.myChart);
            that.myChart.setOption({
              title: {
                text: "100",
                subtext: "身体状况",
                left: "center",
                top: "43%",
                subtextStyle: {
                  fontSize: 18
                }
              },
              tooltip: {
                trigger: "item"
              },
              legend: {
                icon: "circle",
                top: "0",
                left: "right"
              },
              series: [
                {
                  name: "身体状况",
                  type: "pie",
                  radius: ["40%", "55%"],
                  label: {
                    show: true,
                    padding: [0, -60],
                    overflow: "none",
                    fontSize: "15",
                    fontWeight: "bold",
                    formatter: "{d}%\n\n{c}"
                  },
                  labelLine: {
                    show: true,
                    length: 15,
                    length2: 60
                  },
                  itemStyle: {
                    normal: {
                      color: function(params) {
                        var colorList = ["#4FC3F7", "#00C853", "#F57F17"];
                        return colorList[params.dataIndex];
                      }
                    }
                  },
                  data: [
                    { name: "健康", value: health },
                    { name: "身体不适", value: unfit }
                  ]
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
          ageOffset: 5
        },
        headers: {
          token: gtoken
        }
      };
      this.$http
        .get("/elderly/statistics/age", config)
        .then(response => {
          if (response.data.code === 1) {
            this.$message({
              type: "success",
              message: "查询成功"
            });
            //数据封装
            console.log(response.data.data);
            var labelList = response.data.data.labelList;
            var countList = response.data.data.countList;
            that.myChart2 = that.$echarts.init(that.$refs.myChart2);
            that.myChart2.setOption({
              title: {
                text: "年龄统计",
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
                data: labelList
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