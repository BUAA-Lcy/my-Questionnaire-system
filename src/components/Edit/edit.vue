<template>
    <el-container style="height: 100%; " direction="vertical">
      <el-header height="50px">
        <div class="header">
          S0UL
        </div>
      </el-header>
      <el-main>
        <div class="main">
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
                            <el-button type="primary"><el-icon size="15px" style="margin-right: 5px;"><Picture/></el-icon>上传背景图</el-button>
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
watch(() => store.state.Project.currentQuestion, (newVal, oldVal) => {
  current_Question_id.value = toRaw(newVal)
})

const form_container = ref()
const form=reactive( {
  number: false,
})
function handleChange(val) {
  console.log(val);
}
const activeNames = ref([])
function onsubmit(val){
  console.log(val)
}
function test(){
  console.log(current_Question_id)
}
</script>

<style scoped>
  @import "edit.css";
</style>
