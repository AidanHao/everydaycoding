<template>
  <div class="login-container">
    <div class="login-box" :class="{ 'slide-out': isTransitioning }">
      <div class="login-header">
        <h2 class="login-title">欢迎回来</h2>
        <p class="login-subtitle">请登录您的账号</p>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="userName">账号</label>
          <div class="input-wrapper">
            <input
              type="text"
              id="userName"
              v-model="userName"
              placeholder="请输入用户名"
              required
              :class="{ 'input-error': errors.userName }"
              @focus="errors.userName = ''"
            />
          </div>
          <span class="error-message" v-if="errors.userName">{{ errors.userName }}</span>
        </div>
        <div class="form-group">
          <label for="passWord">密码</label>
          <div class="input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="passWord"
              v-model="passWord"
              placeholder="请输入密码"
              required
              :class="{ 'input-error': errors.passWord }"
              @focus="errors.passWord = ''"
            />
            <IconEye 
              class="icon-eye" 
              :class="{ 'active': showPassword }"
              @click="showPassword = !showPassword"
            />
          </div>
          <span class="error-message" v-if="errors.passWord">{{ errors.passWord }}</span>
        </div>
        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">记住我</label>
          </div>
          <a href="#" class="forgot-password">忘记密码？</a>
        </div>
        <button 
          type="submit" 
          class="login-button" 
          :disabled="isLoading"
          :class="{ 'loading': isLoading }"
        >
          <span class="button-content">
            <span v-if="!isLoading">登录</span>
            <span v-else class="loading-spinner"></span>
          </span>
          <span class="button-background"></span>
        </button>
        <div class="login-options">
          <span class="divider">或</span>
          <router-link to="/register" class="register-link" @click="handleTransition">
            还没有账号？立即注册
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '../../api'
import { ElMessage } from 'element-plus'
import IconEye from '@/components/icons/IconEye.vue'

const router = useRouter()
const userName = ref('')
const passWord = ref('')
const isLoading = ref(false)
const isTransitioning = ref(false)
const rememberMe = ref(false)
const showPassword = ref(false)

// 组件加载时检查localStorage中的用户信息
onMounted(() => {
  const userInfo = localStorage.getItem('userToken')
  if (userInfo) {
    const parsedUserInfo = JSON.parse(userInfo)
    if (parsedUserInfo.rememberMe) {
      userName.value = parsedUserInfo.userName || ''
      passWord.value = parsedUserInfo.passWord || ''
      rememberMe.value = true
    }
  }
})

const errors = reactive({
  userName: '',
  passWord: ''
})

const validateForm = () => {
  let isValid = true
  errors.userName = ''
  errors.passWord = ''

  if (!userName.value) {
    errors.userName = '请输入用户名'
    isValid = false
  }

  if (!passWord.value) {
    errors.passWord = '请输入密码'
    isValid = false
  } else if (passWord.value.length < 6) {
    errors.passWord = '密码长度不能少于6位'
    isValid = false
  }

  return isValid
}

const handleTransition = () => {
  isTransitioning.value = true
  setTimeout(() => {
    router.push('/register')
  }, 300)
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  try {
    const response = await axios.post('/login', {
      userName: userName.value,
      passWord: passWord.value
    })
    response.data.data.rememberMe = rememberMe.value
    // 保存用户信息
    let userInfo = {
      ...response?.data?.data,
      rememberMe: rememberMe.value,
    }
    if (rememberMe.value) {
      userInfo = {
        ...response?.data?.data,
        rememberMe: rememberMe.value,
        passWord: passWord.value,
        userName: userName.value,
      }
    } else {
      userInfo = {
        ...response?.data?.data,
        rememberMe: rememberMe.value,
        userName: userName.value,
      }
    }
    localStorage.setItem('userToken', JSON.stringify(userInfo))
    
    // ElMessage({
    //   message: '登录成功',
    //   type: 'success',
    //   duration: 2000
    // })
    
    router.push('/home')
  } catch (error: any) {
    console.log(error)
    // ElMessage({
    //   message: error.response?.data?.msg || '登录失败，请重试',
    //   type: 'error',
    //   duration: 3000
    // })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  animation: float 15s infinite linear;
}

@keyframes float {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  transform: translateY(-20px);
  animation: fadeIn 0.5s ease-out;
  transition: transform 0.3s ease, opacity 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 1rem;
}

.slide-out {
  transform: translateX(-100%);
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(-20px);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #4facfe;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

.input-wrapper input {
  padding: 0.8rem;
  border: none;
  background: transparent;
  width: 100%;
  font-size: 0.95rem;
  border-radius: 10px;
}

.input-wrapper input:focus {
  outline: none;
  box-shadow: none;
}

.input-wrapper .icon-eye {
  position: absolute;
  right: 1rem;
  cursor: pointer;
  color: #999;
  transition: all 0.3s ease;
}

.input-wrapper .icon-eye:hover,
.input-wrapper .icon-eye.active {
  color: #4facfe;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5rem;
}

.login-button {
  position: relative;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.2rem;
  min-height: 2.5rem;
  overflow: hidden;
  z-index: 1;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.button-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  z-index: 2;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
}

.login-button:hover:not(:disabled) .button-background {
  opacity: 1;
}

.login-button:hover:not(:disabled)::before {
  transform: translateX(0);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(79, 172, 254, 0.2);
}

.login-button.loading {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divider {
  position: relative;
  text-align: center;
  color: #999;
  margin: 1rem 0;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: #e0e0e0;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

label {
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

.login-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.forgot-password,
.register-link {
  color: #4facfe;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.forgot-password:hover,
.register-link:hover {
  color: #00f2fe;
  text-decoration: underline;
}

.input-error {
  border-color: #ff4d4f !important;
}

.error-message {
  color: #ff4d4f;
  font-size: 0.85rem;
  margin-top: 0.3rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
}

.remember-me input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.remember-me label {
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
}

.icon-eye {
  cursor: pointer;
}

.icon-eye:hover,
.icon-eye.active {
  color: #4facfe;
}

/* 修改响应式样式 */
@media screen and (max-width: 480px) {
  .login-box {
    padding: 1.2rem;
    margin: 0.5rem;
  }

  .login-title {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
  }

  .login-subtitle {
    font-size: 0.85rem;
  }

  .input-wrapper input {
    padding: 0.7rem;
    font-size: 0.9rem;
  }

  .login-button {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
}

@media screen and (min-width: 481px) and (max-width: 768px) {
  .login-box {
    max-width: 320px;
    padding: 1.5rem;
  }
}

@media screen and (min-width: 769px) {
  .login-box {
    max-width: 360px;
  }
}
</style> 