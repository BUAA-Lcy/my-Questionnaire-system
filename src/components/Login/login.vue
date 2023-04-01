<template>
  <div class="body">
    <div class="shell">
      <div class="container a-container" ref="a_container">
        <form action="" class="form" ref="a_form">
          <h2 class="form_title title">创建账号</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">选择注册方式活电子邮箱注册</span>
          <input type="text" class="form_input" placeholder="Name">
          <input type="text" class="form_input" placeholder="Email">
          <input type="text" class="form_input" placeholder="Password">
          <button class="form_button button submit">SIGN UP</button>
        </form>
      </div>

      <div class="container b-container" ref="b_container">
        <form action="" class="form" ref="b_form">
          <h2 class="form_title title">登入账号</h2>
          <div class="form_icons">
            <i class="iconfont icon-QQ"></i>
            <i class="iconfont icon-weixin"></i>
            <i class="iconfont icon-bilibili-line"></i>
          </div>
          <span class="form_span">选择登录方式活电子邮箱登录</span>
          <input type="text" class="form_input" placeholder="Email">
          <input type="text" class="form_input" placeholder="Password">
          <a class="form_link">忘记密码？</a>
          <button class="form_button button submit">SIGN IN</button>
        </form>
      </div>

      <div class="switch" ref="switch_cnt">
        <div class="switch_circle" ref="switch_circle0"></div>
        <div class="switch_circle switch_circle-t" ref="switch_circle1"></div>
        <div class="switch_container" ref="switch_c1">
          <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
          <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN IN</button>
        </div>

        <div class="switch_container is-hidden" ref="switch_c2">
          <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
          <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
          <button class="switch_button button switch-btn" @click="changeForm">SIGN UP</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue"
onMounted(()=>{
  console.log('begin')
})
const switch_c2 = ref(null)
const switch_c1 = ref(null)
const switch_cnt = ref(null)
const a_container = ref(null)
const a_form = ref(null)
const b_container = ref(null)
const b_form = ref(null)
const switch_circle0 = ref(null)
const switch_circle1 = ref(null)
function changeForm(){
  console.log('fuction begin');
  switch_cnt.value.classList.add('is-gx');
  setTimeout(function () {
    switch_cnt.value.classList.remove('is-gx')
  }, 1500)
  switch_cnt.value.classList.toggle('is-txr')
  switch_circle0.value.classList.toggle('is-txr')
  switch_circle1.value.classList.toggle('is-txr')
  switch_c1.value.classList.toggle('is-hidden')
  switch_c2.value.classList.toggle('is-hidden')
  a_container.value.classList.toggle('is-txl')
  b_container.value.classList.toggle('is-txl')
  b_container.value.classList.toggle('is-z')


}
</script>

<style scoped>
  @import "login.css";
</style>