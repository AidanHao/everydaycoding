<template>
  <div class="login-container">
    <div class="login-box" :class="{ 'slide-out': isTransitioning }">
      <h2 class="login-title">欢迎回来</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="请输入用户名"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="请输入密码"
            required
          />
        </div>
        <button type="submit" class="login-button" :disabled="isLoading">
          <span v-if="!isLoading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>
        <div class="login-options">
          <a href="#" class="forgot-password">忘记密码？</a>
          <router-link to="/register" class="register-link" @click="handleTransition">
            还没有账号？立即注册
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const isLoading = ref(false)
const isTransitioning = ref(false)

const handleTransition = () => {
  isTransitioning.value = true
  setTimeout(() => {
    router.push('/register')
  }, 300)
}

const handleLogin = async () => {
  isLoading.value = true
  try {
    // TODO: Implement login logic
    console.log('Login attempt:', username.value, password.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // After successful login, redirect to home page
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    alert('登录失败，请重试')
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
}

.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  transform: translateY(-20px);
  animation: fadeIn 0.5s ease-out;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-out {
  transform: translateX(100%);
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

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-form {
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
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

input {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

input:focus {
  outline: none;
  border-color: #4facfe;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

.login-button {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  min-height: 3rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
}

.login-button:disabled {
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
</style> 