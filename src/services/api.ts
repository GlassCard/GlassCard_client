import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CompareResponse {
  success: boolean;
  analysis: {
    semantic_similarity: number;
    pos_matching_score: number;
    synonym_score: number;
    keyword_score: number;
    total_score: number;
    meaning_words: string[];
    user_words: string[];
    meaning_pos_info: Record<string, any>;
    user_pos_info: Record<string, any>;
  };
}

export interface CompareRequest {
  meaning: string;
  user_input: string;
}

export const compareAnswers = async (userInput: string, correctAnswer: string): Promise<CompareResponse> => {
  try {
    const response = await api.post<CompareResponse>('/compare', null, {
      params: {
        meaning: correctAnswer,
        user_input: userInput
      }
    });
    return response.data;
  } catch (error) {
    console.error('답안 비교 API 오류:', error);
    throw error;
  }
};

export default api; 