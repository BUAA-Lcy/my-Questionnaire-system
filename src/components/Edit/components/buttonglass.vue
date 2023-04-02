<template>
  <div class="container">
    <button>
      <el-icon class="icon" size="25px" v-if="props.type==='text'"><Document /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='select'"><ChatLineSquare /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='date'"><Clock /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='grade'"><Star /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='picture'"><Picture /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='pulldown'"><ArrowDown /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='number'"><Histogram /></el-icon>
      <el-icon class="icon" size="25px" v-if="props.type==='file'"><Folder /></el-icon>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      {{text}}
    </button>
  </div>
</template>
<script setup>
import {ref} from "vue";
import {ChatLineSquare, Clock, Star, Picture, ArrowDown, Histogram, Document, Folder} from "@element-plus/icons-vue";
const props = defineProps({
  type: String
})
const text=ref("")
if(props.type === 'text'){
  text.value='文本框'
}
if(props.type === 'select'){
  text.value='选择'
}
if(props.type === 'pulldown'){
  text.value='下拉'
}
if(props.type === 'date'){
  text.value='日期'
}
if(props.type === 'number'){
  text.value='数字'
}
if(props.type === 'grade'){
  text.value='评分'
}
if(props.type === 'picture'){
  text.value='图片'
}
if(props.type === 'file'){
  text.value='文件'
}
</script>

<style scoped>
 *{
   margin: 0;
   padding: 0;
 }
 .container{
   margin: 0;
   padding: 0;
   height: 90px;
   width: 90px;
   display: inline-flex;
   justify-content: center;
   align-items: center;
   background: rgba(255, 255, 255, 0)
 }
 button span
 {
   position: absolute;
   display: block;
   transition: 0.5s ease;
 }
 button span:nth-child(1)
 {
   top: 0;
   left: 0;
   width: 0;
   height: 1px;
   background: #fff;
 }
 button:hover span:nth-child(1)
 {
   width: 100%;
   transform: translateX(100%);
 }
 button span:nth-child(3)
 {
   bottom: 0;
   right: 0;
   width: 0;
   height: 1px;
   background: #fff;
 }
 button:hover span:nth-child(3)
 {
   width: 100%;
   transform: translateX(-100%);
 }
 button span:nth-child(2)
 {
   bottom: 0;
   right: 0;
   width: 1px;
   height: 0;
   background: #fff;
 }
 button:hover span:nth-child(2)
 {
   Height: 100%;
   transform: translateY(-100%);
 }
 button span:nth-child(4)
 {
   top: 0;
   left: 0;
   width: 1px;
   height: 0;
   background: #fff;
 }
 button:hover span:nth-child(4)
 {
   Height: 100%;
   transform: translateY(100%);
 }
 button:hover .icon{
  transform: translateY(-3px);
 }
 button
 {
   position: relative;
   height: 70px;
   width: 70px;
   line-height: 90px;
   text-align: center;
   text-decoration: none;
   color: #ffffff;
   border-color: #7e7e7f;
   border-width: 2px;
   text-transform: uppercase;
   font-family: "fantasy";
   font-weight: bold;
   overflow: hidden;
   border-radius: 20%;
   background: rgba(255,255,255,.1);
   backdrop-filter: blur(10px);
   /*box-shadow: 0 5px 5px rgb(126, 126, 127);*/
 }
 button:before
 {
   content: '';
   position: absolute;
   top: 0;
   left: 0;
   width: 50%;
   height: 100%;
   background: rgb(255, 255, 255, .1)
 }
 button:after
 {
   content:'';
   position: absolute;
   top: 0;
   left: -100%;
   width: 100%;
   height: 100%;
   background: linear-gradient(90deg,transparent,
   rgba(255,255,255,.4),transparent);
   transition: 0.5s;
 }
 button:hover:after
 {
   left:100%;
 }
 button .icon{
   position: absolute;
   top: 8px;
   left: 21px;
 }
</style>