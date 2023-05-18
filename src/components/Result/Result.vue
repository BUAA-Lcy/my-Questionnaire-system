<template>
  <div class="app">

    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">Test</div>
      <div class="menu">
        <el-menu mode="horizontal" router>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/contact">联系我们</el-menu-item>
          <el-menu-item index="/login">登录注册</el-menu-item>

        </el-menu>
      </div>
    </el-header>

    <div class="content-wrapper">
      <!-- 侧边栏 -->
      <el-aside class="sidebar">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" >
          <el-menu-item index="/dashboard">问卷总体信息</el-menu-item>
          <el-submenu index="components">
            <template >Components</template>
            <el-menu-item index="statistic">发送问卷</el-menu-item>
            <el-menu-item index="statistic">分析&下载</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 内容栏 -->
      <el-main class="main">
        <div>
          <div v-for="(data, index) in datasum" :key="index">
          <h2 class="questionnaire-title">{{ data.questionnaireTitle }}</h2>
        </div>
        </div>
        
        <overview></overview>
        
        <router-view>
          <div>
            <div id="pieChart" style="width: 400px; height: 400px;"></div>
            <div id="barChart" style="width: 400px; height: 400px;"></div>
          </div>
        </router-view>
      </el-main>


      
    </div>
  </div>
</template>

<script setup>
 import overview from './components/overview.vue';
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
onMounted(()=>{
  initCharts()
})
const activeIndex = ref('/')
const datasum = ref([
  {
    recovery: 100,
    views: 500,
    recoveryRate: '20%',
    avgCompletionTime: '5分钟',
    questionnaireTitle: '问卷标题'    
  }
]);
const dataTest = ref([
  { value: 335, name: 'xbs' },
  { value: 310, name: 'xbs' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 1548, name: '搜索引擎' },
])
const pieChart = ref(null)
const barChart = ref(null)

function initCharts() {
  // 初始化扇形图np
  const pieChart = echarts.init(document.getElementById("pieChart"));//初始化一个表
  const pieOption = {
    title: {
      text: '扇形图示例',
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

  // 初始化柱状图
  const barChart = echarts.init(document.getElementById("barChart"));
  const barOption = {
    title: {
      text: '柱状图示例',
      left: 'center',
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  barChart.setOption(barOption);
}
</script>

<style src="./css/AIlayout.css"></style>
<style src="./css/question.css"></style>

