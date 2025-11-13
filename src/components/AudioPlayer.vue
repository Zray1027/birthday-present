<template>
  <div class="audio-player">
    <div class="player-controls">
      <button class="play-button" @click="togglePlay" aria-label="播放/暂停">
        <span v-if="!isPlaying" class="play-icon">▶</span>
        <span v-else class="pause-icon">❚❚</span>
      </button>
      <div class="progress-container" @click="seek">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
        <div class="progress-handle" :style="{ left: progress + '%' }"></div>
      </div>
      <div class="time-display">{{ currentTimeFormatted }}</div>
    </div>
    <audio 
      ref="audioRef" 
      :src="src" 
      @timeupdate="updateProgress" 
      @ended="handleEnded"
      loop
      class="hidden-audio"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  src: string
  autoPlay?: boolean
  volume?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: false,
  volume: 0.5
})

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'ended'): void
  (e: 'timeupdate', time: number): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const progress = ref(0)
const volume = ref(props.volume)
const currentTime = ref(0)
const duration = ref(0)

const currentTimeFormatted = ref('0:00')

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    emit('pause')
  } else {
    audioRef.value.play()
      .then(() => emit('play'))
      .catch(err => console.error('播放失败:', err))
  }
  isPlaying.value = !isPlaying.value
}

const updateProgress = () => {
  if (!audioRef.value) return
  
  currentTime.value = audioRef.value.currentTime
  duration.value = audioRef.value.duration || 0
  progress.value = (currentTime.value / duration.value) * 100
  currentTimeFormatted.value = formatTime(currentTime.value)
  emit('timeupdate', currentTime.value)
}

const seek = (event: MouseEvent) => {
  if (!audioRef.value || !duration.value) return
  
  const progressElement = event.currentTarget as HTMLElement
  const rect = progressElement.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width
  const newTime = percentage * duration.value
  
  audioRef.value.currentTime = newTime
  updateProgress()
}

const handleEnded = () => {
  isPlaying.value = false
  emit('ended')
}

watch(() => props.src, () => {
  if (audioRef.value) {
    isPlaying.value = false
    progress.value = 0
    currentTime.value = 0
    duration.value = 0
    currentTimeFormatted.value = '0:00'
  }
})

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.volume = volume.value
    if (props.autoPlay) {
      audioRef.value.play()
        .then(() => {
          isPlaying.value = true
          emit('play')
        })
        .catch(err => console.error('自动播放失败:', err))
    }
  }
})

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value = null
  }
})
</script>

<style lang="less" scoped>
.audio-player {
  display: flex;
  flex-direction: column;
  gap: @spacing-sm;
  padding: @spacing-sm;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: @ios-corner-radius-md;
  box-shadow: @ios-shadow-sm;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.player-controls {
  display: flex;
  align-items: center;
  gap: @spacing-sm;
  width: 100%;
}

.play-button {
  background-color: @color-accent-primary;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(156, 122, 242, 0.3);

  &:hover {
    background-color: @color-accent-deep;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  .play-icon, .pause-icon {
    font-size: 16px;
    line-height: 1;
  }

  .play-icon {
    margin-left: 2px;
  }
}

.progress-container {
  flex: 1;
  height: 6px;
  background-color: @color-secondary;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: @color-accent-primary;
  border-radius: 3px;
  transition: width 0.1s ease;
}

.progress-handle {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: white;
  border: 2px solid @color-accent-primary;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.1s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.time-display {
  font-size: 0.6rem;
  color: @color-text-light;
  min-width: 40px;
  text-align: right;
  font-family: monospace;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: @spacing-xs;
  padding-top: @spacing-xs;
}

.volume-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: @color-text-soft;
  padding: @spacing-xs;
  transition: color 0.2s ease;

  &:hover {
    color: @color-accent-primary;
  }
}

.volume-slider {
  width: 100px;
  height: 4px;
  background-color: @color-secondary;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background-color: white;
    border: 2px solid @color-accent-primary;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background-color: white;
    border: 2px solid @color-accent-primary;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.hidden-audio {
  display: none;
}

// 动画效果
.audio-player {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
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
  .audio-player {
    padding: @spacing-sm;
  }

  .play-button {
    width: 36px;
    height: 36px;
  }

  .volume-slider {
    width: 80px;
  }

  .time-display {
    font-size: 0.75rem;
    min-width: 35px;
  }
}
</style>