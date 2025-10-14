<script setup lang="ts">
import { computed } from 'vue';
import {
  Copy as CopyIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
} from '@vicons/ionicons5';
import type { Message } from '@/types/_chat';
import { renderMarkdown } from '@/utils/_markdown';
import ModernButton from './ModernButton.vue';

interface Props {
  message: Message;
  index: number;
}

interface Emits {
  copy: [text: string];
  download: [message: Message];
  regenerate: [message: Message];
  delete: [index: number];
}

const props = defineProps<Props>();
defineEmits<Emits>();

const renderedContent = computed(() => {
  if (props.message.content === 'loading') return '';
  // 모든 메시지를 마크다운으로 렌더링
  return renderMarkdown(props.message.content);
});

const formatTime = (timestamp?: number) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<template>
  <article :class="['message-bubble', `message-bubble--${message.role}`]">
    <div class="message-content">
      <div class="message-body">
        <header class="message-header">
          <span class="message-sender">
            {{ message.role === 'user' ? '감겸규' : '개굴이왕눈이' }}
          </span>
          <time
            class="message-time"
            :datetime="new Date(message.timestamp || 0).toISOString()"
          >
            {{ formatTime(message.timestamp) }}
          </time>
        </header>

        <main class="message-text">
          <section v-if="message.content === 'loading'" class="loading-message">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="loading-text">응답 생성 중...</span>
          </section>

          <div
            v-else
            class="message-content-text"
            v-html="renderedContent"
            @dblclick="$emit('copy', message.content)"
          ></div>
        </main>

        <footer class="message-actions">
          <ModernButton
            v-if="message.content !== 'loading'"
            variant="ghost"
            size="sm"
            :icon="CopyIcon"
            @click="$emit('copy', message.content)"
            class="action-btn"
          >
            복사
          </ModernButton>

          <ModernButton
            v-if="message.role === 'bot' && message.content !== 'loading'"
            variant="ghost"
            size="sm"
            :icon="DownloadIcon"
            @click="$emit('download', message)"
            class="action-btn"
          >
            저장
          </ModernButton>

          <ModernButton
            v-if="message.role === 'bot' && message.content !== 'loading'"
            variant="ghost"
            size="sm"
            :icon="RefreshIcon"
            @click="$emit('regenerate', message)"
            class="action-btn"
          >
            재생성
          </ModernButton>

          <ModernButton
            v-if="index > 0"
            variant="ghost"
            size="sm"
            :icon="CloseIcon"
            @click="$emit('delete', index)"
            class="action-btn delete-btn"
          >
            삭제
          </ModernButton>
        </footer>
      </div>
    </div>
  </article>
</template>

<style scoped>
.message-bubble {
  display: flex;
  margin-bottom: 32px;
  animation: slideIn 0.5s ease-out;
}

.message-bubble--user {
  justify-content: flex-end;
}

.message-bubble--bot {
  justify-content: flex-start;
}

.message-content {
  max-width: 75%;
  min-width: 0;
  overflow: hidden;
}

.message-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-family: 'EB Garamond', serif;
}

.message-sender {
  font-size: 15px;
  font-weight: 600;
  color: var(--vintage-brown);
  letter-spacing: 0.5px;
}

.message-time {
  font-size: 13px;
  color: var(--vintage-brown);
  opacity: 0.6;
  font-style: italic;
}

.message-text {
  background: var(--aged-paper);
  padding: 20px 28px;
  border: 1px solid var(--vintage-brown);
  border-left: 4px solid var(--sepia);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05), 4px 4px 12px rgba(42, 37, 34, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  font-family: 'Crimson Text', serif;
  font-size: 16px;
  line-height: 1.8;
  min-width: 0;
  overflow: hidden;
  word-wrap: break-word;
}

.message-text::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 24px,
    rgba(139, 115, 85, 0.08) 24px,
    rgba(139, 115, 85, 0.08) 25px
  );
  pointer-events: none;
}

.message-bubble--user .message-text {
  background: var(--parchment);
  border-left: 4px solid var(--deep-burgundy);
  border-right: 1px solid var(--vintage-brown);
  color: var(--ink-black);
}

.message-bubble--bot .message-text {
  background: var(--aged-paper);
  border-left: 4px solid var(--sepia);
  color: var(--ink-black);
}

.message-text:hover {
  transform: translateY(-2px) translateX(2px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.08), 6px 6px 16px rgba(42, 37, 34, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.loading-message {
  display: flex;
  align-items: center;
  gap: 14px;
}

.typing-indicator {
  display: flex;
  gap: 6px;
}

.typing-indicator span {
  width: 7px;
  height: 7px;
  background: var(--vintage-brown);
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: -0.16s;
}

.loading-text {
  font-size: 15px;
  color: var(--vintage-brown);
  font-style: italic;
  font-family: 'EB Garamond', serif;
}

.message-content-text {
  line-height: 1.8;
  word-break: break-word;
  overflow-wrap: break-word;
  position: relative;
  z-index: 1;
  max-width: 100%;
  overflow: hidden;
}

.message-content-text :deep(*) {
  max-width: 100%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.message-content-text :deep(pre) {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  overflow-x: auto;
  max-width: 100%;
}

.message-content-text :deep(code) {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.message-content-text :deep(table) {
  display: block;
  overflow-x: auto;
  max-width: 100%;
}

.message-content-text :deep(a) {
  word-break: break-all;
  overflow-wrap: anywhere;
}

.message-actions {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.message-bubble:hover .message-actions {
  opacity: 1;
}

.action-btn {
  font-size: 13px !important;
  padding: 6px 12px !important;
  height: auto !important;
  font-family: 'Crimson Text', serif !important;
}

.delete-btn {
  color: var(--deep-burgundy) !important;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.3;
  }
  30% {
    transform: translateY(-8px);
    opacity: 1;
  }
}
</style>
