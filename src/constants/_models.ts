import type { ChatService } from '../types';

export const MODEL_OPTIONS: { label: string; value: ChatService }[] = [
  { label: '깨끗이', value: 'clean' },
  { label: '유사어 분석', value: 'synonym' },
  { label: '독후감 비평', value: 'review' },
  { label: '실시간 소식', value: 'news' },
  { label: '딥 서치', value: 'deep_search' },
  { label: 'XAI 프롬프트 엔지니어', value: 'xai-prompt-engineer' },
  { label: 'OpenAI 프롬프트 엔지니어', value: 'openai-prompt-engineer' },
  { label: '작품 스토리 분석', value: 'story-analysis' },
  { label: '업체 요구사항 분석', value: 'requirement-analysis' },
  { label: '번역본 비교', value: 'translation_compare' },
];
