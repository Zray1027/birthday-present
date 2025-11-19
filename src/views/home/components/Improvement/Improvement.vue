<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <h2 class="section-title">睡眠改善计划</h2>
      </div>

      <div class="content-section">
        <div class="care-plan">
          <div class="plan-item" v-for="(item, index) in sleepTips" :key="index">
            <div class="plan-icon">{{ item.icon }}</div>
            <div class="plan-content">
              <div class="plan-title">{{ item.title }}</div>
              <div class="plan-desc">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="decoration"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sleepTips = ref([
  {
    icon: '🛁',
    title: '温水泡脚',
    description: '睡前15分钟，40°C温水，帮助放松'
  },
  {
    icon: '🌀',
    title: '空气流通',
    description: '睡前开窗通风10分钟，保持空气清新'
  },
  {
    icon: '🍶',
    title: '一杯温水',
    description: '睡前半小时饮用，避免起夜和身体缺水'
  },
  {
    icon: '🌡️',
    title: '环境调节',
    description: '保持卧室温度适宜，适当通风'
  },
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

.care-plan {
  display: flex;
  flex-direction: column;
  gap: @spacing-md;
  margin-bottom: @spacing-lg;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
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

  .plan-icon {
    font-size: .8rem;
    flex-shrink: 0;
  }

  .plan-content {
    flex: 1;
    text-align: left;
  }

  .plan-title {
    font-weight: 500;
    margin-bottom: 4px;
    color: @color-text-soft;
    font-size: 15px;
  }

  .plan-desc {
    font-size: 14px;
    color: @color-text-light;
    line-height: 1.6;
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
</style>