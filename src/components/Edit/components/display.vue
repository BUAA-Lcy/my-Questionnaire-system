<template>
  <div class="page">
    <button @click="test">响应式测试</button>
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
function getProject_use(){//从数据库中拿到当前的问卷，有响应式，库中状态改变会同步更新
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {//通过深度监听使得questions能够相应的更新
  Questions.value = toRaw(newVal)
}, { deep: true })
function test(){
}
</script>

<style scoped>
.page{
  width: 95%;
  height: 100%;
  background: rgba(251,251,251,.1);
  backdrop-filter: blur(10px);

}
</style>