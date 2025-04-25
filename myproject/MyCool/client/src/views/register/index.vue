<template>
  <div class="register-container">
    <div class="register-box" :class="{ 'slide-out': isTransitioning }">
      <h2 class="register-title">创建账号</h2>
      <form @submit.prevent="handleRegister" class="register-form">
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
          <label for="email">邮箱</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="请输入邮箱"
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
        <div class="form-group">
          <label for="confirmPassword">确认密码</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="请再次输入密码"
            required
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

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const isTransitioning = ref(false)

const handleTransition = () => {
  isTransitioning.value = true
  setTimeout(() => {
    router.push('/login')
  }, 300)
}

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  isLoading.value = true
  try {
    // TODO: Implement registration logic
    console.log('Register attempt:', {
      username: username.value,
      email: email.value,
      password: password.value
    })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // After successful registration, redirect to login page
    handleTransition()
  } catch (error) {
    console.error('Registration failed:', error)
    alert('注册失败，请重试')
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
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.register-box {
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
  color: #333;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

.register-button {
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

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
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
  color: #4facfe;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.login-link:hover {
  color: #00f2fe;
  text-decoration: underline;
}
</style> 