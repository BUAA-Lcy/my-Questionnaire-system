<template>
            <el-form ref="form" :model="form" label-width="120px" class="questionlist">
              <!-- 遍历问卷中的问题 -->
              <div v-for="(question, index) in data.questions" :key="index" class="question-item">
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
  
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";
onMounted(()=>{
  
})
const form = ref({

});
const data = ref({
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
});



</script>

<style src="../css/question.css"></style>
