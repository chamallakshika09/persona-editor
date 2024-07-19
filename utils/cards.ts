import { v4 as uuidv4 } from 'uuid';
import * as Y from 'yjs';
import { CardData, CardType } from '@/types/ui';

export const getNewCard = (type: CardType): CardData => {
  const content =
    type === 'text'
      ? '<h1 class="text-base font-semibold text-textPrimary">Complete your persona</h1>' +
        '<p class="text-sm text-textSecondary">You could start by adding some demographic information, needs, frustrations, etc.</p>'
      : '';

  const newCard = new Y.Map<string | Y.Text>();
  newCard.set('id', uuidv4());
  newCard.set('type', type);
  newCard.set('content', new Y.Text(content));
  return newCard as CardData;
};

export const convertObjArrToCardDataArr = (objArr: { [key: string]: string | Y.Text }[]): CardData[] => {
  return objArr.map((obj) => {
    const card = new Y.Map<string | Y.Text>();
    card.set('id', obj.id);
    card.set('type', obj.type);
    card.set('content', new Y.Text(obj.content.toString()));
    return card as CardData;
  });
};
