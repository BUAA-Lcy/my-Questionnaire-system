<template>
  <h1 class="title">Home</h1>
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

</style>