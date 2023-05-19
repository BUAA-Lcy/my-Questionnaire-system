<template>
    <div>
      <div v-for="question in state.questions" :key="question.id">
        <h2>{{ question.title }}</h2>
        
            <div>
            
            </div>
            <div :id="'chart'+ question.id "  style="width: 600px;height:400px;"></div>
            <el-button class="rendering_button" v-for="chartType in chartTypes" :key="chartType" @click="changeChartType(question.id, chartType, question)">
                {{ chartType }}
            </el-button>

      </div>
    </div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts';
  import { ElTable, ElTableColumn,ElButton } from 'element-plus';
  import {onMounted, ref ,reactive, computed } from "vue";
  import { useStore } from 'vuex'; 
  
 
  
const state = reactive({
    questions: [ 
    {
    id: 1,
    title: '问题1',
    chartType: 'bar',
    stem: '这是问题1的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [10, 30, 30],
  },
  {
    id: 2,
    title: '问题2',
    chartType: 'bar',
    stem: '这是问题2的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [100, 30, 30],
  },
  {
    id: 3,
    title: '问题3',
    chartType: 'bar',
    stem: '这是问题3的题干',
    description: '这是问题1的描述',
    categories: ['选项1', '选项2', '选项3'],
    seriesData: [70, 80, 30],
  },
   ],
  });
  
  const chartRefs = ref([]);
  const chartTypes = ['bar', 'line', 'pie','test'];

  onMounted(() => {
    state.questions.forEach((question) => {
        chartRefs[question.id] = echarts.init(document.getElementById('chart'+question.id));        
        });
    state.questions.forEach((question) => {
        renderChart(question.id, chartTypes[0], question);
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
          radius: ['40%','70%']
        },
          ],

        
        };
    }else if (chartType === 'test') {
        option = {
        title: {
            text: question.title,
            left: 'center',
            top: 'center'
        },
        series: [
            {
            type: 'pie',
            data: [
                {
                value: 335,
                name: 'A'
                },
                {
                value: 234,
                name: 'B'
                },
                {
                value: 1548,
                name: 'C'
                }
            ],
            radius: ['40%', '70%']
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

  <style src="../css/button.css"></style>
  <style src="../css/question.css"></style>
  