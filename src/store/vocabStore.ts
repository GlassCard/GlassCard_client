import { create } from 'zustand';

export interface VocabData {
  id: string;
  word: string;
  meaning: string;
  example: string;
  isCorrect: boolean;
}

interface VocabState {
  vocabList: VocabData[];
  addVocab: () => void;
  updateVocab: (id: string, field: keyof Omit<VocabData, 'id'>, value: string | boolean) => void;
  deleteVocab: (id: string) => void;
  setVocabList: (vocabList: VocabData[]) => void;
}

export const useVocabStore = create<VocabState>((set) => ({
  vocabList: Array.from({ length: 5 }, (_, index) => ({
    id: `vocab-${index}`,
    word: '',
    meaning: '',
    example: '',
    isCorrect: false,
  })),
  addVocab: () =>
    set((state) => ({
      vocabList: [
        ...state.vocabList,
        {
          id: `vocab-${Date.now()}`,
          word: '',
          meaning: '',
          example: '',
          isCorrect: false,
        },
      ],
    })),
  updateVocab: (id, field, value) =>
    set((state) => ({
      vocabList: state.vocabList.map((vocab) =>
        vocab.id === id ? { ...vocab, [field]: value } : vocab
      ),
    })),
  deleteVocab: (id) =>
    set((state) => ({
      vocabList: state.vocabList.filter((vocab) => vocab.id !== id),
    })),
  setVocabList: (vocabList) => set({ vocabList }),
}));
