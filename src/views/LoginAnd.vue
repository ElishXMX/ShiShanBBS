<template>
<div class="container">
<section class="user">
  <div class="user_options-container">
    <div class="user_options-text">
      <div class="user_options-unregistered">
        <h2 class="user_unregistered-title">没有账号?</h2>
        <p class="user_unregistered-text">注册进入狮山学坛</p>
        <button class="user_unregistered-signup" @click="showSignupForm">注册</button>
      </div>

      <div class="user_options-registered">
        <h2 class="user_registered-title">已有账号?</h2>
        <p class="user_registered-text">直接登录进入狮山学坛</p>
        <button class="user_registered-login" @click="showLoginForm">登录</button>
      </div>
    </div>
    
    <div class="user_options-forms" :class="{ 'bounceLeft': showSignup, 'bounceRight': !showSignup }">
      <div class="user_forms-login" :class="{ 'active': !showSignup }">
        <h2 class="forms_title">登录</h2>
        <form @submit.prevent="handleLogin">
          <fieldset class="forms_fieldset">
            <div class="forms_field">
              <input v-model="loginStudentID" type="string" placeholder="学号" class="forms_field-input" required autofocus />
            </div>
            <div class="forms_field">
              <input v-model="loginPassword" type="password" placeholder="密码" class="forms_field-input" required />
            </div>
          </fieldset>
          <div class="forms_buttons">
            <button type="button" class="forms_buttons-forgot" @click="forgotPassword">忘记密码?</button>
            <input type="submit" value="登录" class="forms_buttons-action">
          </div>
        </form>
      </div>
      <div class="user_forms-signup" :class="{ 'active': showSignup }">
        <h2 class="forms_title">注册</h2>
        <form @submit.prevent="handleSignup">
          <fieldset class="forms_fieldset">
            <div class="forms_field">
              <input v-model="signupName" type="text" placeholder="真实姓名" class="forms_field-input" required />
            </div>
            <div class="forms_field">
              <input v-model="signupStudentID" type="string" placeholder="学号" class="forms_field-input" required />
            </div>
            <div class="forms_field">
              <input v-model="signupPassword" type="password" placeholder="密码" class="forms_field-input" required />
            </div>
            <div class="forms_field">
              <input  type="password" placeholder="确认密码" class="forms_field-input" required />
            </div>
          </fieldset>
          <div class="forms_buttons">
            <input type="submit" value="注册" class="forms_buttons-action">
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const showSignup = ref(false);
const loginStudentID = ref('');
const loginPassword = ref('');
const signupName = ref('');
const signupStudentID = ref('');
const signupPassword = ref('');

const showSignupForm = () => {
  showSignup.value = true;
};

const showLoginForm = () => {
  showSignup.value = false;
};

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/login', null, {
        params: {
            account: loginStudentID.value,
            password: loginPassword.value
        }
    });
    console.log(response)
    if (response.data.code === 200) {
      // 存储token和用户信息到localStorage
      console.log(response.data.data.userId)
      localStorage.setItem('userID', response.data.data.userId);
      
      // 跳转到首页
      window.location.href = '/home';
    } else {
      // 显示错误信息
      alert(response.data.message || '登录失败');
    }
  } catch (error) {
    console.error('登录出错:', error);
    alert('登录失败，请检查网络或联系管理员');
  }
};


const handleSignup = async () => {
  // 注册逻辑
  try {
    const response = await axios.post('/api/register', null, {
        params: {
            account: signupStudentID.value,
            realName: signupName.value,
            password: signupPassword.value
        }
    });
    console.log(response)
    if (response.data.code === 200) {
      // // 存储token和用户信息到localStorage
      // localStorage.setItem('token', response.data.data);
      // localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
      
      // // 跳转到首页
      // window.location.href = '/home';
      alert(response.data.message || '注册成功,请登录');
    } else {
      // 显示错误信息
      alert(response.data.message || '注册失败');
    }
  } catch (error) {
    console.error('注册出错:', error);
    alert('注册失败，请检查网络或联系管理员');
  }
};

const forgotPassword = () => {
  // 忘记密码逻辑
  console.log('忘记密码');
};
</script>

<style scoped>
/**
 * * General variables
 * */
/**
 * * General configs
 * */
* {
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 90%;
  background: radial-gradient(
    125% 125% at -2% 101%,
    rgba(204, 255, 153, 1) 10.5%,
    rgba(217, 255, 179, 1) 16%,
    rgba(229, 255, 204, 1) 17.5%,
    rgba(242, 255, 229, 1) 25%,
    rgba(247, 255, 237, 1) 40%,
    rgba(237, 255, 242, 1) 65%,
    rgba(229, 255, 250, 1) 100%
  );
}
body {
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}
input[type=submit] {
  cursor: pointer;
}
input::-moz-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input:-ms-input-placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}
input::placeholder {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}
/**
 * * Bounce to the left side
 * */
@-webkit-keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}
/**
 * * Show Sign Up form
 * */
@-webkit-keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}
/**
 * * Page background
 * */
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: transparent;
  background-size: cover;
}
.user_options-container {
  position: relative;
  width: 80%;
}
.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

/**
 * * Registered and Unregistered user box and text
 * */
.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}
.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

/**
 * * Login and signup forms
 * */
.user_options-forms {
  height:500px;
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}
.user_options-forms .user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}
.user_options-forms .forms_title {
  margin-bottom: 45px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.1rem;
}
.user_options-forms .forms_field:not(:last-of-type) {
  margin-bottom: 20px;
}
.user_options-forms .forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: gray;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}
.user_options-forms .forms_field-input:focus {
  border-color: gray;
}
.user_options-forms .forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}
.user_options-forms .forms_buttons-forgot {
  font-family: "Montserrat", sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-forgot:hover {
  color: #b3b3b3;
}
.user_options-forms .forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}
.user_options-forms .forms_buttons-action:hover {
  background-color: #e14641;
}
.user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}
.user_options-forms .user_forms-signup {
  transform: translate3d(120px, 0, 0);
}
.user_options-forms .user_forms-signup .forms_buttons {
  justify-content: flex-end;
}
.user_options-forms .user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

/**
 * * Triggers
 * */
.user_options-forms.bounceLeft {
  -webkit-animation: bounceLeft 1s forwards;
          animation: bounceLeft 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-signup {
  -webkit-animation: showSignUp 1s forwards;
          animation: showSignUp 1s forwards;
}
.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}
.user_options-forms.bounceRight {
  -webkit-animation: bounceRight 1s forwards;
          animation: bounceRight 1s forwards;
}

/**
 * * Responsive 990px
 * */
@media screen and (max-width: 990px) {
  .user_options-forms {
    min-height: 350px;
  }
  .user_options-forms .forms_buttons {
    flex-direction: column;
  }
  .user_options-forms .user_forms-login .forms_buttons-action {
    margin-top: 30px;
  }
  .user_options-forms .user_forms-signup,
.user_options-forms .user_forms-login {
    top: 40px;
  }

  .user_options-registered,
.user_options-unregistered {
    padding: 50px 45px;
  }
}
</style>