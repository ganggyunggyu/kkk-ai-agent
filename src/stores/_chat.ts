import { defineStore } from 'pinia';
import { ref, computed, reactive } from 'vue';
import { generateText } from '../service/_chat.service';
import type { ChatService } from '../types/_chat';
import { INTRO_MARKDOWN } from '../constants/_texts';
import type { Message } from '../types/_chat';

export const useChatStore = defineStore(
  'chat',
  () => {
    const defaultService: ChatService = 'clean';

    const messages = ref<Message[]>([
      {
        id: 'intro-message',
        role: 'bot',
        content: INTRO_MARKDOWN,
        timestamp: Date.now(),
      },
    ]);

    const keyword = ref('');
    const refMsg = ref('');
    const service = ref<ChatService>(defaultService);
    const pendingMessages = reactive(new Set<string>());
    const showRefInput = ref(true);
    const activeRequests = reactive(new Map<string, AbortController>());

    const displayMessages = computed(() => messages.value);
    const hasMessages = computed(() => messages.value.length > 1);
    const isLoading = computed(() => pendingMessages.size > 0);

    const handleGenerate = async () => {
      if (!keyword.value.trim()) return;

      const input = keyword.value;
      const messageId = `msg-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 11)}`;

      messages.value.push({
        id: `user-${messageId}`,
        role: 'user',
        content: input,
        keyword: input,
        ref: '',
        service: service.value,
        timestamp: Date.now(),
      });

      const loadingMessageId = `bot-${messageId}`;
      messages.value.push({
        id: loadingMessageId,
        role: 'bot',
        content: 'loading',
        keyword: input,
        ref: '',
        service: service.value,
        timestamp: Date.now(),
      });

      keyword.value = '';
      showRefInput.value = false;
      pendingMessages.add(loadingMessageId);

      const abortController = new AbortController();
      activeRequests.set(loadingMessageId, abortController);

      try {
        const res = await generateText({
          service: service.value || defaultService,
          keyword: input,
          ref: '',
        });

        console.log('API Response:', res);
        const botResponse: string = res?.content || '(응답 없음)';
        console.log('Bot Response:', botResponse);

        const currentLoadingIndex = messages.value.findIndex(
          (msg) => msg.id === loadingMessageId
        );
        if (currentLoadingIndex !== -1) {
          messages.value[currentLoadingIndex] = {
            id: loadingMessageId,
            role: 'bot',
            content: botResponse,
            keyword: input,
            ref: '',
            service: service.value,
            timestamp: Date.now(),
          };
        }
      } catch (error) {
        if (abortController.signal.aborted) return;

        const currentLoadingIndex = messages.value.findIndex(
          (msg) => msg.id === loadingMessageId
        );
        if (currentLoadingIndex !== -1) {
          messages.value[currentLoadingIndex] = {
            id: loadingMessageId,
            role: 'bot',
            content: `⚠️ ${
              (error as Error).message ||
              '오류가 발생했어요. 다시 시도해주세요!'
            }`,
            keyword: input,
            ref: '',
            service: service.value,
            timestamp: Date.now(),
          };
        }
        console.error(error);
      } finally {
        console.log('Finally block - cleaning up:', loadingMessageId);
        console.log('Pending before delete:', Array.from(pendingMessages));
        pendingMessages.delete(loadingMessageId);
        activeRequests.delete(loadingMessageId);
        console.log('Pending after delete:', Array.from(pendingMessages));
        refMsg.value = '';
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleGenerate();
      }
    };

    const handleRegenerate = (msg: Message) => {
      if (msg.keyword) {
        keyword.value = msg.keyword;
        if (msg.ref) refMsg.value = msg.ref;
        if (msg.service) service.value = msg.service as ChatService;
        handleGenerate();
      }
    };

    const updateService = (newService: ChatService) => {
      service.value = newService;
    };

    const deleteMessage = (index: number) => {
      if (index > 0 && index < messages.value.length) {
        messages.value.splice(index, 1);
      }
    };

    const cancelCurrentRequest = () => {
      const lastRequestId = Array.from(activeRequests.keys()).pop();
      if (lastRequestId) {
        const controller = activeRequests.get(lastRequestId);
        controller?.abort();
        activeRequests.delete(lastRequestId);
        pendingMessages.delete(lastRequestId);

        const loadingIndex = messages.value.findIndex(
          (msg) => msg.id === lastRequestId
        );
        if (loadingIndex !== -1) {
          messages.value.splice(loadingIndex, 1);
        }
      }
    };

    const clearChat = () => {
      activeRequests.forEach((abortController: AbortController) => {
        abortController.abort();
      });
      activeRequests.clear();
      pendingMessages.clear();

      messages.value = [
        {
          id: 'intro-message',
          role: 'bot',
          content: INTRO_MARKDOWN,
          timestamp: Date.now(),
        },
      ];
    };

    const exportChat = () => {
      const exportData = {
        exportedAt: new Date().toISOString(),
        messageCount: messages.value.length,
        messages: messages.value.map((msg) => ({
          role: msg.role,
          content: msg.content,
          keyword: msg.keyword,
          ref: msg.ref,
          service: msg.service,
          timestamp: msg.timestamp,
          time: new Date(msg.timestamp || 0).toLocaleString('ko-KR'),
        })),
      };

      return JSON.stringify(exportData, null, 2);
    };

    return {
      // state
      messages,
      keyword,
      refMsg,
      service,
      showRefInput,
      pendingMessages,

      // computed
      displayMessages,
      hasMessages,
      isLoading,

      // actions
      handleGenerate,
      handleKeyPress,
      handleRegenerate,
      updateService,
      deleteMessage,
      clearChat,
      exportChat,
      cancelCurrentRequest,
    };
  },
  {
    persist: {
      key: 'chat-store',
      storage: localStorage,
    },
  }
);
