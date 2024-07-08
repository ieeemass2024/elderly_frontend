<template>
    <div>
        <div ref="lineChart" style="width: 800px; height: 400px; background-color: #ffffff; padding: 20px; border-radius: 20px;"></div>
    </div>
</template>

<script>

export default {
    data(){
        return{

        }
    },
    mounted() {
        // this.lineChart = this.$echarts.init(this.$refs.lineChart)
        // this.lineChart.setOption({
        //     title: {
        //         text: '离职入职时间对比'
        //     },
        //     // 提示框
        //     tooltip: {
        //         trigger: 'axis'
        //     },
        //     // 图例
        //     legend: {
        //         icon: 'circle',
        //         left: 'center',
        //         top: 0,
        //         data: ['离职', '入职']
        //     },
        //     grid: {
        //         left: '3%',
        //         right: '3%',
        //         bottom: '3%',
        //         containLabel: true
        //     },
        //     // 工具栏
        //     toolbox: {
        //         feature: {
        //             saveAsImage: {
        //                 type: 'png'
        //             },
        //             magicType: {
        //                 type: ['line', 'bar']
        //             }
        //         }
        //     },
        //     xAxis: {
        //         type: 'category',
        //         boundaryGap: false,
        //         data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        //     },
        //     yAxis: {
        //         type: 'value'
        //     },
        //     series: [
        //         {
        //             name: '离职',
        //             type: 'line',
        //             // smooth: true, // 平滑曲线显示
        //             // data: [120, 132, 101, 134, 190, 230, 210, 201, 234, 290, 230, 210]
        //             data: countResignList
        //         },
        //         {
        //             name: '入职',
        //             type: 'line',
        //             data: [100, 82, 91, 54, 90, 76, 110, 81, 104, 90, 130, 110]
        //         }
        //     ]
        // })
        this.createLineChart()
    },
    methods:{
        /**
       * 获取数据
       */
       createLineChart(){
        const that=this
        const gtoken = JSON.parse(localStorage.getItem('token')) ;
        const config = {
        params:{
            year:2023
        },
        headers: {
            token: gtoken
            }
        };
        this.$http.get(
        '/employee/statistics/time',config
        ).then((response) => {
            if (response.data.code === 1){
            this.$message({
            type: 'success',
            message: '查询成功'
            });
            //数据封装
           var countResignList = response.data.data.countResignList;
           var countHireList = response.data.data.countHireList;
           that.lineChart = that.$echarts.init(that.$refs.lineChart)
           that.lineChart.setOption({
            title: {
                text: '离职入职时间对比'
            },
            // 提示框
            tooltip: {
                trigger: 'axis'
            },
            // 图例
            legend: {
                icon: 'circle',
                left: 'center',
                top: 0,
                data: ['离职', '入职']
            },
            grid: {
                left: '3%',
                right: '3%',
                bottom: '3%',
                containLabel: true
            },
            // 工具栏
            toolbox: {
                feature: {
                    saveAsImage: {
                        type: 'png'
                    },
                    magicType: {
                        type: ['line', 'bar']
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '离职',
                    type: 'line',
                    // smooth: true, // 平滑曲线显示
                    // data: [120, 132, 101, 134, 190, 230, 210, 201, 234, 290, 230, 210]
                    data: countResignList
                },
                {
                    name: '入职',
                    type: 'line',
                    data: countHireList
                }
            ]
        })
        }else{
            this.$message({
            type: 'error',
            message: '查询失败'
            });
        }
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '网络问题，失败'
            });
        });

      },

    },


}
</script>
