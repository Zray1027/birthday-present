<template>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="title">图片画廊</div>
        <div class="subtitle">一些小惊喜，希望你会喜欢</div>
      </div>

      <div class="carousel-wrapper">
        <Carousel :items="carouselItems" :interval="4000" aspect-ratio="9:16" :autoplay="true" />
      </div>

      <div class="decoration"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Carousel from '../../components/Carousel.vue'

const carouselItems = ref([
  {
    image: new URL('../../assets/Futaba_Anzu.jpg', import.meta.url).href,
    title: '双叶杏',
    subtitle: '',
    cropArea: { x: 50, y: 50 } // 居中显示
  },
  {
    image: new URL('../../assets/Futaba_Anzu1.jpg', import.meta.url).href,
    title: '双叶杏',
    subtitle: '',
    cropArea: { x: 50, y: 40 } // 稍微偏上显示
  },
  {
    image: new URL('../../assets/Double_Flowered_Jasmine.jpg', import.meta.url).href,
    title: '重瓣茉莉',
    subtitle: '',
    cropArea: { x: 50, y: 60 } // 稍微偏下显示
  },
  {
    image: new URL('../../assets/Tonari_no_Totoro.jpg', import.meta.url).href,
    title: '龙猫',
    subtitle: '',
    cropArea: { x: 50, y: 50 } // 居中显示
  }
])
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
  min-height: 100vh;
  background-color: @color-primary-soft;
  padding: @spacing-md;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.card {
  width: 100%;
  max-width: @ios-medium;
  background-color: white;
  border-radius: @ios-corner-radius-xl;
  padding: @spacing-lg;
  box-shadow: @ios-shadow-lg;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  max-height: calc(100vh - @spacing-md * 2);
  overflow: hidden;
}

.header {
  text-align: center;
  margin-bottom: @spacing-lg;
  opacity: 0;
  transform: translateY(-20px);
  animation: fadeInDown 0.8s ease forwards;
}

.title {
  font-size: 40px;
  font-weight: 700;
  color: @color-accent-primary;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(156, 122, 242, 0.2);
}

.subtitle {
  font-size: 18px;
  color: @color-accent-secondary;
  text-align: center;
  margin-top: @spacing-md;
  margin-bottom: @spacing-lg;
  letter-spacing: 1px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-10px);
  animation: fadeInUp 1s ease forwards 0.5s;
  text-shadow: 0 1px 2px rgba(252, 165, 165, 0.2);
}

.carousel-wrapper {
  width: 100%;
  max-width: 400px;
  /* 限制轮播图最大宽度，保持9:16比例的美观性 */
  margin: 0 auto;
  opacity: 0;
  transform: scale(0.9);
  animation: fadeInScale 1s ease forwards 0.3s;
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

// 淡入下滑动画
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 淡入缩放动画
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

// 淡入上移动画
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 响应式设计
@media screen and (max-width: @ios-small) {
  .card {
    padding: @spacing-md;
    max-height: calc(100vh - @spacing-md);
  }

  .title {
    font-size: 32px;
  }

  .carousel-wrapper {
    height: 250px; // 小屏幕上调整轮播图高度
  }
}
</style>