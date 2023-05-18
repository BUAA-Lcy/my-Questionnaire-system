<template>
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

<style src="../css/overview.css"></style>