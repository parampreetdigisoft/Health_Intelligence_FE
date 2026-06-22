
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatContext {
<<<<<<< HEAD
  country?: string;
  pillar?: string;
}

export interface CountryChatRequestDto extends GlobalChatRequestDto {
  countryID: number;
=======
  city?: string;
  pillar?: string;
}

export interface CityChatRequestDto extends GlobalChatRequestDto {
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarID?: number | null;
  questionText: string;
  fAQID?: number | null;
  historyText: string | null;
}

export interface GlobalChatRequestDto {
  questionText: string;
  fAQID?: number | null;
  historyText: string | null;
}

export interface CrossComparisionChatRequestDto {
  questionText: string;
<<<<<<< HEAD
  countryIDs: number[];
=======
  cityIDs: number[];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  historyText: string | null;
}

export interface ChatResponseDto {
<<<<<<< HEAD
  countryID: number;
=======
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarID?: number | null;
  questionText: string;
  fAQID?: number | null;
  responseText: string;
}