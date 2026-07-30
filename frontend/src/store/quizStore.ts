import { create } from 'zustand';

interface QuizState {
  answers: Record<number, string>;
  currentQuestion: number;
  isLoading: boolean;
  result: any | null;
  setAnswer: (questionId: number, answerId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  currentQuestion: 0,
  isLoading: false,
  result: null,

  setAnswer: (questionId, answerId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerId },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
    })),

  previousQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    })),

  reset: () =>
    set({
      answers: {},
      currentQuestion: 0,
      isLoading: false,
      result: null,
    }),
}));
