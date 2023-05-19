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
        <div class="questionnaire-title">问卷标题</div>

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
                    <div id="chart3" style="width: 600px;height:400px;"></div>
                    <el-button-group class="center">
                          <el-button class="rendering_button" @click="changetype_to_column(2)">柱状图</el-button>
                          <el-button class="rendering_button" @click="changetype_to_line(2)">折线图</el-button>
                          <el-button class="rendering_button" @click="changetype_to_pie(2)">扇形图</el-button>
                    </el-button-group>

                      

                    </div>
                  </el-form-item>
                </div>
              </el-form>



        
       
      </el-main>


      
    </div>
  
</template>
<script setup>
import * as echarts from 'echarts';
import { ElTable, ElTableColumn } from 'element-plus';
import {onMounted, ref ,reactive, computed } from "vue";
const selectedOption = ref('option1');
const questionnaireTitle = ref('问卷标题');
const activeIndex = ref('/')
const charttypelist = ref(['line','bar'])
const charttype = ref('line')

const form = ref({});
const sumtableData = reactive([
  {
    recovery: 100,
    views: 500,
    recoveryRate: '20%',
    avgCompletionTime: '5分钟'
  }
]);

var options = ref([]);
function initChart(){
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var myChart3 = echarts.init(document.getElementById('chart3'));
    myChart1.setOption(options.value[0]);
    myChart2.setOption(options.value[1]);
    myChart3.setOption(options.value[2]);
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
            title: 'whats your favorite game？',
            type: 'text',
            placeholder: 'reason',
            options: [
              { label: '红', value: 'red' },
              { label: '蓝', value: 'blue' },
              { label: '绿', value: 'green' },
            ],
          }, 
          // {
          //   id: 'question4',
          //   title: 'why do you play genshin impact？',
          //   type: 'text',
          //   placeholder: 'reason',
          // },
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
    data: data.value.firstoptionslist[0]
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
    data: data.value.firstoptionslist[1]
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
  xAxis: {
    type: 'category',
    data: data.value.firstoptionslist[2]
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: charttypelist.value[2],
      data: data.value.firstvalues[2],
    }
  ]
}

onMounted(()=>{
    initChart();
})

</script>

<style src="./css/frame.css"></style>
<style src="./css/overview.css"></style>
<style src="./css/question.css"></style>
<style src="./css/button.css"></style>
  
