
export enum AppPhase {
  INTRO = 'INTRO',
  GAME = 'GAME',
  SUCCESS = 'SUCCESS'
}

export interface Compliment {
  text: string;
  emoji: string;
}

export interface QuizOption {
  label: string;
  value: string;
}
