<template>
	<div class="box">
		<FallingJasmine :count="16" />
		<Home />
		<Sanctuary />
		<Improvement />
		<Habit />
		<Gallery />
		<EasterEgg />
		<ScrollIndicator />
	</div>
</template>

<script setup lang="ts">
import ScrollIndicator from '@/components/ScrollIndicator.vue'
import FallingJasmine from '@/components/FallingJasmine.vue'
import Home from '@/views/home/Home.vue'
import Sanctuary from '@/views/Sanctuary/Sanctuary.vue'
import Improvement from './views/Improvement/Improvement.vue'
import Habit from './views/Habit/Habit.vue'
import Gallery from './views/Gallery/Gallery.vue'
import EasterEgg from './views/EasterEgg/EasterEgg.vue'
</script>

<style lang="less" scoped>
.box {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: @color-primary-soft;
	margin: 0;
	padding: 0;
}
</style>