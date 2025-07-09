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
    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '').trim();

    // 여러 정답 지원: 쉼표로 분리
    const correctAnswers = correctAnswer.split(',').map(ans => normalize(ans));

    try {
      // 1. Exact match (여러 정답 중 하나라도 일치하면 정답)
      if (correctAnswers.some(ans => normalize(userInput) === ans)) {
        set({ isLoading: false });
        return { isCorrect: true, similarity: 1.0, type: 'Correct' as AnswerType };
      }

      // 2. 외부 API 유사도 분석 (여러 정답 중 가장 높은 점수 사용)
      let bestResult = { isCorrect: false, similarity: 0, type: 'Incorrect' as AnswerType };

      for (const ans of correctAnswers) {
        const result = await compareAnswers(userInput, ans);
        if (!result.success) continue;
        const totalScore = result.analysis.total_score;
        const isCorrect = totalScore >= 0.8;
        const answerType: AnswerType = isCorrect
          ? (totalScore >= 1.0 ? 'Correct' : 'Flexible')
          : 'Incorrect';

        if (totalScore > bestResult.similarity) {
          bestResult = { isCorrect, similarity: totalScore, type: answerType };
        }
        // 완전 정답이면 바로 반환
        if (answerType === 'Correct') break;
      }

      set({ isLoading: false });
      return bestResult;

    } catch (error) {
      // fallback: 여러 정답 중 가장 높은 유사도 사용
      const userWords = normalize(userInput).split(' ');
      let bestSimilarity = 0;
      let bestType: AnswerType = 'Incorrect';
      for (const ans of correctAnswers) {
        const correctWords = ans.split(' ');
        const commonWords = userWords.filter(word => correctWords.includes(word));
        const similarity = commonWords.length / Math.max(userWords.length, correctWords.length);

        if (similarity > bestSimilarity) {
          bestSimilarity = similarity;
          bestType = similarity > 0.3 ? 'Flexible' : 'Incorrect';
        }
      }

      set({ isLoading: false });
      return { isCorrect: bestType === 'Flexible', similarity: bestSimilarity, type: bestType };
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