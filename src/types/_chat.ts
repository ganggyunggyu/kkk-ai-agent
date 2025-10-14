export interface Message {
  role: 'user' | 'bot';
  content: string;
  keyword?: string;
  timestamp?: number;
  id?: string;
  ref?: string;
  service?: string;
}

export type ChatService = 'clean' | 'synonym' | 'review' | 'news' | 'deep_search';

export interface SelectedMessagePackage {
  userMessage: Message;
  responses: Message[];
}

export interface BatchRequest {
  id: string;
  keyword: string;
  refMsg?: string;
}

export type BatchStatus = 'pending' | 'loading' | 'success' | 'error';
