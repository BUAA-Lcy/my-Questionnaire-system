<template>
  <div>这里是project</div>
  <button @click="changeProject">changeProject</button>
 
  <router-view>

    <div class="center">
      <button class="router_button" @click="$router.push('/result')">Result</button>
      <button class="router_button" @click="$router.push('/lcytest')">test</button>
      <button class="router_button" @click="$router.push('/about')">about</button>
      <button class="router_button" @click="$router.push('/statistic')">statistic</button>
      <button class="router_button" @click="$router.push('/contact')">contact</button>
      <button class="router_button" @click="$router.push('/contact')">contact</button>
      <button class="router_button" @click="$router.push('/preview')">preview</button>
      
     </div>

  </router-view>


</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useStore} from "vuex";

const store = useStore()
const currentProject = reactive({//这是项目的一个例子，因为完善编辑界面要用就先扔了一个，这些信息是一定不够的，只把在问卷编辑过程中可能用的添上了
  name: 'test1',//问卷的名字
  background_URL: '',//问卷背景图
  title_URL:'',//表头背景图
  questions: [],//问卷的问题列表（数组）
   id: 1, //问卷的Id,是前端与后端问卷唯一的识别标志，按照目前的想法这个Id由后端给
})
onMounted(()=>{//在界面加载之后自动构建项目，没错也是编辑要用
  store.commit('addProject',currentProject)
  currentProject.id++
  store.commit('addProject',currentProject)
  store.commit('setCurrent',currentProject.id)
})
function changeProject(){//改变项目的一个例子，不太能参考
  console.log(store.state.Project.Projects)
  console.log(store.getters.get_currentProject)
  store.commit('setCurrent', 1)
  console.log(store.state.Project.Projects)
  console.log(store.getters.get_currentProject)
}
</script>

<style scoped>
  .router_button{
    width: 100px;
    background-color: #409EFF;
    color: white;
    border-radius: 10px;
    margin: 40px;
    /* 每个按钮独占一行 */
    display: block;
    height: 5vh; 
  }
  .center{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  

</style>