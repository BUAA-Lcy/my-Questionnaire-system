<template>
  <div>这里是project</div>
  <button @click="changeProject">changeProject</button>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useStore} from "vuex";

const store = useStore()
const currentProject = reactive({
  name: 'test1',
  background_URL: '',
  questions: [],
   id: 1, //这个后端给
})
onMounted(()=>{
  store.commit('addProject',currentProject)
  currentProject.id++
  store.commit('addProject',currentProject)
  store.commit('setCurrent',currentProject.id)
})
function changeProject(){
  console.log(store.state.Project.Projects)
  console.log(store.getters.get_currentProject)
  store.commit('setCurrent', 1)
  console.log(store.state.Project.Projects)
  console.log(store.getters.get_currentProject)
}
</script>

<style scoped>

</style>