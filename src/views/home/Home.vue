<template>
	<div class="container">
		<div class="card">
			<div class="header">
				<div class="title">
					生日快乐
				</div>
				<div class="subtitle">
					糖醋小栗叽，愿这个小小的空间，能给你片刻的宁静。
				</div>
			</div>
			<div class="content-section">
				<div class="content">
					认识你是一件很美好的事情，在这个特别的日子里想送你一个安静的角落。
				</div>
				<div class="content">
					这里没有期待，没有压力，只有属于你的温柔时光。
				</div>
			</div>
			<div class="decoration"></div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.container {
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: @color-primary-soft;
	padding: @spacing-lg @spacing-md;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

.card {
	width: 100%;
	max-width: @ios-medium;
	background-color: white;
	border-radius: @ios-corner-radius-xl;
	padding: @spacing-xl;
	box-shadow: @ios-shadow-lg;
	position: relative;
	z-index: 1;
	backdrop-filter: blur(10px);
	background: rgba(255, 255, 255, 0.95);
}

.header {
	text-align: center;
	margin-bottom: @spacing-lg;
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
	font-size: 16px;
	color: @color-text-light;
	text-align: center;
	margin-top: @spacing-sm;
	margin-bottom: @spacing-lg;
	letter-spacing: 1px;
}

.content-section {
	margin-bottom: @spacing-lg;
}

.content {
	font-size: 15px;
	line-height: 1.6;
	color: @color-text-soft;
	text-align: center;
	padding: 0 @spacing-md;
	margin-bottom: @spacing-md;
	opacity: 0;
	transform: translateY(10px);
	animation: fadeInUp 0.6s ease forwards;
}

.content:nth-child(1) {
	animation-delay: 0.2s;
}

.content:nth-child(2) {
	animation-delay: 0.4s;
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

@keyframes fadeInUp {
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
	.card {
		padding: @spacing-lg;
	}

	.title {
		font-size: 36px;
	}

	.content {
		font-size: 16px;
		padding: 0 @spacing-sm;
	}
}
</style>