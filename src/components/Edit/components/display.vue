<template>
  <div class="page">
    <button @click="test">响应式测试</button>
    <div class="title" :style="{ backgroundImage: title_Url !='' ? 'url(' + title_Url+ ')' : ''}">
      {{title_Text}}
    </div>
    <template v-for = "(question, item) in Questions" :key = item>
      <question :index="item"></question>
    </template>
  </div>
</template>

<script setup>
import question from './quesion_text.vue'
import {useStore} from "vuex";
import {onMounted, provide, reactive, ref, toRaw, watch} from "vue";
const store = useStore()
const question_select = ref(null)
const Questions = ref(toRaw(getProject_use().questions))
const title_Url = ref(toRaw(getProject_use().title_URL))
const title_Text = ref(toRaw(getProject_use().name))
function getProject_use(){//从数据库中拿到当前的问卷，有响应式，库中状态改变会同步更新
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {//通过深度监听使得questions能够相应的更新
  Questions.value = toRaw(newVal)
}, { deep: true })
watch(()=>getProject_use().title_URL, (newVal, oldVal)=>{
  title_Url.value = toRaw(newVal)
})
watch(()=>getProject_use().name, (newVal, oldVal)=>{
  title_Text.value = toRaw(newVal)
})
function test(){
}
</script>

<style scoped>
.page{
  width: 80%;
  height: 100%;
  margin-left: 8%;
  background: rgba(251,251,251,.1);
  backdrop-filter: blur(10px);
}
.title{
  width: 100%;
  text-align: center;
  line-height: 200px;
  font-weight: bolder;
  letter-spacing: 2px;
  font-size: 35px;
  font-family: "Arial Black";
  height: 200px;
  background: #4B70E2;
  border-radius: 15px 15px 15px 15px;
  background-size: cover;
}
</style>