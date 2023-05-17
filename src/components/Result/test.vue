<template>
  <div class="app">

    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">Soul</div>
      <div class="menu">
        
          <el-menu mode="horizontal" router>

          <el-menu-item index="/home" class="header_item">首页</el-menu-item>
          <el-menu-item index="/result" class="header_item">收集结果</el-menu-item>
          <el-menu-item index="/about" class="header_item">关于我们</el-menu-item>
          <el-menu-item index="/contact" class="header_item">联系我们</el-menu-item>
          <el-menu-item index="/login" class="header_item">登录</el-menu-item>
          <el-menu-item index="/login" class="header_item">注册</el-menu-item>

          
        </el-menu>
      </div>
    </el-header>

    <div class="content-wrapper">
      <!-- 侧边栏 -->
      <el-aside class="sidebar">
        <el-menu :mode="vertical" router>
            <el-menu-item index="/statistic" class="sidebar_item">问卷总体信息</el-menu-item>
            <el-menu-item index="/statistic" class="sidebar_item">分享问卷</el-menu-item>
            <el-menu-item index="/statistic" class="sidebar_item">分析&下载</el-menu-item>
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
                <div class="question-title">{{ question.title }}</div> <!-- 修改样式 -->
                
                <el-form-item>
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
                  <!-- 换行 -->
                  <br/>
                </el-form-item>



                <div class="main">
                    <div>
                        <div ref="pieChart" style="width: 100px; height: 100px;"></div>
                        <div ref="barChart" style="width: 100px; height: 100px;"></div>
                    </div>
                    
                </div>



                <div> 
                  <el-button-group >
                    <el-button class="rendering_button" :type="selectedOption === 'option1' ? 'primary' : ''" @click="selectedOption = 'option1'">扇形图</el-button>
                    <el-button class="rendering_button" :type="selectedOption === 'option2' ? 'primary' : ''" @click="selectedOption = 'option2'">柱状图</el-button>
                    <el-button class="rendering_button" :type="selectedOption === 'option3' ? 'primary' : ''" @click="selectedOption = 'option3'">表格</el-button>
                  </el-button-group>
                </div>
                              
                
              </div>
            </el-form>


      
        
          <div>
          </div>
          
      </div>
        
        
      </el-main>


     
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default{

  name: 'preview',

  mounted() {
      this.initCharts();
    },
  
  data() {
    return {
      activeIndex: '/',
      selectedOption: 'option1',
      questionnaireTitle: '问卷标题', // 问卷标题
      form: {}, // 用于存储问卷回答数据的对象
      questions: 
        [
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
    }
  },
  
  methods: {
      handleSelect(index, indexPath) {
        this.activeIndex = index;
      },
      initCharts() {
        // 初始化扇形图
        console.log('initCharts called');
        const pieChart = echarts.init(this.$refs.pieChart);
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
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' },
              ],
            },
          ],
        };
        pieChart.setOption(pieOption);
  
        // 初始化柱状图
        const barChart = echarts.init(this.$refs.barChart);
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
      },
    }

}
</script>



<style src="./css/layout.css"></style>
<style src="./css/question.css"></style>
<style src="./css/center.css"></style>
<style src="./css/button.css"></style>

