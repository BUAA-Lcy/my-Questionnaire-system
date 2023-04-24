<template>
  <div class="page">
    <button @click="test">响应式测试</button>
    <template v-for = "(question, item) in Questions" :key = item>
      <question></question>
    </template>
  </div>
</template>

<script setup>
import question from './quesion_text.vue'
import {useStore} from "vuex";
import {onMounted, ref, toRaw, watch} from "vue";
const store = useStore()
const Questions = ref(toRaw(getProject_use().questions))
function getProject_use(){
  return store.getters.get_currentProject
}
watch(() => getProject_use().questions, (newVal, oldVal) => {
  Questions.value = toRaw(newVal)
}, { deep: true })
function test(){
  console.log(getProject_use())
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