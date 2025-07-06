import { create } from 'zustand';
import { compareAnswers } from '../services/api';

export interface VocabItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech?: string;
  correctAnswer: string;
}

export type AnswerType = 'Correct' | 'Flexible' | 'Incorrect';

export interface StudyAnswer {
  itemId: string;
  userAnswer: string;
  isCorrect: boolean;
  similarity: number;
  answerType: AnswerType;
}

export interface StudySession {
  vocabListId: string;
  currentIndex: number;
  correctCount: number;
  totalCount: number;
  startTime: Date;
  answers: StudyAnswer[];
}

interface StudyState {
  // 상태
  vocabItems: VocabItem[];
  currentIndex: number;
  userAnswer: string;
  isCorrect: boolean | null;
  answerType: AnswerType | null;
  showHint: boolean;
  studySession: StudySession | null;
  studyMode: 'word-to-meaning' | 'meaning-to-word' | 'example-fill';
  wrongAnswers: VocabItem[];
  isCompleted: boolean;
  isLoading: boolean;
  error: string | null;

  // 액션
  setVocabItems: (items: VocabItem[]) => void;
  setCurrentIndex: (index: number) => void;
  setUserAnswer: (answer: string) => void;
  setShowHint: (show: boolean) => void;
  setStudyMode: (mode: 'word-to-meaning' | 'meaning-to-word' | 'example-fill') => void;
  initializeSession: (vocabListId: string, items: VocabItem[]) => void;
  checkAnswer: (userInput: string, correctAnswer: string) => Promise<{ isCorrect: boolean; similarity: number; type: AnswerType }>;
  submitAnswer: () => Promise<void>;
  nextQuestion: () => void;
  resetStudy: () => void;
  setError: (error: string | null) => void;
}

export const useStudyStore = create<StudyState>((set, get) => ({
  // 초기 상태
  vocabItems: [],
  currentIndex: 0,
  userAnswer: '',
  isCorrect: null,
  answerType: null,
  showHint: false,
  studySession: null,
  studyMode: 'word-to-meaning',
  wrongAnswers: [],
  isCompleted: false,
  isLoading: false,
  error: null,

  // 액션들
  setVocabItems: (items) => set({ vocabItems: items }),
  
  setCurrentIndex: (index) => set({ currentIndex: index }),
  
  setUserAnswer: (answer) => set({ userAnswer: answer }),
  
  setShowHint: (show) => set({ showHint: show }),
  
  setStudyMode: (mode) => set({ studyMode: mode }),
  
  initializeSession: (vocabListId, items) => {
    const session: StudySession = {
      vocabListId,
      currentIndex: 0,
      correctCount: 0,
      totalCount: items.length,
      startTime: new Date(),
      answers: []
    };
    set({ 
      vocabItems: items, 
      studySession: session,
      currentIndex: 0,
      userAnswer: '',
      isCorrect: null,
      answerType: null,
      showHint: false,
      wrongAnswers: [],
      isCompleted: false,
      error: null
    });
  },

  checkAnswer: async (userInput, correctAnswer) => {
    set({ isLoading: true, error: null });
    
    try {
      // 1. Exact match 확인 (빠른 응답을 위해 먼저 체크)
      if (userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
        set({ isLoading: false });
        return { isCorrect: true, similarity: 1.0, type: 'Correct' as AnswerType };
      }
      
      // 2. 외부 API로 유사도 분석
      const result = await compareAnswers(userInput, correctAnswer);
      
      if (!result.success) {
        throw new Error('API 응답 실패');
      }
      
      // total_score를 기준으로 정확도 판단
      const totalScore = result.analysis.total_score;
      const isCorrect = totalScore >= 0.6; // 60% 이상이면 정답으로 판단
      
      const answerType: AnswerType = isCorrect 
        ? (totalScore >= 0.9 ? 'Correct' : 'Flexible')
        : 'Incorrect';
      
      set({ isLoading: false });
      return {
        isCorrect,
        similarity: totalScore,
        type: answerType
      };
      
    } catch (error) {
      console.error('답안 확인 오류:', error);
      
      // API 실패 시 기존 로직으로 폴백
      const userWords = userInput.toLowerCase().split(' ');
      const correctWords = correctAnswer.toLowerCase().split(' ');
      const commonWords = userWords.filter(word => correctWords.includes(word));
      const similarity = commonWords.length / Math.max(userWords.length, correctWords.length);
      
      const isCorrect = similarity > 0.3;
      const answerType: AnswerType = isCorrect ? 'Flexible' : 'Incorrect';
      
      set({ isLoading: false });
      return { isCorrect, similarity, type: answerType };
    }
  },

  submitAnswer: async () => {
    const { vocabItems, currentIndex, studySession, userAnswer, wrongAnswers } = get();
    
    if (!vocabItems[currentIndex] || !studySession) return;
    
    const currentItem = vocabItems[currentIndex];
    const result = await get().checkAnswer(userAnswer, currentItem.correctAnswer);
    
    // 답변 기록
    const newAnswer: StudyAnswer = {
      itemId: currentItem.id,
      userAnswer,
      isCorrect: result.isCorrect,
      similarity: result.similarity,
      answerType: result.type
    };
    
    const updatedSession = {
      ...studySession,
      correctCount: studySession.correctCount + (result.isCorrect ? 1 : 0),
      answers: [...studySession.answers, newAnswer]
    };
    
    const updatedWrongAnswers = result.isCorrect 
      ? wrongAnswers 
      : [...wrongAnswers, currentItem];
    
    set({
      studySession: updatedSession,
      isCorrect: result.isCorrect,
      answerType: result.type,
      wrongAnswers: updatedWrongAnswers
    });
  },

  nextQuestion: () => {
    const { vocabItems, currentIndex, wrongAnswers } = get();
    
    if (currentIndex < vocabItems.length - 1) {
      set({
        currentIndex: currentIndex + 1,
        userAnswer: '',
        isCorrect: null,
        answerType: null,
        showHint: false
      });
    } else {
      // 모든 문제 완료, 틀린 문제들 다시 학습
      if (wrongAnswers.length > 0) {
        set({
          vocabItems: wrongAnswers,
          currentIndex: 0,
          wrongAnswers: [],
          userAnswer: '',
          isCorrect: null,
          answerType: null,
          showHint: false
        });
      } else {
        // 완전히 완료
        set({ isCompleted: true });
      }
    }
  },

  resetStudy: () => {
    set({
      vocabItems: [],
      currentIndex: 0,
      userAnswer: '',
      isCorrect: null,
      answerType: null,
      showHint: false,
      studySession: null,
      wrongAnswers: [],
      isCompleted: false,
      isLoading: false,
      error: null
    });
  },

  setError: (error) => set({ error })
})); 