<template>
  <div class="app">

    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">Soul</div>
      <div class="menu">
        
          <el-menu mode="horizontal" router>

          <el-menu-item index="/home" class="header_item">首页</el-menu-item>
          <el-menu-item index="/about" class="header_item">关于我们</el-menu-item>
          <el-menu-item index="/contact" class="header_item">联系我们</el-menu-item>
          <el-menu-item index="/login" class="header_item">登录</el-menu-item>
          <el-menu-item index="/register" class="header_item">注册</el-menu-item>
          <el-menu-item index="/donate" class="header_item">打赏</el-menu-item>

          

        </el-menu>
      </div>
    </el-header>

    <div class="content-wrapper">
      <!-- 侧边栏 -->
      <el-aside class="sidebar">
        <el-menu :mode="vertical" router>
            <el-menu-item index="/statistic" class="sidebar_item">问卷总体信息</el-menu-item>
            <el-menu-item index="/preview" class="sidebar_item">问卷预览</el-menu-item>
            <el-menu-item index="/share" class="sidebar_item">分享问卷</el-menu-item>
            <el-menu-item index="/analysis" class="sidebar_item">分析&下载</el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 内容栏 -->
      <el-main>
      <div class="main">
        <div class="questionnaire-title">
          <h1>{{ questionnaireTitle }}</h1>
                  </div>

          <!-- 问卷内容区域 -->
          <el-form ref="form" :model="form" label-width="120px" class="questionlist">
            <!-- 遍历问卷中的问题 -->
            <div v-for="(question, index) in questions" :key="index" class="question-item">
              <div class="question-title">{{ question.title }}</div>
              <el-form-item>
                <div>
                  <!-- 单选题 -->
                  <div v-if="question.type === 'single-choice'">
                    <el-radio-group v-model="form[question.id]">
                      <el-radio v-for="(option, idx) in question.options" :key="idx" :label="option.value">
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </div>

                  <!-- 多选题 -->
                  <div v-else-if="question.type === 'multiple-choice'">
                    <el-checkbox-group v-model="form[question.id]">
                      <el-checkbox v-for="(option, idx) in question.options" :key="idx" :label="option.value">
                        {{ option.label }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>

                  <!-- 填空题 -->
                  <div v-else-if="question.type === 'text'">
                    <el-input v-model="form[question.id]" :placeholder="question.placeholder"></el-input>
                  </div>
                </div>

                <!-- 图表选择框 -->
                <div>
                  <el-select v-model="chartType[question.id]" placeholder="选择图表类型">
                    <el-option label="柱状图" value="bar"></el-option>
                    <el-option label="扇形图" value="pie"></el-option>
                    <el-option label="表格" value="table"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>

            
            
          </el-form>

          <!-- Echarts图表区域 -->
          <div class="chart-area">
            <div v-for="(question, index) in questions" :key="index" class="question-chart">
              <div class="chart-title">{{ question.title }}</div>
              <div class="chart-container">
                <div v-if="chartType[question.id] === 'bar'">
                  <bar-chart :data="this.getBarOptions(question)"></bar-chart>
                </div>
                <div v-else-if="chartType[question.id] === 'pie'">
                  <pie-chart :data="this.getPieOptions(question)"></pie-chart>
                </div>
                <div v-else-if="chartType[question.id] === 'table'">
                  <table-chart :data="this.getTableData(question)"></table-chart>
                </div>
              </div>
            </div>
          </div>

            
      </div>
        
      
      </el-main>


     
    </div>
  </div>
</template>



<style src="./css/layout.css"></style>
<style src="./css/question.css"></style>
<style src="./css/center.css"></style>




<script>
import * as echarts from 'echarts';
export default {
  name: 'test',
  mounted() {
    this.initCharts();
  },
  data() {
    return {
      activeIndex: '/',
      questionnaireTitle: '问卷标题', // 问卷标题
      form: {}, // 用于存储问卷回答数据的对象
      questions: [
        // 示例问卷数据
        {
          id: 'question1',
          title: 'gender？',
          type: 'single-choice',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        {
          id: 'question2',
          title: 'favorite color？',
          type: 'multiple-choice',
          options: [
            { label: '红', value: 'red' },
            { label: '蓝', value: 'blue' },
            { label: '绿', value: 'green' },
          ],
        },
        {
          id: 'question3',
          title: 'why do you play genshin impact？',
          type: 'text',
          placeholder: 'reason',
        },
      ],
      // 示例数据
      exampleData: [
        {
          question1: 'male',
          question2: ['red', 'blue'],
          question3: 'because it is fun',
        },
        {
          question1: 'female',
          question2: ['green'],
          question3: 'to relax and relieve stress',
        },
        {
          question1: 'male',
          question2: ['red', 'green'],
          question3: 'because my friends play it and I want to join them',
        },
        {
          question1: 'female',
          question2: ['blue', 'green'],
          question3: 'because I like the story and characters',
        },
      ],
      // 用于存储每个问题对应的图表类型
      chartType: {},
    };
  },
  methods: {
    // 初始化图表
    initCharts() {
      this.questions.forEach((question) => {
        const chartContainer = document.querySelector(
          `.chart-container[data-question-id="${question.id}"]`
        );
        const chart = echarts.init(chartContainer);
        chart.setOption(this.getBarOptions(question));
        window.addEventListener('resize', () => {
          chart.resize();
        });
      });
    },

    // 获取柱状图配置
    getBarOptions(question) {
      const options = question.options.map((option) => option.label);
      const data = this.exampleData.map((item) => item[question.id]);
      return {
        title: {
          text: question.title,
        },
        tooltip: {},
        xAxis: {
          data: options,
        },
        yAxis: {},
        series: [
          {
            name: '回答人数',
            type: 'bar',
            data: data.reduce((result, item) => {
              const counts = options.map((option) =>
                item instanceof Array
                  ? item.filter((value) => value === option).length
                  : item === option ? 1 : 0
              );
              return counts.map((count, index) => result[index] + count);
            }, Array(options.length).fill(0)),
          },
        ],
      };
    },
// 获取扇形图配置
getPieOptions(question) {
      const options = question.options.map((option) => option.label);
      const data = this.exampleData.map((item) => item[question.id]);
      const counts = options.map((option) =>
        data.flatMap((value) => (value instanceof Array ? value : [value])).filter((value) => value === option)
          .length
      );
      return {
        title: {
          text: question.title,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: options,
        },
        series: [
          {
            name: '回答人数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30px',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: options.map((option, index) => ({ name: option, value: counts[index] })),
          },
        ],
      };
    },

    // 获取表格数据
    getTableData(question) {
      const data = this.exampleData.map((item) => item[question.id]);
      const options = question.options.map((option) => option.label);
      const counts = options.map((option) =>
        data.flatMap((value) => (value instanceof Array ? value : [value])).filter((value) => value === option)
          .length
      );
      return options.map((option, index) => {
        const percentage = ((counts[index] / data.length) * 100).toFixed(1);
        return { 选项: option, 数量: counts[index], 占比: `${percentage}%` };
      });
    }}
};
