<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Send as SendIcon, Document as DocumentIcon } from '@vicons/ionicons5';
import ModernButton from '../ui/ModernButton.vue';
import ModernInput from '../ui/ModernInput.vue';
import { useChatStore } from '@/stores';

const chatStore = useChatStore();
const { keyword, refMsg, isLoading, showRefInput } = storeToRefs(chatStore);
const { handleGenerate } = chatStore;

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.isComposing || e.keyCode === 229) return;
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleGenerate();
  }
};
</script>

<template>
  <footer class="floating-input">
    <section class="input-container">
      <div class="input-card">
        <!-- 참조원고 입력 부분 주석처리 -->
        <!-- <transition name="ref-slide">
          <section v-show="showRefInput" class="ref-input-section">
            <div class="input-surface">
              <ModernInput
                v-model:value="refMsg"
                type="textarea"
                :rows="1"
                :autosize="{ minRows: 1, maxRows: 4 }"
                placeholder="참고 문서나 컨텍스트를 입력해주세요 (선택)"
                class="main-input"
              />
            </div>
          </section>
        </transition> -->

        <section class="main-input-row">
          <div class="input-wrapper">
            <ModernInput
              v-model:value="keyword"
              type="text"
              :rows="1"
              :autosize="{ minRows: 1, maxRows: 4 }"
              placeholder="메시지를 입력하세요..."
              class="main-input"
              :onEnter="() => handleGenerate()"
              @keydown="handleKeyDown"
            />

            <nav class="input-actions">
              <!-- 참조원고 버튼 주석처리 -->
              <!-- <ModernButton
                variant="ghost"
                size="sm"
                icon-only
                :icon="DocumentIcon"
                @click="showRefInput = !showRefInput"
                :class="{ active: showRefInput }"
              /> -->

              <ModernButton
                v-if="keyword"
                variant="primary"
                size="sm"
                icon-only
                :icon="SendIcon"
                @click="handleGenerate"
                :loading="isLoading"
              />
            </nav>
          </div>
        </section>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.floating-input {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  max-width: 90vw;
  z-index: 100;
}

.input-container {
  position: relative;
}

.input-card {
  padding: 0;
  background: var(--parchment);
  border: 2px solid var(--vintage-brown);
  border-top: 3px solid var(--vintage-brown);
  border-bottom: none;
  box-shadow:
    0 -2px 0 var(--gold-accent),
    0 -12px 32px rgba(42, 37, 34, 0.2),
    inset 0 -1px 0 rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}

.input-card::before {
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
  z-index: 0;
}

.input-card:hover {
  transform: translateY(-3px);
  box-shadow:
    0 -2px 0 var(--gold-accent),
    0 -16px 40px rgba(42, 37, 34, 0.25),
    inset 0 -1px 0 rgba(255, 255, 255, 0.5);
}

.ref-input-section {
  padding: 20px 24px 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.ref-slide-enter-from,
.ref-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

.ref-slide-enter-to,
.ref-slide-leave-from {
  max-height: 200px;
  opacity: 1;
  transform: translateY(0);
}

.ref-slide-enter-active,
.ref-slide-leave-active {
  transition: max-height 280ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 240ms ease,
    transform 280ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.input-wrapper,
.input-surface {
  margin-top: 8px;
  color: var(--ink-black);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  background: var(--aged-paper);
  border: 1px solid var(--vintage-brown);
  border-left: 3px solid var(--sepia);
  padding: 18px 22px;
  transition: all 0.3s ease;
  box-shadow:
    2px 2px 0 rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  font-family: 'Crimson Text', serif;
}

.input-wrapper::after,
.input-surface::after {
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
    rgba(139, 115, 85, 0.06) 24px,
    rgba(139, 115, 85, 0.06) 25px
  );
  pointer-events: none;
}

.input-wrapper:focus-within,
.input-surface:focus-within {
  border-color: var(--deep-burgundy);
  border-left-color: var(--deep-burgundy);
  background: var(--parchment);
  box-shadow:
    0 0 0 4px rgba(92, 58, 58, 0.1),
    3px 3px 0 rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.main-input {
  flex: 1;
  font-family: 'Crimson Text', serif;
  font-size: 16px;
  position: relative;
  z-index: 1;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.main-input-row {
  padding: 20px 24px;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .floating-input {
    max-width: 100vw;
  }

  .input-card {
    border-radius: 0;
  }
}
</style>
