<template>
	<div class="box">
		<FallingJasmine :count="16" />
		<router-view />
	</div>
</template>

<script setup lang="ts">
import FallingJasmine from '@/components/FallingJasmine.vue'
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