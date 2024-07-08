<template>
    <div>
        <div id="chartContainer" style="width: 100%; height: 400px;"></div>
    </div>
  </template>
  
  <script>
  
  export default {
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      // 获取容器元素
      const chartContainer = document.getElementById('chartContainer');
      // 创建 ECharts 实例
      const chart = this.$echarts.init(chartContainer);

      // 柱状图的配置项和数据
      const options = {
        xAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [30, 40, 25, 50, 45],
            type: 'bar',
          },
        ],
      };

      // 使用配置项绘制柱状图
      chart.setOption(options);
    },
  },
};
  </script>
  
  