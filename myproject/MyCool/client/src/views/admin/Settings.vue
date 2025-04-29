<template>
  <div class="settings">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本设置" name="basic">
        <el-form :model="basicSettings" label-width="120px">
          <el-form-item label="网站名称">
            <el-input v-model="basicSettings.siteName" />
          </el-form-item>
          <el-form-item label="网站描述">
            <el-input
              v-model="basicSettings.siteDescription"
              type="textarea"
              :rows="3"
            />
          </el-form-item>
          <el-form-item label="网站Logo">
            <el-upload
              class="avatar-uploader"
              action="/api/upload"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
            >
              <img v-if="basicSettings.logo" :src="basicSettings.logo" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="备案信息">
            <el-input v-model="basicSettings.icp" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="内容设置" name="content">
        <el-form :model="contentSettings" label-width="120px">
          <el-form-item label="文章审核">
            <el-switch v-model="contentSettings.articleReview" />
          </el-form-item>
          <el-form-item label="评论审核">
            <el-switch v-model="contentSettings.commentReview" />
          </el-form-item>
          <el-form-item label="敏感词过滤">
            <el-switch v-model="contentSettings.sensitiveWordFilter" />
          </el-form-item>
          <el-form-item label="敏感词列表">
            <el-input
              v-model="contentSettings.sensitiveWords"
              type="textarea"
              :rows="5"
              placeholder="每行一个敏感词"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="安全设置" name="security">
        <el-form :model="securitySettings" label-width="120px">
          <el-form-item label="登录失败限制">
            <el-input-number
              v-model="securitySettings.loginAttempts"
              :min="3"
              :max="10"
            />
          </el-form-item>
          <el-form-item label="封禁时间(分钟)">
            <el-input-number
              v-model="securitySettings.banDuration"
              :min="5"
              :max="1440"
            />
          </el-form-item>
          <el-form-item label="密码最小长度">
            <el-input-number
              v-model="securitySettings.minPasswordLength"
              :min="6"
              :max="20"
            />
          </el-form-item>
          <el-form-item label="密码复杂度">
            <el-checkbox-group v-model="securitySettings.passwordRules">
              <el-checkbox label="uppercase">必须包含大写字母</el-checkbox>
              <el-checkbox label="lowercase">必须包含小写字母</el-checkbox>
              <el-checkbox label="number">必须包含数字</el-checkbox>
              <el-checkbox label="special">必须包含特殊字符</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="邮件设置" name="email">
        <el-form :model="emailSettings" label-width="120px">
          <el-form-item label="SMTP服务器">
            <el-input v-model="emailSettings.smtpServer" />
          </el-form-item>
          <el-form-item label="SMTP端口">
            <el-input v-model="emailSettings.smtpPort" />
          </el-form-item>
          <el-form-item label="发件人邮箱">
            <el-input v-model="emailSettings.senderEmail" />
          </el-form-item>
          <el-form-item label="发件人名称">
            <el-input v-model="emailSettings.senderName" />
          </el-form-item>
          <el-form-item label="邮箱密码">
            <el-input
              v-model="emailSettings.emailPassword"
              type="password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="testEmail">测试邮件发送</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="settings-footer">
      <el-button type="primary" @click="saveSettings">保存设置</el-button>
      <el-button @click="resetSettings">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const activeTab = ref('basic')

// 基本设置
const basicSettings = reactive({
  siteName: '我的博客',
  siteDescription: '一个分享技术、生活的个人博客',
  logo: '',
  icp: '京ICP备12345678号'
})

// 内容设置
const contentSettings = reactive({
  articleReview: true,
  commentReview: true,
  sensitiveWordFilter: true,
  sensitiveWords: '敏感词1\n敏感词2\n敏感词3'
})

// 安全设置
const securitySettings = reactive({
  loginAttempts: 5,
  banDuration: 30,
  minPasswordLength: 8,
  passwordRules: ['uppercase', 'lowercase', 'number']
})

// 邮件设置
const emailSettings = reactive({
  smtpServer: 'smtp.example.com',
  smtpPort: '465',
  senderEmail: 'noreply@example.com',
  senderName: '系统邮件',
  emailPassword: ''
})

// 处理Logo上传
const handleLogoSuccess = (response: any) => {
  basicSettings.logo = response.url
  ElMessage.success('Logo上传成功')
}

// 测试邮件发送
const testEmail = () => {
  ElMessage.success('测试邮件发送成功')
}

// 保存设置
const saveSettings = () => {
  // 实现保存逻辑
  ElMessage.success('设置保存成功')
}

// 重置设置
const resetSettings = () => {
  // 实现重置逻辑
  ElMessage.success('设置已重置')
}
</script>

<style lang="less" scoped>
.settings {
  .avatar-uploader {
    :deep(.el-upload) {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .settings-footer {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #dcdfe6;
    text-align: center;
  }
}
</style> 