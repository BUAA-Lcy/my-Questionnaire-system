<template>
    <el-form ref="form" :model="form" label-width="120px" class="questionlist">
      <!-- 遍历问卷中的问题 -->
      <div class="question-title">{{ data.question_title }}</div> <!-- 修改样式 -->
      <div v-for="(question, index) in data.questions" :key="index" class="question-item">
       
        <el-form-item>
          <!-- 单选题 -->
          <div v-if="question.type === 'single-choice'">
           <!-- 引入chart1 -->
            

          </div>
          <!-- 多选题 -->
          <div v-else-if="question.type === 'multiple-choice'">
            <div id="chart1" style="width: 600px;height:400px;"></div>
            <el-button-group >
                <el-button class="rendering_button" @click="changetype_to_column">柱状图</el-button>
                <el-button class="rendering_button" @click="changetype_to_line">折线图</el-button>
            </el-button-group>

          </div>
          <!-- 填空题 -->
          <div v-else-if="question.type === 'text'">
            

          </div>
        </el-form-item>
      </div>
    </el-form>

</template>

<script setup>

import * as echarts from 'echarts';
import { ElRadioGroup, ElRadioButton } from 'element-plus';
import ElementPlus from 'element-plus';
import {onMounted, ref} from "vue";

const charttype = ref('line')
var option1; 
function initChart1(){
    var myChart1 = echarts.init(document.getElementById('chart1'));
    myChart1.setOption(option1);
}
function changetype_to_column(){
    charttype.value = 'bar'
    option1.series[0].type = 'bar'
    initChart1()
}
function changetype_to_line(){
    charttype.value = 'line'
    option1.series[0].type = 'line'
    initChart1()
}
const data = ref({
    question_title : "问卷标题",
    questions: 
        [
          // 示例问卷数据
          {
            id: 'question1',
            title: 'gender？',
            type: 'single-choice',
            options: [
              { label: 'A', value: 'male' },
              { label: 'B', value: 'female' },
              { label: 'C', value: 'middle' },
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
          {
            id: 'question4',
            title: 'why do you play genshin impact？',
            type: 'text',
            placeholder: 'reason',
          },
        ],
    firstoptions:[
        {
            "option":"A",
            "content":"A",
            "count":"98",
            "percent":"90.98%"
        },
        {
            "option":"B",
            "content":"B",
            "count":"10",
            "percent":"0.10%"
        },
        {
            "option":"C",
            "content":"C",
            "count":"101",
            "percent":"10.01%"
        },
    ],
    firstoptionslist:[
        'A',
        'B',
        'C'
    ],
    firstvalues:[
        98,
        10,
        101
    ],

});

option1 = {
  xAxis: {
    type: 'category',
    data: data.value.firstoptionslist
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: charttype.value,
      data: data.value.firstvalues
    }
  ]
};


onMounted(()=>{
    initChart1();
})
const form = ref({

});
console.log(option1);

</script>

<style src="../css/question.css"></style>
<style src="../css/button.css"> </style>
