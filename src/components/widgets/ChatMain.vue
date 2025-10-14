<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { NScrollbar, createDiscreteApi } from 'naive-ui';
import MessageBubble from '../ui/MessageBubble.vue';
import { useChatStore } from '@/stores';

const { message } = createDiscreteApi(['message']);
const chatStore = useChatStore();
const { displayMessages } = storeToRefs(chatStore);
const { handleRegenerate, deleteMessage } = chatStore;

const scrollbarRef = ref<InstanceType<typeof NScrollbar> | null>(null);

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

const scrollToBottom = () => {
  if (scrollbarRef.value) {
    scrollbarRef.value.scrollTo({ top: 999999, behavior: 'smooth' });
  }
};

watch(
  () => displayMessages.value.length,
  () => {
    setTimeout(scrollToBottom, 100);
  }
);

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <main class="chat-main">
    <section class="chat-container">
      <section class="messages-container">
        <n-scrollbar ref="scrollbarRef" class="messages-scroll">
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
        </n-scrollbar>
      </section>
    </section>
  </main>
</template>

<style scoped>
.chat-main {
  flex: 1;
  padding: calc(80px + 16px) 16px 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.chat-container {
  max-width: 90vw;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.messages-container {
  height: calc(100dvh - 80px - 180px);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.messages-scroll {
  height: 100%;
  overflow-x: hidden;
}

.messages-scroll :deep(.n-scrollbar-content) {
  overflow-x: hidden;
}

.messages-list {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-x: hidden;
  width: 100%;
}

@media (max-width: 768px) {
  .chat-container {
    max-width: calc(100vw - 32px);
  }
}
</style>
