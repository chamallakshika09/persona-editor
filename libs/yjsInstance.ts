import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import { colors } from '@/data/colors';
import { CardData, ColumnType } from '@/types/ui';
import { getNewCard } from '@/utils/cards';

let ydoc: Y.Doc;
let provider: WebrtcProvider;
let awareness: any;

export const initializeYjs = () => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider('persona-editor', ydoc);
    awareness = provider.awareness;

    const yInitialized = ydoc.getMap('initialized');

    const initializeDocument = () => {
      const yName = ydoc.getText('name');
      if (yName.length === 0) {
        yName.insert(0, 'New persona');
      }

      const ySelectedAvatar = ydoc.getText('selectedAvatar');
      if (ySelectedAvatar.length === 0) {
        ySelectedAvatar.insert(0, PERSONA_ICONS[4].name);
      }

      const ySelectedColor = ydoc.getText('selectedColor');
      if (ySelectedColor.length === 0) {
        ySelectedColor.insert(0, colors[4]);
      }

      const yLeftColumnCards = ydoc.getArray<CardData>('leftColumnCards');
      if (yLeftColumnCards.length === 0) {
        yLeftColumnCards.insert(0, [getNewCard('image')]);
      }

      const yRightColumnCards = ydoc.getArray<CardData>('rightColumnCards');
      if (yRightColumnCards.length === 0) {
        yRightColumnCards.insert(0, [getNewCard('text')]);
      }

      yInitialized.set('isInitialized', true);
    };

    awareness.on('update', () => {
      const states = Array.from(awareness.getStates().values());
      if (states.length === 1) {
        initializeDocument();
      }
    });
  }

  return ydoc;
};

const getYDoc = () => initializeYjs();
export const getProvider = () => provider;

const yName = getYDoc().getText('name');

const ySetName = (newName: string) => {
  yName.delete(0, yName.length);
  yName.insert(0, newName);
};

const ySelectedAvatar = getYDoc().getText('selectedAvatar');

const ySetSelectedAvatar = (newAvatar: string) => {
  ySelectedAvatar.delete(0, ySelectedAvatar.length);
  ySelectedAvatar.insert(0, newAvatar);
};

const ySelectedColor = getYDoc().getText('selectedColor');

const ySetSelectedColor = (newColor: string) => {
  ySelectedColor.delete(0, ySelectedColor.length);
  ySelectedColor.insert(0, newColor);
};

const yLeftColumnCards = getYDoc().getArray<CardData>('leftColumnCards');

const ySetLeftColumnCards = (newCards: CardData[]) => {
  yLeftColumnCards.delete(0, yLeftColumnCards.length);
  yLeftColumnCards.insert(0, newCards);
};

const yRightColumnCards = getYDoc().getArray<CardData>('rightColumnCards');

const ySetRightColumnCards = (newCards: CardData[]) => {
  yRightColumnCards.delete(0, yRightColumnCards.length);
  yRightColumnCards.insert(0, newCards);
};

const yAddCard = (column: ColumnType, card: CardData) => {
  if (column === 'left') {
    yLeftColumnCards.push([card]);
  } else {
    yRightColumnCards.push([card]);
  }
};

const yGetCardsForColumn = (column: ColumnType) => {
  return column === 'left' ? yLeftColumnCards : yRightColumnCards;
};

export {
  ydoc,
  provider,
  yName,
  ySetName,
  ySelectedAvatar,
  ySetSelectedAvatar,
  ySelectedColor,
  ySetSelectedColor,
  yLeftColumnCards,
  ySetLeftColumnCards,
  yRightColumnCards,
  ySetRightColumnCards,
  yAddCard,
  yGetCardsForColumn,
};
