export interface QuestionOption {
  id: string;
  text: string;
  dimension_scores: Record<string, number>;
}

export interface Question {
  id: number;
  category: string;
  text: string;
  options: QuestionOption[];
}

export interface UserAnswers {
  [questionId: number]: string;
}

export interface DimensionScores {
  spontaneity: number;
  intensity: number;
  cerebral: number;
  exhibitionist: number;
}
