<template>
  <div class="like-page">
    <div style="height: 1px;"></div>
    <div class="info-card">
      <div class="title">我们的故事</div>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number"><span>第</span> {{ daysTogether }} <span>天</span></span>
          <span class="stat-description">我们相识的时间</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number"><span>第</span> {{ birthdayCount }} <span>个</span></span>
          <span class="stat-description">陪伴你度过的生日</span>
        </div>
      </div>
    </div>

    <div class="section-title">我对你的了解</div>

    <div class="knowledge-grid">
      <div v-for="(item, index) in knowledges" :key="index" class="knowledge-card"
        :class="{ 'with-image': item.image }">
        <div v-if="item.image" class="card-image">
          <img :style="item.customStyle" :src="item.image" :alt="item.title" />
        </div>

        <div v-else class="card-emoji">
          {{ item.emoji }}
        </div>

        <div class="card-content">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-text">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { knowledges } from './constants'
import { getDaysSinceDate, getBirthdayCountSinceMeeting } from '@/utils/utils'

const meetingDate = '2025-09-20'
const birthday = '11-22'

const daysTogether = computed(() => {
  return getDaysSinceDate(meetingDate)
})

const birthdayCount = computed(() => {
  return getBirthdayCountSinceMeeting(meetingDate, birthday)
})

onMounted(() => {
  const cards = document.querySelectorAll('.knowledge-card')
  cards.forEach((card: Element, index: number) => {
    setTimeout(() => {
      const htmlCard = card as HTMLElement
      htmlCard.style.opacity = '1'
      htmlCard.style.transform = 'translateY(0)'
    }, 100 * index)
  })
})
</script>

<style lang="less" scoped>
.like-page {
  min-height: 100vh;
}

.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 20px;
  box-sizing: border-box;
  width: 340px;
  margin: 9px auto 10px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1);
  }

  .title {
    font-size: 26px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 20px;
  }

  .stats {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .stat-number {
        font-size: 28px;
        font-weight: bold;
        color: @color-accent-secondary;
        line-height: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;

        >span {
          font-size: 20px;
          color: #7f8c8d;
          margin: 0 3px;
        }
      }

      .stat-description {
        font-size: 14px;
        color: #95a5a6;
        margin-top: 5px;
        text-align: center;
        white-space: nowrap;
      }
    }

    .stat-divider {
      width: 2px;
      height: 60px;
      background: #ecf0f1;
      margin: 0 0.5rem;
    }
  }
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: @spacing-lg;
  padding: @spacing-md;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: @spacing-md;
  backdrop-filter: blur(20px);
  border: 1px solid fade(@color-accent-lavender, 30%);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px fade(@color-accent-deep, 15%);
  }

  &.with-image {
    .card-image {
      width: 278px;
      height: 278px;
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    &:hover .card-image img {
      transform: scale(1.05);
    }
  }

  .card-emoji {
    font-size: 22px;
    text-align: center;
    margin-bottom: @spacing-sm;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;

  .card-title {
    font-size: 20px;
    color: @color-text-soft;
    margin-bottom: @spacing-xs;
    font-weight: 600;
    text-align: center;
  }

  .card-text {
    font-size: 16px;
    color: @color-text-light;
    line-height: 1.6;
    text-align: center;
    flex: 1;
  }
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin: 15px 0;
  padding: 10px;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: @color-accent-secondary;
    border-radius: 3px;
  }
}
</style>