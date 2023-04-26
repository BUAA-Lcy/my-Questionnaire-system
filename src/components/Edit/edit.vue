<template>
    <el-container style="height: 100%; " direction="vertical">
      <el-header height="50px">
        <div class="header">
          S0UL
        </div>
      </el-header>
      <el-main>
        <div class="main" :style="{ backgroundImage: background_Url !='' ? 'url(' + background_Url+ ')' : ''}">
          <el-container style="height: 100%">
            <el-aside>
              <template v-for="(item, index) in type" :key="index">
                  <buttonglass :type="item"></buttonglass>
              </template>
            </el-aside>
            <el-main>
              <display></display>
            </el-main>
            <el-aside>
              <div class="co-container">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item title="设置/外观" name="1">
                    <el-divider></el-divider>
                    <div class="outlook_form_container">
                        <el-form ref="form_container" :model="form" label-width="100px" class="outlook-form" label-suffix="">
                          <el-form-item label="插入题号">
                            <el-checkbox v-model="form.number"></el-checkbox>
                          </el-form-item>
                          <el-form-item label="表头背景图">
                            <el-button type="primary"><el-icon size="15px" style="margin-right: 5px;"><Picture/></el-icon>上传背景图</el-button>
                          </el-form-item>
                          <el-form-item label="页面背景图">
                            <el-button type="primary" @click="handleClickUpload">
                              <input
                                ref="fileInput"
                                type="file"
                                style="display: none;"
                                accept="image/*"
                                @change="handleBackgroundChange"
                              />
                              <el-icon size="15px" style="margin-right: 5px;"><Picture/></el-icon>上传背景图</el-button>
                          </el-form-item>
                          <el-form-item label="纯色方案">
                            <div class="block">
                              <el-color-picker v-model="color2"></el-color-picker>
                            </div>
                          </el-form-item>
                        </el-form>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="tobecompleted" name="2">
                    <form_text v-if="current_Question_id != -1"></form_text>
                    <button @click="test">test</button>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-aside>
          </el-container>
        </div>
      </el-main>
    </el-container>
</template>

<script setup>
import {useStore} from "vuex";
import {onMounted, provide, reactive, ref, toRaw, watch} from "vue";
const store = useStore()
import {Picture} from "@element-plus/icons-vue";
import buttonglass from "./components/buttonglass.vue";
import display from "./components/display.vue";
import Display from "./components/display.vue";
import form_text from "./components/form_text.vue"
import Form_text from "./components/form_text.vue";
const type=ref(['text', 'select', 'pulldown', 'date', 'number', 'grade', 'picture', 'file'])
const current_Question_id = ref(store.state.Project.currentQuestion)
const background_Url = ref(toRaw(getProject_use().background_URL))
function getProject_edit(){
  return JSON.parse(JSON.stringify(store.getters.get_currentProject))
}
function getProject_use(){
  return store.getters.get_currentProject
}
watch(() => store.state.Project.currentQuestion, (newVal, oldVal) => {
  current_Question_id.value = toRaw(newVal)
})
watch(()=>getProject_use().background_URL, (newVal, oldVal)=>{
  background_Url.value = toRaw(newVal)
})
const form_container = ref()
const form=reactive( {
  number: false,
})
function handleChange(val) {
  console.log(val);
}
const fileInput = ref()
function handleClickUpload (){
  fileInput.value = document.querySelector('input[type=file]')
  fileInput.value.click()
}
function handleBackgroundChange (event){
  const file = event.target.files[0]
  if (!file) {
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    // 将文件内容转化为 Base64 编码的字符串，并赋值给 state 中的 imageUrl
    background_Url.value = e.target.result
    const currentProjectEdit = getProject_edit()
    currentProjectEdit.background_URL = background_Url.value
    store.commit('updateCurrent',{project:currentProjectEdit, index:store.getters.get_currentIndex})
  }
  reader.readAsDataURL(file)
}
const activeNames = ref([])
function onsubmit(val){
  console.log(val)
}
function test(){
  console.log(background_Url.value)
}
</script>

<style scoped>
  @import "edit.css";
</style>
