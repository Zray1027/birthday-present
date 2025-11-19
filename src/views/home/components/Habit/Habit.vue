<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h2 class="section-title">健康小习惯</h2>
      </div>

      <div class="content-section">
        <ul class="health-tips">
          <li v-for="(tip, index) in healthTips" :key="index">
            <span class="tip-icon">{{ tip.icon }}</span>
            <span class="tip-text">{{ tip.text }}</span>
          </li>
        </ul>
        <p class="encouragement">小小的坚持，会带来大大的改变</p>
      </div>
      <div class="decoration"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const healthTips = ref([
  { icon: '☀️', text: '晒15分钟太阳，补充维D' },
  { icon: '🧦', text: '秋冬穿袜子睡觉，改善体寒' },
  { icon: '🚶', text: '每天适当活动，不要久坐' },
  { icon: '😴', text: '午休不超过30分钟，避免影响夜间睡眠' },
])
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

.health-tips {
  text-align: left;
  margin-bottom: @spacing-md;
  padding-left: 0;

  li {
    display: flex;
    align-items: center;
    gap: @spacing-sm;
    margin-bottom: @spacing-sm;
    padding: 8px 0;
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInUp 0.6s ease forwards;

    &:nth-child(1) {
      animation-delay: 0.2s;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  .tip-icon {
    font-size: .8rem;
    flex-shrink: 0;
  }

  .tip-text {
    flex: 1;
    line-height: 1.6;
    font-size: 14px;
    color: @color-text-soft;
  }
}

.encouragement {
  text-align: center;
  color: @color-text-light;
  font-style: italic;
  margin-top: @spacing-sm;
  padding-top: @spacing-sm;
  font-size: 15px;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 0.5s;
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
</style>