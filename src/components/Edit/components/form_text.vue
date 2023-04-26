<template>
  <div class="outlook_form_container">
    <el-divider></el-divider>
    <el-form ref="form_container" :model="form" label-width="100px" class="outlook-form" label-suffix="">
      <el-form-item label="切换组件类型">
        <el-select v-model="form.mutex" class="m-2" :placeholder="form.mutex" size="small">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="标题">
        <el-input v-model="form.name" :placeholder=curQuestion.name size="small" style="margin-right: 5px"/>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="描述">
        <el-input v-model="form.description" :placeholder=curQuestion.description size="small" style="margin-right: 5px"/>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="是否必填">
        <el-checkbox v-model="form.must"></el-checkbox>
      </el-form-item>
    </el-form>
    <button @click="test">test</button>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {onMounted, provide, reactive, ref, toRaw, watch} from "vue";
const store = useStore()
const Questions = ref(toRaw(getProject_use().questions))
const Questions_edit = ref(getProject_edit().questions)
const currentId = ref(store.state.Project.currentQuestion)
function getProject_edit(){
  return JSON.parse(JSON.stringify(store.getters.get_currentProject))
}
function getProject_use(){
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {
  Questions.value = toRaw(newVal)
  Questions_edit.value = getProject_edit().questions
}, { deep: true })
const curQuestion = reactive({
  name: Questions.value[store.state.Project.currentQuestion].name,
  description: Questions.value[store.state.Project.currentQuestion].description,
})
const form = reactive({
  mutex: '单行文本',
  name: '',
  description: '',
  must: false
})
watch(() => form.name,(newVal, oldVal) => {
  Questions_edit.value.splice()
})
const options = [
  {
    value: '单行文本',
    label: '单行文本',
  },
  {
    value: '多行文本',
    label: '多行文本',
  },
]
function test(){
  console.log(currentId.value)
}
</script>

<style scoped>
::v-deep .el-divider--horizontal{
  margin: 0;
}
.el-form-item{
  margin:10px 0 10px 0;
}
</style>