<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { createDiscreteApi } from 'naive-ui';
import MessageBubble from '../ui/MessageBubble.vue';
import { useChatStore } from '@/stores';

const { message } = createDiscreteApi(['message']);
const chatStore = useChatStore();
const { displayMessages } = storeToRefs(chatStore);
const { handleRegenerate, deleteMessage } = chatStore;

const scrollAnchorRef = ref<HTMLDivElement | null>(null);

const copyMsg = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    message.success('복사 성공');
  } catch {
    message.error('복사 실패');
  }
};

const handleDownload = (msg: any) => {
  const fileName = `${msg.keyword || 'message'}_${Date.now()}.txt`;
  const blob = new Blob([msg.content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
  message.success('다운로드 완료');
};

const scrollToBottom = async (smooth = true) => {
  await nextTick();

  setTimeout(() => {
    scrollAnchorRef.value?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
      block: 'end'
    });
  }, 100);
};

watch(
  displayMessages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

onMounted(() => {
  scrollToBottom(false);
});
</script>

<template>
  <main class="chat-main">
    <section ref="messagesContainerRef" class="messages-container">
      <ul class="messages-list">
        <li
          v-for="(msg, idx) in displayMessages"
          :key="`${idx}-${msg.timestamp}`"
        >
          <MessageBubble
            :message="msg"
            :index="idx"
            @copy="copyMsg"
            @download="handleDownload"
            @regenerate="handleRegenerate"
            @delete="deleteMessage"
          />
        </li>
      </ul>
      <div ref="scrollAnchorRef" class="scroll-anchor"></div>
    </section>
  </main>
</template>

<style scoped>
.chat-main {
  flex: 1;
  padding: calc(80px + 16px) 16px 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  max-width: 90vw;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding-bottom: 16px;
}

.messages-container::-webkit-scrollbar {
  width: 6px;
}

.messages-container::-webkit-scrollbar-track {
  background: rgba(139, 115, 85, 0.1);
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--vintage-brown);
  border-radius: 3px;
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--deep-burgundy);
}

.messages-list {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.scroll-anchor {
  height: 1px;
  width: 100%;
}

@media (max-width: 768px) {
  .messages-container {
    max-width: calc(100vw - 32px);
  }
}
</style>
