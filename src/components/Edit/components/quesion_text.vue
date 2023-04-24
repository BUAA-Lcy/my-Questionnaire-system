<template>
  <div class="container">
    <div class="title">文本框</div>
    <div class="description" ></div>
    <div class="el-input_container"><el-input></el-input></div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.container{
  width: 100%;
  height: 90px;
  background: rgba(255,255,255,0);
  border: 1px #7e7e7f solid;
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