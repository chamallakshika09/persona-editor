export type CardType = 'text' | 'image';

export interface CardData {
  id: string;
  type: CardType;
  content: string;
}

export type ColumnType = 'left' | 'right';
