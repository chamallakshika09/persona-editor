import { v4 as uuidv4 } from 'uuid';
import * as Y from 'yjs';
import { CardData, CardType } from '@/types/ui';

const initialCardDelta = [
  {
    insert: 'Complete your persona',
  },
  {
    insert: '\n',
    attributes: {
      header: 1,
    },
  },
  {
    insert: 'You could start by adding some demographic information, needs, frustrations, etc.',
  },
];

export const getNewCard = (type: CardType): CardData => {
  const content = new Y.Text();

  if (type === 'text') {
    content.applyDelta(initialCardDelta);
  }

  const newCard = new Y.Map<string | Y.Text>();
  newCard.set('id', uuidv4());
  newCard.set('type', type);
  newCard.set('content', content);
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
