<template>
  <div class="app">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="logo">Soul</div>
      <div class="menu">
        <el-menu mode="horizontal">
          <router-link to="/home">
            <el-menu-item class="header_item">首页</el-menu-item>
          </router-link>
          <router-link to="/result">
            <el-menu-item class="header_item">Reslut</el-menu-item>
          </router-link>
          <router-link to="/about">
            <el-menu-item class="header_item">关于我们</el-menu-item>
          </router-link>
          <router-link to="/contact">
            <el-menu-item class="header_item">联系我们</el-menu-item>
          </router-link>
          <router-link to="/login">
            <el-menu-item class="header_item">登录</el-menu-item>
          </router-link>
          <router-link to="/register">
            <el-menu-item class="header_item">注册</el-menu-item>
          </router-link>
          <router-link to="/donate">
            <el-menu-item class="header_item">打赏</el-menu-item>
          </router-link>
        </el-menu>
      </div>
    </el-header>
    <div class="content-wrapper">
      <!-- 侧边栏 -->
      <el-aside class="sidebar">
        <el-menu :mode="vertical">
          <router-link to="/statistic">
            <el-menu-item class="sidebar_item">问卷总体信息</el-menu-item>
          </router-link>
          <router-link to="/preview">
            <el-menu-item class="sidebar_item">问卷预览</el-menu-item>
          </router-link>
          <router-link to="/share">
            <el-menu-item class="sidebar_item">分享问卷</el-menu-item>
          </router-link>
          <router-link to="/analysis">
            <el-menu-item class="sidebar_item">分析&下载</el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>
      <!-- 内容栏 -->
      <el-main>
        <div class="main">
          <div class="center">
            <!-- 问卷标题区域 -->
            <div class="questionnaire-title">
              <h1>{{ questionnaireTitle }}</h1>
            </div>
            <!-- 问卷内容区域 -->
            <el-form ref="form" :model="form" label-width="120px" class="questionlist">
              <!-- 遍历问卷中的问题 -->
              <div v-for="(question, index) in questions" :key="index" class="question-item">
                <div class="question-title">{{ question.title }}</div>
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
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'Result',
  mounted() {
    this.initCharts();
  },
  data() {
    return {
      activeIndex: '/',
      questionnaireTitle: '问卷预览标题', // 问卷标题
      form: {}, // 用于存储问卷回答数据的对象
      questions: [
        // 示例问卷数据
        {
          id: 'question1',
          title: '问题1：您的性别是？',
          type: 'single-choice',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        {
          id: 'question2',
          title: '问题2：您喜欢的颜色（可多选）',
          type: 'multiple-choice',
          options: [
            { label: '红', value: 'red' },
            { label: '蓝', value: 'blue' },
            { label: '绿', value: 'green' },
          ],
        },
        {
          id: 'question3',
          title: '问题3：您的兴趣爱好是什么？',
          type: 'text',
          placeholder: '请填写您的兴趣爱好',
        },
      ],
    };
  },
  methods: {
    handleSelect(index, indexPath) {
      this.activeIndex = index;
    },
  }
}
</script>

<style src="./css/layout.css"></style>
<style src="./css/question.css"></style>
<style src="./css/center.css"></style>