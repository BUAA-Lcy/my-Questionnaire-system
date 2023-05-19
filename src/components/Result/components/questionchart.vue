<template>
    <el-form ref="form" :model="form" label-width="120px" class="questionlist">
      <!-- 遍历问卷中的问题 -->
      <div class="question-title">{{ data.question_title }}</div> <!-- 修改样式 -->
      <div v-for="(question, index) in data.questions" :key="index" class="question-item">
       
        <el-form-item>
          <!-- 单选题 -->
          <div v-if="question.type === 'single-choice'">
           <!-- 引入chart1 -->
           <div id="chart1" style="width: 600px;height:400px;"></div>
            <el-button-group class="center">
                <el-button class="rendering_button" @click="changetype_to_column(0)">柱状图</el-button>
                <el-button class="rendering_button" @click="changetype_to_line(0)">折线图</el-button>
                <el-button class="rendering_button" @click="changetype_to_pie(0)">扇形图</el-button>
            </el-button-group>
            

          </div>
          <!-- 多选题 -->
          <div v-else-if="question.type === 'multiple-choice'">
            <div id="chart2" style="width: 600px;height:400px;"></div>
            <el-button-group class="center">
                <el-button class="rendering_button" @click="changetype_to_column(1)">柱状图</el-button>
                <el-button class="rendering_button" @click="changetype_to_line(1)">折线图</el-button>
                <el-button class="rendering_button" @click="changetype_to_pie(1)">扇形图</el-button>
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
const charttypelist = ref(['line','bar'])
const charttype = ref('line')

var options = ref([]);
function initChart(){
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));

    myChart1.setOption(options.value[0]);
    myChart2.setOption(options.value[1]);
}
function changetype_to_column(num){
    // charttype.value = 'bar'
    charttypelist.value[num] = 'bar'
    options.value[num].series[0].type = 'bar'
    // option1.series[num].type = 'bar'
    initChart()
}
function changetype_to_line(num){
    // charttype.value = 'line'
    charttypelist.value[num] = 'line'
    options.value[num].series[0].type = 'line'
    // option2.series[num].type = 'line'
    initChart()
}
function changetype_to_pie(num){
    // charttype.value = 'line'
    charttypelist.value[num] = 'pie'
    options.value[num].series[0].type = 'pie'
    // option2.series[num].type = 'line'
    initChart()
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
      ['A', 'B', 'C'],
      ['D', 'E', 'F'],
      ['G', 'H', 'I']
    ],
    firstvalues:[
        [98,10,101],
        [20,100,50],
        [78,20,61]
    ],

});

options.value[0] = {
  xAxis: {
    type: 'category',
    data: data.value.firstoptionslist
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: charttypelist.value[0],
      data: data.value.firstvalues[0],
    }
  ]
}

options.value[1] = {
  xAxis: {
    type: 'category',
    data: data.value.firstoptionslist
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: charttypelist.value[1],
      data: data.value.firstvalues[1],
    }
  ]
}
options.value[2] = {
  series: [
    {
      type: 'pie',
      data: [
        {
          value: 98,
          name: 'A'
        },
        {
          value: 10,
          name: 'B'
        },
        {
          value: 101,
          name: 'C'
        }
      ]
    }
  ]
}



onMounted(()=>{
    initChart();
})
const form = ref({

});

</script>

<style src="../css/question.css"></style>
<style src="../css/button.css"> </style>

