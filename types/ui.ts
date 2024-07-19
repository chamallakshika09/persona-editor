import * as Y from 'yjs';

export type CardType = 'text' | 'image';

export interface CardData extends Y.Map<string | Y.Text> {
  get(key: 'id'): string;
  get(key: 'type'): CardType;
  get(key: 'content'): Y.Text;
}

export interface ColumnCardData {
  [key: string]: string | Y.Text;
}

export type ColumnType = 'left' | 'right';
