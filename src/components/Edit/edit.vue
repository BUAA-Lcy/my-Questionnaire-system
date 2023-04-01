<template>
    <el-container style="height: 100%; " direction="vertical">
      <el-header height="50px">
        <div class="header">
          S0UL
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <el-container>
            <el-aside>
              <template v-for="(item, index) in type" :key="index">
                  <buttonglass :type="item"></buttonglass>
              </template>
            </el-aside>
            <el-main>
              main
            </el-main>
            <el-aside>
              right
            </el-aside>
          </el-container>
        </div>
      </el-main>
    </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue"
import buttonglass from './components/buttonglass.vue'
import Buttonglass from "./components/buttonglass.vue";
const type=ref(['text', 'select', 'pulldown', 'date', 'number', 'grade', 'picture'])
</script>

<style scoped>
  @import "edit.css";
</style>