<template>
  <h1 class="title">Home</h1>
  <router-view>

    <div class="center">
      <button class="router_button" @click="$router.push('/result')">Result</button>
      <button class="router_button" @click="$router.push('/test')">test</button>
      <button class="router_button" @click="$router.push('/about')">about</button>
      <button class="router_button" @click="$router.push('/statistic')">statistic</button>
      <button class="router_button" @click="$router.push('/contact')">contact</button>
      <button class="router_button" @click="$router.push('/preview')">preview</button>
      <button class="router_button" @click="$router.push('/change_test')">change_test</button>
      <div class="center">
        <br>
        <div class="explananory">result页面为最终呈现的统计结果页面</div>
        <div class="explananory">preview页面为最终呈现的问卷预览页面</div>
        <div class="explananory">test页面为正在测试页面 目前正在测试result</div>
        <div class="explananory">已经解决preview跳转bug</div>
        <div class="explananory">change_test页面为原先测试更改变化的页面</div>
      </div>


      
     </div>

  </router-view>


</template>

<script setup>

</script>

<style scoped>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}
.router_button{
  width: 100px;
  background-color: #409EFF;
  color: white;
  border-radius: 10px;
  margin: 10px;
  /* 每个按钮独占一行 */
  display: block;
  height: 5vh; 
}
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 50px;
}
.explanatory{
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%; /*占据一行 */

}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%; /*占据一行 */
}
</style>
