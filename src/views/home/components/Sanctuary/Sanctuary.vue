<template>
	<div class="container">
		<div class="card">
			<div class="header">
				<h2 class="section-title">你的安心角落</h2>
			</div>

			<div class="content-section">
				<h3>专属音乐</h3>
				<AudioPlayer
					:src="getEnv() === 'production' ? '/birthday-present/qin_chuan_summer.mp3' : '/qin_chuan_summer.mp3'" />

				<h3>情绪关怀指南</h3>
				<ul class="tips-list">
					<li>
						<span class="tip-emoji">🌿</span>
						<span class="tip-text">想躲起来也没关系，那只是在给自己充电。</span>
					</li>
					<li>
						<span class="tip-emoji">📖</span>
						<span class="tip-text">翻开那本买了很久的书，给自己一个安静的下午。</span>
					</li>
					<li>
						<span class="tip-emoji">🧸</span>
						<span class="tip-text">抱抱玩偶或者枕头，给自己一个温暖的拥抱。</span>
					</li>
				</ul>
			</div>

			<div class="decoration"></div>
			<div class="hidden-message" @click="showSecretMessage">
				<span class="hint-text">✨</span>
			</div>
		</div>
	</div>

	<CustomAlert v-model:visible="showAlert" type="success" title="天天开心" message="少一点内耗，身体健康是最重要的财富，要好好照顾自己。" icon="💖"
		closeOnOverlayClick />
</template>

<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import CustomAlert from '@/components/CustomAlert.vue'
import { getEnv } from '@/utils/utils'
import { ref } from 'vue'

const showAlert = ref(false)

const showSecretMessage = (): void => {
	showAlert.value = true
}
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

.section-title {
	font-size: 28px;
	font-weight: 700;
	color: @color-accent-primary;
	text-align: center;
	letter-spacing: 1.5px;
	margin: 0;
	text-shadow: 0 2px 4px rgba(156, 122, 242, 0.2);
}

.content-section {
	margin-bottom: @spacing-lg;
}

h3 {
	margin-bottom: @spacing-sm;
	color: @color-text-soft;
	font-weight: 500;
	font-size: 18px;
}

.tips-list {
	text-align: left;
	padding: 0 @spacing-sm;

	li {
		display: flex;
		align-items: flex-start;
		margin-bottom: @spacing-md;
		padding: @spacing-xs 0;
		opacity: 0;
		transform: translateY(10px);
		animation: fadeInUp 0.6s ease forwards;
	}

	li:nth-child(1) {
		animation-delay: 0.2s;
	}

	li:nth-child(2) {
		animation-delay: 0.4s;
	}

	li:nth-child(3) {
		animation-delay: 0.6s;
	}

	li:nth-child(4) {
		animation-delay: 0.8s;
	}

	.tip-emoji {
		margin-right: @spacing-sm;
		font-size: .8rem;
		flex-shrink: 0;
	}

	.tip-text {
		flex: 1;
		line-height: 1.6;
		color: @color-text-soft;
		font-size: 14px;
	}
}

.card-subtext {
	margin-top: @spacing-sm;
	margin-bottom: @spacing-lg;
	font-size: 0.85rem;
	color: @color-text-light;
	text-align: center;
}

.hidden-message {
	position: absolute;
	bottom: 20px;
	right: 20px;
	cursor: pointer;
	opacity: 0.3;
	transition: opacity 0.3s ease;

	&:hover {
		opacity: 0.7;
	}

	.hint-text {
		font-size: 1.5rem;
		animation: bounce 1.5s infinite ease-in-out;
		display: inline-block;
	}

	@keyframes bounce {

		0%,
		100% {
			transform: translateY(0) scale(1);
		}

		50% {
			transform: translateY(-5px) scale(1.1);
		}
	}
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

	.section-title {
		font-size: 24px;
	}


	h3 {
		font-size: 16px;
	}

	.tips-list .tip-text {
		font-size: 14px;
	}
}
</style>