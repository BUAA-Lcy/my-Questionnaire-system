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
                </el-form-item>
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
export default {
  name: 'preview',
  mounted() {
  },
  data() {
    return {
      activeIndex: '/',
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
          {
            id: 'question4',
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
  }
}
</script>



<style src="./css/AIlayout.css"></style>
<style src="./css/question.css"></style>
<style src="./css/center.css"></style>

