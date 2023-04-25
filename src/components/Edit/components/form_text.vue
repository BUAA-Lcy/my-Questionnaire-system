<template>
  <div class="outlook_form_container">
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="100px" class="outlook-form" label-suffix="">
      <el-form-item label="切换组件类型">
        <el-select v-model="mutex_value" class="m-2" :placeholder="mutex_value" size="small">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="标题">
        <el-input v-model="input_value" :placeholder=input_value size="small" style="margin-right: 5px"/>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="描述">
        <el-input v-model="description_value" :placeholder=description_value size="small" style="margin-right: 5px"/>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="是否必填">
        <el-checkbox v-model="must_value"></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw, watch} from "vue";
const props = defineProps({

})
const form = reactive({
  mutex: '',
  input: '',
  description: '',
  must: false
})
const mutex_value = ref('单行文本')
watch(() => mutex_value.value, (newVal, oldVal) => {
  form.mutex = newVal
})
const input_value = ref('文本框')
watch(() => input_value.value, (newVal, oldVal) => {
  form.input = newVal
})
const description_value = ref('')
watch(() => description_value.value, (newVal, oldVal) => {
  form.description = newVal
})
const must_value = ref(false)
watch(() => must_value.value, (newVal, oldVal) => {
  form.must = newVal
})
const options = [
  {
    value: '单行文本',
    label: '单行文本',
  },
  {
    value: '多行文本',
    label: '多行文本',
  },
]
</script>

<style scoped>
::v-deep .el-divider--horizontal{
  margin: 0;
}
.el-form-item{
  margin:10px 0 10px 0;
}
</style>