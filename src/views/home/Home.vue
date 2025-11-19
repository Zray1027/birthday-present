<template>
  <Home />
  <Sanctuary />
  <Improvement />
  <Habit />
  <EasterEgg />
  <ScrollIndicator />
</template>

<script setup lang="ts">
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import Home from './components/home/Home.vue'
import Sanctuary from './components/sanctuary/Sanctuary.vue'
import Improvement from './components/improvement/Improvement.vue'
import Habit from './components/habit/Habit.vue'
import EasterEgg from './components/easterEgg/EasterEgg.vue'
</script>

<style lang="less" scoped>
.like-page-link {
  display: flex;
  justify-content: center;
  margin: 40px 0;
  text-decoration: none;
}

.like-page-button {
  background: linear-gradient(135deg, #ff7eb3, #ff6b8b);
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 110, 179, 0.3);
  transition: all 0.3s ease;
  text-align: center;
  min-width: 200px;

  &:hover {
    background: linear-gradient(135deg, #ff6b8b, #ff7eb3);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 110, 179, 0.4);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(255, 110, 179, 0.3);
  }
}
</style>