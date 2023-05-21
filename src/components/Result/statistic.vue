<template>
  

  <!-- 顶部导航栏 -->
  <el-header class="header">
    <div class="logo">Soul</div>
    
      <el-menu mode="horizontal" router>
        <el-menu-item class="header_item" index="/home">首页</el-menu-item>
        <el-menu-item class="header_item" index="/about">关于我们</el-menu-item>
        <el-menu-item class="header_item" index="/contact">联系我们</el-menu-item>
        <el-menu-item class="header_item" index="/login">登录注册</el-menu-item>
        
      </el-menu>
    
  </el-header>

  <div class="content-wrapper">
    <!-- 侧边栏 -->
    <el-aside class="sidebar">
      <el-menu class="el-menu-vertical-demo" >
        <el-menu-item class="sidebar_item" index="/dashboard">问卷总体信息</el-menu-item>
        <el-menu-item class="sidebar_item" index="/statistic">分析</el-menu-item>              
        <el-menu-item class="sidebar_item" index="/statistic">发送问卷</el-menu-item>
        <el-menu-item class="sidebar_item" index="/statistic">下载</el-menu-item>
        
      </el-menu>
    </el-aside>

    <!-- 内容栏 -->
    <el-main class="main">
      <div class="questionnaire-title">{{ questionnaireTitle }}</div>

      <div class="overview">
            <div class="overview-header">
              <h2 class="overview-title">问卷总体情况</h2>
            </div>
            <el-table :data="sumtableData" class="overview-table" stripe border>
              <el-table-column label="回收量" prop="recovery">
                <template #default="{ row }">
                  <span class="overview-number">{{ row.recovery }}</span>
                </template>
              </el-table-column>
              <el-table-column label="浏览量" prop="views">
                <template #default="{ row }">
                  <span class="overview-number">{{ row.views }}</span>
                </template>
              </el-table-column>
              <el-table-column label="回收率" prop="recoveryRate">
                <template #default="{ row }">
                  <span class="overview-number">{{ row.recoveryRate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="平均完成时间" prop="avgCompletionTime">
                <template #default="{ row }">
                  <span class="overview-number">{{ row.avgCompletionTime }}</span>
                </template>
              </el-table-column>
            </el-table>
      </div>

      <el-form ref="form" :model="form" label-width="120px" class="questionlist">
              <!-- 遍历问卷中的问题 -->
              <div v-for="question in state.questions" :key="question.id" class="question-item">
                <h2 class="question-title">{{ question.title }}</h2>
                <div class="question-description">{{ question.description }}</div>

                <div v-if="question.questionType === 'choice'">
                  <div class="question-chart-container">
                    <div :id="'chart'+ question.id "  class="question-chart"></div>
                  </div>
                  <div class="button-container">
                      <el-button class="rendering_button" v-for="chartType in chartTypes_for_chart" :key="chartType" @click="changeChartType(question.id, chartType, question)">
                          {{ chartType }}
                      </el-button>
                  </div>
                </div>
                <div v-if="question.questionType === 'star'">
                  <div class="question-chart-container">
                    <div :id="'chart'+ question.id "  class="question-chart"></div>
                  </div>
                  <div class="button-container">
                      <el-button class="rendering_button" v-for="chartType in chartTypes_for_star" :key="chartType" @click="changeChartType(question.id, chartType, question)">
                          {{ chartType }}
                      </el-button>
                  </div>
                </div>
                <div v-if="question.questionType === 'number'">
                  <div class="question-chart-container">
                    <div :id="'chart'+ question.id "  class="question-chart"></div>
                  </div>
                  <div class="button-container">
                      <el-button class="rendering_button" v-for="chartType in chartTypes_for_number" :key="chartType" @click="changeChartType(question.id, chartType, question)">
                          {{ chartType }}
                      </el-button>
                  </div>
                </div>
                <div v-if="question.questionType === 'text'">
                  <div class="table-container">
                    <table >
                    <thead> 
                      <tr>
                        <th>编号</th>
                        <th>回答</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(answer, index) in question.seriesData" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ answer }}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
        </el-form>
    </el-main>
  </div>

</template>

  
<script setup>
  import * as echarts from 'echarts';
  import { ElTable, ElTableColumn,ElButton } from 'element-plus';
  import {onMounted, ref ,reactive, computed } from "vue";
  import { useStore } from 'vuex'; 
const form = ref({});
const sumtableData = reactive([
  {
    recovery: 100,
    views: 500,
    recoveryRate: '20%',
    avgCompletionTime: '5分钟'
  }
]);
const questionnaireTitle = ref('问卷标题');
const activeIndex = ref('/');
const chartTypes_for_chart = ['bar', 'line', 'pie','ring'];
const chartTypes_for_star = ['bar','line','pie','ring'];
const chartTypes_for_number = ['scatter','ring','line'];

const state = reactive({
    questions: [ 
    {
    id: 1,
    title: '问题1',
    questionType: 'choice',
    chartType: 'bar',
    stem: '这是问题1的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [10, 30, 30],
  },
  {
    id: 2,
    title: '问题2',
    questionType: 'choice',
    chartType: 'line',
    stem: '这是问题2的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [100, 30, 30],
  },
  {
    id: 3,
    title: '问题3',
    questionType: 'choice',
    chartType: 'pie',
    stem: '这是问题3的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [70, 80, 30],
  },
  {
    id: 4,
    title: '问题4',
    questionType: 'text',
    chartType: 'pie',
    stem: '这是问题4的题干',
    description: '这是问题4的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: ["yodsaasddas", "adsasadsas", "adsas212"],
  },
  {
    id: 5,
    title: '问题5',
    questionType: 'text',
    chartType: 'pie',
    stem: '这是问题5的题干',
    description: '这是问题5的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: ["adsadsdasdasd", "fgdgdfdsasasdsadadsadsas", "sas2dasads12"],
  },
  {
    id: 6,
    title: '问题6',
    questionType: 'star',
    chartType: 'pie',
    stem: '这是问题6的题干',
    description: '这是问题6的描述',

    //从1-10的自然数 
    categories: [1,2,3,4,5,6,7,8,9,10],
    //每个选项的人数
    seriesData:  [6,5,6,7,8,1,2,4,6,8],
  },
  {
    id: 7,
    title: '问题7',
    questionType: 'number',
    chartType: 'pie',
    stem: '这是问题7的题干',
    description: '这是问题7的描述',

    number_data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],

    // 这时候categories就表示每个选项选择的个数
    categories:  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],

    //每个选项的人数
    seriesData:  [1,1,1,2,1,3,1,4,10,1,2,1,1,1,1],
  },
   ],
  });
  
  const chartRefs = ref([]);


  onMounted(() => {
    state.questions.forEach((question) => {
        if(question.questionType === 'choice'){
          chartRefs[question.id] = echarts.init(document.getElementById('chart'+question.id));
          renderChart(question.id, question.chartType, question);   
        }   
        if(question.questionType === 'star'){
          chartRefs[question.id] = echarts.init(document.getElementById('chart'+question.id));
          renderChart(question.id, question.chartType, question);   
        }   
        if(question.questionType === 'number'){
          chartRefs[question.id] = echarts.init(document.getElementById('chart'+question.id));
          renderChart(question.id, question.chartType, question);   
        }  
        });
    
      
    });
  
  const renderChart = (questionId, chartType, question) => {

    let option;
    if (chartType === 'bar') {
      option = {
        xAxis: {
          type: 'category',
          data: question.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          type: 'bar',
          data: question.seriesData,
        }],
      };
    } else if (chartType === 'line') {
      option = {
        xAxis: {
          type: 'category',
          data: question.continued_categories,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          type: 'line',
          data: question.seriesData,
        }],
      };
    }else if (chartType === 'pie') {
        var template = [];
        for(let i=0;i<question.categories.length;i++){
            template.push({value:question.seriesData[i],name:question.categories[i]})
        }
      option = {
        title: {
            left: 'center',
            top: 'center'
        },
        series: [
        {
          type: 'pie',
          data: template,
        },
          ],

        
        };
    }else if (chartType === 'ring') {
        var template = [];
        for(let i=0;i<question.categories.length;i++){
            template.push({value:question.seriesData[i],name:question.categories[i]})
        }
        option = {
        title: {
            text: question.title,
            left: 'center',
            top: 'center'
        },
        series: [
            {
            type: 'pie',
            data: template,
            radius: ['40%', '70%']
            }
        ]
      };
    }else if (chartType === 'scatter') {
      // 注意，散点图纵坐标是值，而不是人数
      var template = [];
        for(let i=0;i<question.number_data.length;i++){
            template.push([i,question.seriesData[i]])
        }
      option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: template,
            type: 'scatter'
          }
        ]
      };
    }
    chartRefs[questionId].clear();
    chartRefs[questionId].setOption(option);
  };
  
  const changeChartType = (questionId, chartType, question) => {
    renderChart(questionId, chartType,question);
  };


  </script>

<style src="./css/frame.css"></style>
<style src="./css/overview.css"></style>
<style src="./css/question.css"></style>
<style src="./css/button.css"></style>
<style src="./css/questionTable.css"></style>

