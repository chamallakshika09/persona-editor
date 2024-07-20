import { v4 as uuidv4 } from 'uuid';
import { CardData, CardType } from '@/types/ui';

export const getNewCard = (type: CardType): CardData => {
  return { id: uuidv4(), type };
};
