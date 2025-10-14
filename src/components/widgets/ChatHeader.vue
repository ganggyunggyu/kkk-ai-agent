<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import {
  NSelect,
  NModal,
  NCard,
  NSpace,
  NButton,
  createDiscreteApi,
} from 'naive-ui';
import { useChatStore } from '@/stores';
import { MODEL_OPTIONS } from '@/constants/_models';
import ModernButton from '../ui/ModernButton.vue';

const { message } = createDiscreteApi(['message']);
const chatStore = useChatStore();
const { service, messages } = storeToRefs(chatStore);
const { updateService, clearChat, exportChat } = chatStore;

const showClearModal = ref(false);

const handleClearChat = () => {
  showClearModal.value = true;
};

const confirmClearChat = () => {
  clearChat();
  showClearModal.value = false;
};

const cancelClearChat = () => {
  showClearModal.value = false;
};

const handleExport = () => {
  const data = exportChat();
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  message.success('채팅 내역이 다운로드되었습니다!');
};
</script>

<template>
  <header class="floating-header">
    <section class="header-content">
      <div class="header-title"></div>

      <nav class="header-controls">
        <n-select
          :value="service"
          @update:value="updateService"
          :options="MODEL_OPTIONS"
          size="small"
          class="service-selector"
        />

        <ModernButton
          variant="ghost"
          size="sm"
          @click="handleExport"
          :disabled="messages.length <= 1"
        >
          내보내기
        </ModernButton>

        <ModernButton
          variant="ghost"
          size="sm"
          @click="handleClearChat"
          :disabled="messages.length <= 1"
        >
          초기화
        </ModernButton>
      </nav>
    </section>

    <n-modal v-model:show="showClearModal">
      <n-card
        style="width: 400px"
        title="초기화 확인"
        :bordered="false"
        size="huge"
      >
        <p>채팅 내역을 초기화하시겠습니까?</p>
        <p style="color: #999; font-size: 14px; margin-top: 8px">
          이 작업은 되돌릴 수 없습니다.
        </p>
        <template #footer>
          <n-space justify="end">
            <n-button @click="cancelClearChat">취소</n-button>
            <n-button type="error" @click="confirmClearChat">초기화</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </header>
</template>

<style scoped>
.floating-header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 100vw;
  max-width: 90vw;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: var(--parchment);
  border: 2px solid var(--vintage-brown);
  border-bottom: 3px solid var(--vintage-brown);
  box-shadow:
    0 2px 0 var(--gold-accent),
    0 8px 20px rgba(42, 37, 34, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  position: relative;
}

.header-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(139, 115, 85, 0.03) 2px,
    rgba(139, 115, 85, 0.03) 4px
  );
  pointer-events: none;
}

.header-content:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 0 var(--gold-accent),
    0 12px 28px rgba(42, 37, 34, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.header-title {
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--deep-burgundy);
  letter-spacing: 0.5px;
  text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.service-selector {
  min-width: 140px;
  font-family: 'Crimson Text', serif;
}

.service-selector :deep(.n-base-selection) {
  background: var(--aged-paper) !important;
  border: 2px solid var(--vintage-brown) !important;
  border-radius: 0 !important;
  box-shadow:
    1px 1px 0 rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  font-family: 'Crimson Text', serif !important;
  transition: all 0.2s ease !important;
}

.service-selector :deep(.n-base-selection:hover) {
  border-color: var(--sepia) !important;
  background: var(--parchment) !important;
}

.service-selector :deep(.n-base-selection.n-base-selection--active) {
  border-color: var(--deep-burgundy) !important;
  box-shadow:
    0 0 0 3px rgba(74, 52, 40, 0.1),
    1px 1px 0 rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
}

.service-selector :deep(.n-base-selection-label) {
  background: transparent !important;
  font-family: 'Crimson Text', serif !important;
  font-size: 15px !important;
  color: var(--ink-black) !important;
  font-weight: 500 !important;
  padding: 6px 12px !important;
}

.service-selector :deep(.n-base-selection-input__content) {
  font-family: 'Crimson Text', serif !important;
  color: var(--ink-black) !important;
}

.service-selector :deep(.n-base-suffix__arrow) {
  color: var(--vintage-brown) !important;
  transition: transform 0.2s ease !important;
}

.service-selector :deep(.n-base-selection--active .n-base-suffix__arrow) {
  transform: rotate(180deg) !important;
  color: var(--deep-burgundy) !important;
}

@media (max-width: 768px) {
  .floating-header {
    max-width: calc(100vw - 32px);
    top: 12px;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 20px;
  }

  .header-title {
    font-size: 20px;
  }

  .service-selector {
    min-width: 120px;
  }
}
</style>
