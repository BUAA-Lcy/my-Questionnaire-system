<template>
    <div class="center">
      <!-- 问卷标题区域 -->
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
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
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
  };
  </script>
  
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
.questionnaire-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
}
.questionlist {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80%;
}
.question-item {
  margin-bottom: 20px;
}
.question-title {
  font-weight: bold;
  margin-bottom: 40px;
  width: 400px;
  text-align: left;
}
/* 自定义样式 */
.el-radio-group, .el-checkbox-group {
  width: 100%; /* 让选择题的选项占据一行 */
}
.el-radio, .el-checkbox {
  display: block; /* 让选择题的选项占据一行 */
  margin-bottom: 10px; /* 添加间距 */
}
.el-input {
  width: 100%; /* 让填空题的输入框宽度为100% */
  font-size: 16px; /* 修改字体大小 */
}
</style>