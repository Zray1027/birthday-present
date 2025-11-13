<template>
  <div 
    class="scroll-indicator" 
    @click="handleScroll"
    :data-direction="showUp ? 'up' : 'down'"
  >
    {{ showUp ? '↑' : '↓' }}
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const props = defineProps({
  showUp: {
    type: Boolean,
    default: false
  },
  targetId: {
    type: String,
    default: ''
  }
})

const handleScroll = () => {
  if (props.targetId) {
    const targetElement = document.getElementById(props.targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  } else if (props.showUp) {
    const instance = getCurrentInstance()
    if (instance?.vnode.el) {
      const parentElement = instance.vnode.el.closest('section, div[role="section"]')
      if (parentElement) {
        parentElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  } else {
    const nextPosition = window.scrollY + window.innerHeight
    window.scrollTo({ top: nextPosition, behavior: 'smooth' })
  }
}
</script>

<style lang="less" scoped>
.scroll-indicator {
  position: fixed;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: @color-accent-primary;
  padding: @spacing-xs @spacing-sm;
  border-radius: @ios-corner-radius-md;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(@ios-blur-strength);
  box-shadow: @ios-shadow-sm;
  animation: bounce 2s infinite;
  cursor: pointer;
  z-index: 10;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    opacity: 0.8;
    transform: translateX(-50%) scale(0.95);
  }
  
  &[data-direction="up"] {
    animation: bounce-up 2s infinite;
  }
  
  // 悬停效果
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
}

@keyframes bounce {
  0%, 100% { 
    transform: translateX(-50%) translateY(0); 
  }
  50% { 
    transform: translateX(-50%) translateY(-8px); 
  }
}

@keyframes bounce-up {
  0%, 100% { 
    transform: translateX(-50%) translateY(0); 
  }
  50% { 
    transform: translateX(-50%) translateY(8px); 
  }
}

@keyframes bounce-up {
  0%, 100% { 
    transform: translateX(-50%) translateY(0); 
  }
  50% { 
    transform: translateX(-50%) translateY(8px); 
  }
}
</style>