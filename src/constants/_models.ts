import type { ChatService } from '../types';

export const MODEL_OPTIONS: { label: string; value: ChatService }[] = [
  { label: '깨끗이', value: 'clean' },
  { label: '유사어 분석', value: 'synonym' },
  { label: '독후감 비평', value: 'review' },
  { label: '실시간 소식', value: 'news' },
  { label: '딥 서치', value: 'deep_search' },
];
