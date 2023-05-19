<template>
    <div class="app">
      <div class="fixed">
  
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
          
         
          
        
        </el-main>
  
  
      </div>
      </div>
    </div>
  </template>
  <script setup>
   
  </script>
  
  <style src="../css/frame.css"></style>
    
  