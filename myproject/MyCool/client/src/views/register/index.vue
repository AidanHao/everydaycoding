<template>
  <div class="register-container">
    <div class="register-box" :class="{ 'slide-out': isTransitioning }">
      <h2 class="register-title">创建账号</h2>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="nickName">昵称</label>
          <input
            type="text"
            id="nickName"
            v-model="nickName"
            placeholder="请输入您的昵称"
            required
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>
        <div class="form-group">
          <label for="userName">账号</label>
          <input
            type="text"
            id="userName"
            v-model="userName"
            placeholder="请输入您的账号"
            required
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>
        <!-- <div class="form-group">
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="请输入您的邮箱"
            required
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div> -->
        <div class="form-group">
          <label for="passWord">密码</label>
          <input
            type="password"
            id="passWord"
            v-model="passWord"
            placeholder="请输入密码"
            required
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="请再次输入密码"
            required
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
        </div>
        <button type="submit" class="register-button" :disabled="isLoading">
          <span v-if="!isLoading">注册</span>
          <span v-else class="loading-spinner"></span>
        </button>
        <div class="register-options">
          <router-link to="/login" class="login-link" @click="handleTransition">
            已有账号？立即登录
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from '../../api'


const router = useRouter()
const nickName = ref('')
const userName = ref('')
const email = ref('')
const passWord = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const isTransitioning = ref(false)

const handleInputFocus = (event: Event) => {
  const input = event.target as HTMLInputElement
  input.parentElement?.classList.add('focused')
}

const handleInputBlur = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.value) {
    input.parentElement?.classList.remove('focused')
  }
}

const handleTransition = () => {
  isTransitioning.value = true
  setTimeout(() => {
    router.push('/login')
  }, 300)
}

const handleRegister = async () => {
  if (passWord.value !== confirmPassword.value) {
    ElMessage({
      message: '两次输入密码不一致，请重新输入',
      showClose: true,
      type: 'success',
      duration: 2000
    })
    return
  }
  
  isLoading.value = true
  try {
    console.log('Register attempt:', {
      nickName: nickName.value,
      userName: userName.value,
      passWord: passWord.value
    })
    
    const res = await axios.post('/register', {
      nickName: nickName.value,
      userName: userName.value,
      passWord: passWord.value 
    })

    if(res.data.code == "8000"){
      ElMessage({
        message: '注册成功',
        showClose: true,
        type: 'success',
        duration: 2000
      })
    }
    
    handleTransition()
  } catch (error) {
    console.error('Registration failed:', error)
    ElMessage({
      message: '注册失败，请重试',
      showClose: true,
      type: 'error',
      duration: 2000
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  transform: translateY(-20px);
  animation: fadeIn 0.5s ease-out;
  transition: transform 0.3s ease, opacity 0.3s ease;
  backdrop-filter: blur(10px);
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

.register-title {
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

label {
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

input {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

input:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.register-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.2rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  position: relative;
  min-height: 3.5rem;
  letter-spacing: 1px;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.register-button:disabled {
  opacity: 0.7;
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

.register-options {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.login-link:hover {
  color: #764ba2;
  background-color: rgba(102, 126, 234, 0.1);
  text-decoration: none;
}
</style> 