<template>
  <div id="pieChart" style="width: 400px; height: 400px;"></div>
</template>

<script setup>
import { reactive, ref} from "vue";

const results = reactive({
    options: [],
    percents: [],
    counts: [],
    sum : -1,
    name: ''
})
results.options = ['选项1', '选项2', '选项3']
results.percents = [0.3, 0.2, 0.5]
results.counts = [10, 5, 15]
results.sum = 30
results.name = '问题1'
const datatest = ref([])
function initCharts() {
    for(let i = 0; i < results.options.length; i++) {
        datatest.value.push({value: results.percents[i], name: results.options[i]})
    }
  // 初始化扇形图np
  const pieChart = echarts.init(document.getElementById("pieChart"));//初始化一个表
  const pieOption = {
    title: {
      text: results.name,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: dataTest.value,
      },
    ],
  };
  pieChart.setOption(pieOption);
}
</script>

<style>

</style>


