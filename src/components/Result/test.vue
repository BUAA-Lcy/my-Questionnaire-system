<template>
  <div class="app">

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
        
       
      </el-main>


      
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { ElTable, ElTableColumn } from 'element-plus';
import {onMounted, ref ,reactive, computed } from "vue";
const selectedOption = ref('option1');
const questionnaireTitle = ref('问卷标题');
const activeIndex = ref('/')

const form = ref({});
const sumtableData = reactive([
  {
    recovery: 100,
    views: 500,
    recoveryRate: '20%',
    avgCompletionTime: '5分钟'
  }
]);
 
</script>

<style src="./css/frame.css"></style>
<style src="./css/overview.css"></style>
<style src="./css/question.css"></style>
<style src="./css/button.css"></style>
  
