<template>
  <div 
    class="carousel-container" 
    :class="{ 'ratio-9-16': aspectRatio === '9:16' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="carousel-wrapper" 
      :style="{
        transform: `translateX(-${displayIndex * 100}%)`,
        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
      }"
    >
      <div v-if="items.length > 0" class="carousel-slide">
        <div class="carousel-image-container" :style="getImageContainerStyle()">
          <img 
            :src="items[items.length - 1].image" 
            :alt="items[items.length - 1].title" 
            class="carousel-image"
            :style="getImageStyle(items[items.length - 1])"
          />
        </div>
        <div class="carousel-caption">
          <h3>{{ items[items.length - 1].title }}</h3>
          <p v-if="items[items.length - 1].subtitle">{{ items[items.length - 1].subtitle }}</p>
        </div>
      </div>
      
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="carousel-slide"
      >
        <div 
          class="carousel-image-container"
          :style="getImageContainerStyle()"
        >
          <img 
            :src="item.image" 
            :alt="item.title" 
            class="carousel-image"
            :style="getImageStyle(item)"
          />
        </div>
        <div class="carousel-caption">
          <h3>{{ item.title }}</h3>
          <p v-if="item.subtitle">{{ item.subtitle }}</p>
        </div>
      </div>
      
      <div v-if="items.length > 0" class="carousel-slide">
        <div class="carousel-image-container" :style="getImageContainerStyle()">
          <img 
            :src="items[0].image" 
            :alt="items[0].title" 
            class="carousel-image"
            :style="getImageStyle(items[0])"
          />
        </div>
        <div class="carousel-caption">
          <h3>{{ items[0].title }}</h3>
          <p v-if="items[0].subtitle">{{ items[0].subtitle }}</p>
        </div>
      </div>
    </div>
    
    <button class="carousel-nav prev" @click="prevSlide">&lt;</button>
    <button class="carousel-nav next" @click="nextSlide">&gt;</button>
    
    <div class="carousel-indicators">
      <button 
        v-for="(_, index) in items" 
        :key="index" 
        class="indicator" 
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

interface CarouselItem {
  image: string
  title: string
  subtitle?: string
  cropArea?: {
    x?: number
    y?: number
  }
}

const props = withDefaults(defineProps<{
  items: CarouselItem[]
  autoplay?: boolean
  interval?: number
  aspectRatio?: '16:9' | '4:3' | '9:16'
}>(), {
  autoplay: true,
  interval: 3000,
  aspectRatio: '16:9'
})

const getImageContainerStyle = () => {
  const style: any = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
  }
  
  return style
}

const getImageStyle = (item: CarouselItem) => {
  const style: any = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }
  
  if (item.cropArea) {
    const x = item.cropArea.x || 50
    const y = item.cropArea.y || 50
    style.objectPosition = `${x}% ${y}%`
  }
  
  return style
}

const currentIndex = ref(0)
const displayIndex = ref(1)
const isTransitioning = ref(false)
let timer: number | null = null

const nextSlide = () => {
  if (!props.items.length) return
  
  isTransitioning.value = true
  displayIndex.value++
  
  if (displayIndex.value === props.items.length + 1) {
    setTimeout(() => {
      isTransitioning.value = false
      displayIndex.value = 1
      currentIndex.value = 0
    }, 500)
  } else {
    currentIndex.value = displayIndex.value - 1
  }
}

const prevSlide = () => {
  if (!props.items.length) return
  
  isTransitioning.value = true
  displayIndex.value--
  
  if (displayIndex.value === 0) {
    setTimeout(() => {
      isTransitioning.value = false
      displayIndex.value = props.items.length
      currentIndex.value = props.items.length - 1
    }, 500)
  } else {
    currentIndex.value = displayIndex.value - 1
  }
}

const goToSlide = (index: number) => {
  if (!props.items.length) return
  
  isTransitioning.value = true
  currentIndex.value = index
  displayIndex.value = index + 1
}

const startAutoplay = () => {
  if (props.autoplay && props.items.length > 0) {
    timer = window.setInterval(nextSlide, props.interval)
  }
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleMouseEnter = () => {
  stopAutoplay()
}

const handleMouseLeave = () => {
  startAutoplay()
}

onMounted(() => {
  if (props.items.length > 0) {
    displayIndex.value = 1
    currentIndex.value = 0
  }
  if (props.autoplay) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style lang="less" scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: @ios-corner-radius-lg;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &.ratio-9-16 {
    width: 100%;
    aspect-ratio: 9/16;
    
    @media (max-width: 768px) {
      max-height: 80vh;
      width: auto;
      margin: 0 auto;
    }
  }
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.carousel-slide {
  flex: 0 0 100%;
  position: relative;
  height: 100%;
}

.carousel-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  padding: @spacing-lg;
  text-align: center;
}

.carousel-caption h3 {
  margin: 0 0 @spacing-xs 0;
  font-size: 24px;
  font-weight: 600;
}

.carousel-caption p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

.carousel-nav.prev {
  left: @spacing-sm;
}

.carousel-nav.next {
  right: @spacing-sm;
}

.carousel-indicators {
  position: absolute;
  bottom: @spacing-md;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: @spacing-xs;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
  &.active {
    background: white;
    transform: scale(1.2);
  }
}
</style>