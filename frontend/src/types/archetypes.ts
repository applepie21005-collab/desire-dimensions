export interface Archetype {
  id: string;
  name: string;
  emoji: string;
  summary: string;
  description: string;
  dimensions: Record<string, number>;
  strengths: string[];
  weaknesses: string[];
  observations: string[];
  compatible_with: string[];
  challenged_by: string[];
  shareCard: {
    title: string;
    subtitle: string;
    tagline: string;
  };
}

export interface ScoringResult {
  archetypeId: string;
  archetype: Archetype;
  dimensionScores: Record<string, number>;
  confidence: number;
}
