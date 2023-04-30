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
const current_Question_id = ref(store.state.Project.currentQuestion)
function getProject_edit(){
  return JSON.parse(JSON.stringify(store.getters.get_currentProject))
}
function getProject_use(){
  return store.getters.get_currentProject
}
const curQuestion = reactive({
  name: Questions.value[current_Question_id.value].name,
  description: Questions.value[current_Question_id.value].description,
})
watch(() => store.state.Project.currentQuestion, (newVal, oldVal) => {
  current_Question_id.value = toRaw(newVal)
  if(newVal != -1){
    curQuestion.name = Questions.value[current_Question_id.value].name
    curQuestion.description = Questions.value[current_Question_id.value].description
    form.name = Questions.value[current_Question_id.value].name
    form.description = Questions.value[current_Question_id.value].description
    form.mutex = Questions.value[current_Question_id.value].mutex
    form.must = Questions.value[current_Question_id.value].must
  }
})
watch(() => getProject_use().questions, (newVal, oldVal) => {
  Questions.value = toRaw(newVal)
  Questions_edit.value = getProject_edit().questions
  curQuestion.name = Questions.value[current_Question_id.value].name
  curQuestion.description = Questions.value[current_Question_id.value].description
}, { deep: true })
const form = reactive({
  mutex: Questions.value[current_Question_id.value].mutex,
  name: Questions.value[current_Question_id.value].name,
  description: Questions.value[current_Question_id.value].description,
  must: Questions.value[current_Question_id.value].must,
})
watch(() => form,(newVal, oldVal) => {
    Questions_edit.value.splice(current_Question_id.value, 1, {
      type: toRaw(Questions.value[current_Question_id.value].type),
      description: toRaw(form.description),
      name: toRaw(form.name),
      mutex: toRaw(form.mutex),
      must: toRaw(form.must)
    })
    const currentProjectEdit = getProject_edit()
    currentProjectEdit.questions = Questions_edit.value
    store.commit('updateCurrent',{project:currentProjectEdit, index:store.getters.get_currentIndex})
    console.log(getProject_use().questions)
},{deep: true})
const options = [
  {
    value: false,
    label: '单行文本',
  },
  {
    value: true,
    label: '多行文本',
  },
]
function test(){
  console.log(Questions_edit.value)
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