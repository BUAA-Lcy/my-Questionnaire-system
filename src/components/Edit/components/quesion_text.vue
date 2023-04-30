<template>
  <div :class="{ 'container': Question.mutex === false, 'container_mutex': Question.mutex}" ref="question_container" @click="select">
    <div class="title"><span v-if="Question.must">*</span><span style="font-weight: bold">{{props.index+1}}. </span>{{Question.name}}</div>
    <span class="description" v-if="Question.description != ''">{{Question.description}}</span>
    <div class="el-input_container" v-if="Question.mutex === false"><el-input/></div>
    <div class="el-input_container" v-if="Question.mutex">
      <el-input type="textarea" :rows="4" resize="none"></el-input>
    </div>
  </div>
</template>

<script setup>
import {useStore} from "vuex";
import {onMounted, provide, reactive, ref, toRaw, watch} from "vue";
const store = useStore()
const props = defineProps({
  index: Number
})
const Questions = ref(toRaw(getProject_use().questions))
const Question = reactive({
  type: Questions.value[props.index].type,
  description: Questions.value[props.index].description,
  name: Questions.value[props.index].name,
  mutex: Questions.value[props.index].mutex,
  must: Questions.value[props.index].must,
})
function getProject_use(){
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {
  Questions.value = toRaw(newVal)
  Question.name = Questions.value[props.index].name
  Question.description = Questions.value[props.index].description
  Question.mutex = Questions.value[props.index].mutex
  Question.must = Questions.value[props.index].must
}, { deep: true })
watch(() => store.state.Project.currentQuestion, (newVal, oldVal) => {
  if(oldVal === props.index && newVal != props.index){
    question_container.value.classList.remove('container_select')
  }
})
const question_container = ref()
function select(){
  if(store.state.Project.currentQuestion != props.index) {
    question_container.value.classList.add('container_select')
    store.commit('updateQuestion', props.index)
  }
  else{
    question_container.value.classList.remove('container_select')
    store.commit('updateQuestion', -1)
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 90px;
  background: rgba(255,255,255,0);
  border: 1px #7e7e7f solid;
}
.container_mutex{
  width: 100%;
  height: 150px;
  background: rgba(255,255,255,0);
  border: 1px #7e7e7f solid;
}
.container_select{
  background: rgba(255,255,255,0.3);
  border: 1px #ffffff solid;
}
.title{
  margin-top: 5px;
  margin-left: 15px;
  color: white;
  font-size: 15px;
}
.description{
  margin-left: 40px;
  color: #ffffff;
  font-family: "等线 Light";
  font-size: 14px;

}
.el-input_container{
  margin-top: 5px;
  margin-left: 5%;
}
::v-deep.el-input{
  margin: auto auto;
  width: 90%;
}
::v-deep.el-textarea{
  margin: auto auto;
  width: 90%;
}
</style>