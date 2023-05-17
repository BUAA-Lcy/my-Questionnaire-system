<template>
    <div class="app">

      <!-- 顶部导航栏 -->
      <el-header class="header">
        <div class="logo">Soul</div>
        <div class="menu">
          
            <el-menu mode="horizontal" router>

            <el-menu-item index="/" class="header_item">首页</el-menu-item>
            <el-menu-item route="/about" index="/about" class="header_item">关于我们</el-menu-item>
            <el-menu-item route="/contact" index="/contact" class="header_item">联系我们</el-menu-item>
            <el-menu-item route="/login" index="/login" class="header_item">登录</el-menu-item>
            <el-menu-item route="/login" index="/login" class="header_item">注册</el-menu-item>
            <el-menu-item route="/login" index="/login" class="header_item">打赏</el-menu-item>

            

          </el-menu>
        </div>
      </el-header>
  
      <div class="content-wrapper">
        <!-- 侧边栏 -->
        <el-aside class="sidebar">
          <el-menu :mode="vertical" router>
              <el-menu-item index="/statistic" class="sidebar_item">问卷总体信息</el-menu-item>
                <!-- <el-submenu index="components"> -->
                <!-- <template >Components</template> -->
              <el-menu-item index="/statistic" class="sidebar_item">发送问卷</el-menu-item>
              <el-menu-item index="/statistic" class="sidebar_item">分析&下载</el-menu-item>
            <!-- </el-submenu> -->
          </el-menu>
        </el-aside>
  
        <!-- 内容栏 -->
        <el-main>
        <div class="main">
          
            <div>
                <div ref="pieChart" style="width: 400px; height: 400px;"></div>
                <div ref="barChart" style="width: 400px; height: 400px;"></div>
            </div>
            
        </div>
          
          <!-- <div class="center"><router-link to="/lcytest">Echarts_test</router-link></div> -->
        </el-main>


        <!-- <el-footer class="footer">Footer</el-footer> -->
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
      }
    },
    methods: {
      handleSelect(index, indexPath) {
        this.activeIndex = index;
      },
      initCharts() {
        // 初始化扇形图
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
