<template>
  <div class="container" ref="question_container" @click="select">
    <div class="title"><span style="font-weight: bold">{{props.index+1}}. </span>{{Question.name}}</div>
    <div class="description" >{{Question.description}}</div>
    <div class="el-input_container"><el-input></el-input></div>
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
  name: Questions.value[props.index].name
})
function getProject_use(){
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {
  Questions.value = toRaw(newVal)
  Question.name = Questions.value[props.index].name
  Question.description = Questions.value[props.index].description
}, { deep: true })
watch(() => store.state.Project.currentQuestion, (newVal, oldVal) => {
  if(oldVal === props.index && newVal != props.index){
    question_container.value.classList.add('container')
    question_container.value.classList.remove('container_select')
  }
})
const question_container = ref()
function select(){
  if(store.state.Project.currentQuestion != props.index) {
    question_container.value.classList.remove('container')
    question_container.value.classList.add('container_select')
    store.commit('updateQuestion', props.index)
  }
  else{
    question_container.value.classList.add('container')
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
.container_select{
  width: 100%;
  height: 90px;
  background: rgba(255,255,255,0.3);
  border: 1px #ffffff solid;
}
.title{
  margin-top: 5px;
  margin-left: 3%;
  color: white;
}
.el-input_container{
  margin-top: 5px;
  margin-left: 5%;
}
.el-input{
  margin: auto auto;
  width: 90%;
}
</style>