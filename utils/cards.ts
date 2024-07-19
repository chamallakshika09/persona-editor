import { v4 as uuidv4 } from 'uuid';
import { CardData, CardType } from '@/types/ui';

export const getNewCard = (type: CardType): CardData => {
  const content =
    type === 'text'
      ? '<h1 class="text-base font-semibold text-textPrimary">Complete your persona</h1>' +
        '<p class="text-sm text-textSecondary">You could start by adding some demographic information, needs, frustrations, etc.</p>'
      : '';
  return { id: uuidv4(), type, content };
};
