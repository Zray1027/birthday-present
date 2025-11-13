<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h2 class="section-title">来自元宝的祝福</h2>
      </div>

      <div class="content-section">
        <div class="yuanbao-section">
          <div class="yuanbao-icon">🐶</div>
          <div class="message-content">
            <h3>汪汪！生日快乐！</h3>
            <p class="main-message">
              希望你的新一岁，有更多让自己开心的时刻。<br>
              无论是看书、玩游戏，还是和元宝玩耍。
            </p>
            <p class="secret-message">
              "谢谢你总是那么认真地对待生活<br>
              也请记得好好对待自己"
            </p>
          </div>
        </div>
      </div>

      <div class="final-action" @click="showFinalMessage">
        <div class="action-icon">🎁</div>
        <div class="action-text">开启最后的祝福</div>
      </div>

      <div class="closing-note">
        <p>这个空间永远为你保留</p>
        <p class="note-sub">随时可以回来看看</p>
      </div>

      <div class="decoration"></div>
    </div>
  </div>

  <CustomAlert v-model:visible="showAlert" type="success" title="生日快乐！" icon="🎂" closeOnOverlayClick message="在这个特别的日子里，只想告诉你：
    你的善良和敏感让这个世界更美好，
    愿你的每一岁都奔走在自己的热爱里。" />
</template>

<script setup lang="ts">
import CustomAlert from '@/components/CustomAlert.vue'
import { ref } from 'vue'

const showAlert = ref(false)

const showFinalMessage = (): void => {
  showAlert.value = true
}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: @color-primary-soft;
  padding: @spacing-lg @spacing-md;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.card {
  width: 100%;
  max-width: @ios-medium;
  background-color: white;
  border-radius: @ios-corner-radius-xl;
  padding: @spacing-xl;
  box-shadow: @ios-shadow-lg;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}

.header {
  text-align: center;
  margin-bottom: @spacing-lg;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: @color-accent-primary;
  text-align: center;
  letter-spacing: 1.5px;
  margin: 0;
  text-shadow: 0 2px 4px rgba(156, 122, 242, 0.2);
}

.content-section {
  margin-bottom: @spacing-lg;
}

.yuanbao-section {
  text-align: center;
  margin-bottom: @spacing-lg;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease forwards 0.2s;

  .yuanbao-icon {
    font-size: 1.2rem;
    margin-bottom: @spacing-sm;
  }
}

.message-content {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease forwards 0.4s;
}

h3 {
  margin-bottom: @spacing-sm;
  color: @color-text-soft;
  font-weight: 500;
  font-size: 20px;
}

.main-message {
  line-height: 1.8;
  margin-bottom: @spacing-sm;
  font-size: 16px;
  color: @color-text-soft;
}

.secret-message {
  font-style: italic;
  color: @color-text-light;
  line-height: 1.6;
  padding-top: @spacing-sm;
  border-top: 1px solid fade(@color-accent-lavender, 30%);
  font-size: 15px;
}

.final-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: @spacing-sm;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease forwards 0.8s;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }

  .action-icon {
    font-size: 1.8rem;
  }

  .action-text {
    font-weight: 500;
    color: @color-text-soft;
    font-size: 16px;
  }
}

.closing-note {
  margin-top: @spacing-xl;
  text-align: center;
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.6s ease forwards 1s;

  p {
    margin-bottom: @spacing-xs;
    color: @color-text-soft;
    font-size: 16px;
  }

  .note-sub {
    font-size: 14px;
    color: @color-text-light;
    font-style: italic;
  }
}

.decoration {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, @color-accent-secondary 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.3;
  z-index: -1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media screen and (max-width: @ios-small) {
  .card {
    padding: @spacing-lg;
  }

  .section-title {
    font-size: 24px;
  }

  h3 {
    font-size: 18px;
  }

  .yuanbao-section .yuanbao-icon {
    font-size: 4rem;
  }

  .main-message {
    font-size: 15px;
  }

  .secret-message {
    font-size: 14px;
  }

  .final-action .action-icon {
    font-size: 2.2rem;
  }

  .final-action .action-text {
    font-size: 15px;
  }

  .closing-note p {
    font-size: 15px;
  }

  .closing-note .note-sub {
    font-size: 13px;
  }
}
</style>