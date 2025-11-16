<template>
  <Teleport to="body">
    <Transition name="alert">
      <div v-if="visible" class="alert-overlay" @click="handleOverlayClick">
        <div class="alert-container" :class="type" @click.stop>
          <div class="alert-header" v-if="icon || title">
            <div v-if="icon" class="alert-icon">{{ icon }}</div>
            <div v-if="title" class="alert-title">{{ title }}</div>
          </div>
          <div v-if="message" class="alert-message">{{ message }}</div>
          <div class="alert-actions">
            <button v-for="(button, index) in buttons" :key="index" class="alert-button"
              :class="{ 'primary-button': button.isPrimary }" @click="handleButtonClick(button, index)">
              {{ button.text }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Button {
  text: string
  onClick?: () => void
  isPrimary?: boolean
}

interface Props {
  visible?: boolean
  title?: string
  message?: string
  icon?: string
  type?: 'default' | 'success' | 'warning' | 'error'
  buttons?: Button[]
  closeOnOverlayClick?: boolean
  autoClose?: boolean
  autoCloseDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
  message: '',
  icon: '',
  type: 'default',
  buttons: () => [{ text: '确定', isPrimary: true }],
  closeOnOverlayClick: true,
  autoClose: false,
  autoCloseDelay: 2000
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'button-click', index: number): void
}>()

const visible = ref(props.visible)

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    closeAlert()
  }
}

const handleButtonClick = (button: Button, index: number) => {
  if (button.onClick) {
    button.onClick()
  }
  emit('button-click', index)
  closeAlert()
}

const closeAlert = () => {
  visible.value = false
  emit('update:visible', false)
  emit('close')
}

watch(() => props.visible, (newVal) => {
  visible.value = newVal
})

let autoCloseTimer: number | null = null

const setupAutoClose = () => {
  if (props.autoClose && visible.value) {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer)
    }
    autoCloseTimer = window.setTimeout(() => {
      closeAlert()
    }, props.autoCloseDelay)
  }
}

watch(() => [props.autoClose, props.autoCloseDelay], () => {
  setupAutoClose()
})

defineExpose({
  show: (options?: Partial<Props>) => {
    if (options) {
      Object.assign(props, options)
    }
    visible.value = true
    return new Promise<void>((resolve) => {
      const unsubscribe = watch(() => visible.value, (newVal) => {
        if (!newVal) {
          unsubscribe()
          resolve()
        }
      })
    })
  },
  hide: closeAlert
})

onMounted(() => {
  setupAutoClose()
})

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>

<style lang="less" scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.alert-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: @ios-corner-radius-xl;
  box-shadow: @ios-shadow-lg;
  width: 90%;
  max-width: 320px;
  overflow: hidden;
  backdrop-filter: blur(@ios-blur-strength);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: alert-in 0.3s ease-out;

  &.success {
    border-color: @color-success;
  }

  &.warning {
    border-color: @color-warning;
  }

  &.error {
    border-color: @color-error;
  }
}

.alert-header {
  padding: @spacing-lg @spacing-md @spacing-sm;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: @spacing-sm;
}

.alert-icon {
  font-size: 1.5rem;
  line-height: 1;
  opacity: 0.8;
}

.alert-container {
  &.success .alert-icon {
    color: @color-success;
  }

  &.warning .alert-icon {
    color: @color-warning;
  }

  &.error .alert-icon {
    color: @color-error;
  }
}

.alert-title {
  font-size: 18px;
  font-weight: 600;
  color: @color-text-soft;
  text-align: center;
  letter-spacing: 0.5px;
}

.alert-message {
  padding: 0 @spacing-md @spacing-lg;
  font-size: 15px;
  color: @color-text-light;
  line-height: 1.5;
  white-space: pre-line;
  text-align: center;
}

.alert-actions {
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: @spacing-xs;
}

.alert-button {
  flex: 1;
  padding: @spacing-sm;
  margin: @spacing-xs;
  border: none;
  border-radius: @ios-corner-radius-md;
  background-color: transparent;
  color: @color-accent-primary;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all @transition-fast ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-button.primary-button {
  background-color: @color-accent-primary;
  color: white;
  box-shadow: 0 2px 10px rgba(156, 122, 242, 0.2);
}

.alert-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.alert-button:active {
  transform: translateY(0);
  opacity: 0.8;
}

.alert-button.primary-button:hover {
  background-color: @color-accent-deep;
}

.alert-enter-active,
.alert-leave-active {
  transition: opacity @transition-normal ease;
}

.alert-enter-from,
.alert-leave-to {
  opacity: 0;
}

.alert-enter-active .alert-container {
  transition: transform @transition-normal cubic-bezier(0.4, 0, 0.2, 1),
    opacity @transition-normal cubic-bezier(0.4, 0, 0.2, 1);
}

.alert-leave-active .alert-container {
  transition: transform @transition-fast cubic-bezier(0.4, 0, 1, 1),
    opacity @transition-fast cubic-bezier(0.4, 0, 1, 1);
}

.alert-enter-from .alert-container {
  transform: scale(0.95) translateY(-15px);
  opacity: 0;
}

.alert-leave-to .alert-container {
  transform: scale(0.95) translateY(-15px);
  opacity: 0;
}

@keyframes alert-in {
  0% {
    transform: scale(0.9) translateY(-20px);
    opacity: 0;
  }

  50% {
    transform: scale(1.02) translateY(-10px);
    opacity: 0.9;
  }

  70% {
    transform: scale(0.98) translateY(-5px);
  }

  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.alert-button {
  transition: all @transition-fast ease, transform @transition-fast ease-out;
}

.alert-button:active {
  transform: scale(0.96);
  transition-duration: 50ms;
}

@media screen and (max-width: @ios-small) {
  .alert-container {
    width: 95%;
    margin: @spacing-sm;
    max-width: 300px;
  }

  .alert-header {
    padding: @spacing-md @spacing-sm @spacing-xs;
    gap: @spacing-xs;
  }

  .alert-icon {
    font-size: 2rem;
  }

  .alert-title {
    font-size: 17px;
  }

  .alert-message {
    font-size: 16px;
    padding: 0 @spacing-sm @spacing-md;
    line-height: 1.4;
  }

  .alert-button {
    font-size: 15px;
    min-height: 40px;
    padding: @spacing-xs @spacing-sm;
  }

  .alert-actions {
    padding: @spacing-xs;
  }
}

@media screen and (min-width: @ios-large) {
  .alert-container {
    max-width: 360px;
  }

  .alert-icon {
    font-size: 2.8rem;
  }

  .alert-title {
    font-size: 20px;
  }

  .alert-message {
    font-size: 16px;
  }
}

@media screen and (max-height: 400px) {
  .alert-container {
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;
  }
}

.alert-container {
  &.success {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 252, 248, 0.98));
  }

  &.warning {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 252, 248, 0.98));
  }

  &.error {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 248, 248, 0.98));
  }
}
</style>