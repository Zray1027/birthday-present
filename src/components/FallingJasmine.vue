<template>
  <div class="jasmine-fall">
    <div v-for="i in count" :key="i" class="jasmine" :style="getJasmineStyle(i)">
      🌸
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number
}

defineProps<Props>()

const getJasmineStyle = (_index: number) => {
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const size = Math.random() * 8 + 14
  const opacity = Math.random() * 0.3 + 0.4
  const swing = Math.random() * 80 - 40
  const rotationDirection = Math.random() > 0.5 ? 1 : -1
  const duration = Math.random() * 5 + 7
  const scaleVariation = Math.random() * 0.2 + 0.9
  const initialScale = Math.random() * 0.4 + 0.8
  const shadowOpacity = Math.random() * 0.2

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    fontSize: `${size}px`,
    opacity: opacity,
    '--swing': `${swing}px`,
    '--rotation-direction': rotationDirection,
    '--duration': `${duration}s`,
    '--scale-variation': scaleVariation,
    '--initial-scale': initialScale,
    '--shadow-opacity': shadowOpacity
  }
}
</script>

<style lang="less" scoped>
.jasmine-fall {
  position: fixed;
  top: -100px;
  left: 0;
  width: 100%;
  height: calc(100vh + 200px);
  pointer-events: none;
  z-index: 10;
  overflow: visible;
}

.jasmine {
  position: absolute;
  color: @color-accent-deep;
  animation: fall var(--duration, 8s) linear infinite;
  will-change: transform;
  text-shadow: 0 0 2px rgba(0, 0, 0, var(--shadow-opacity, 0.1));
  transform-origin: center;
}

@keyframes fall {
  0% {
    transform: translateY(-50px) translateX(0) rotate(0deg);
    opacity: 0;
  }

  1% {
    opacity: var(--opacity, 0.7);
  }

  50% {
    transform: translateY(calc(100vh * 0.5)) translateX(calc(var(--swing, 40px) * sin(180deg))) rotate(calc(var(--rotation-direction, 1) * 180deg));
  }

  99% {
    opacity: var(--opacity, 0.7);
  }

  100% {
    transform: translateY(100vh) translateX(0) rotate(calc(var(--rotation-direction, 1) * 360deg));
    opacity: 0;
  }
}
</style>