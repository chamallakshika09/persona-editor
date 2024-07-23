import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import { colors } from '@/data/colors';
import { CardData, ColumnType } from '@/types/ui';
import { getNewCard } from '@/utils/cards';

let ydoc: Y.Doc | null = null;
let provider: WebrtcProvider | null = null;
let awareness: any = null;

export const initializeYjs = (onInitialized: () => void) => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider('persona-editor', ydoc);
    awareness = provider.awareness;

    const yInitialized = ydoc.getMap('initialized');

    const initializeDocument = () => {
      if (yInitialized.get('isInitialized')) {
        return;
      }

      if (ydoc) {
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
      }
      yInitialized.set('isInitialized', true);
      onInitialized();
    };

    awareness.on('update', () => {
      const states = Array.from(awareness.getStates().values());
      if (states.length === 1) {
        initializeDocument();
      } else if (states.length > 1) {
        onInitialized();
      }
    });
  }

  return ydoc;
};

export const getYDoc = () => {
  if (!ydoc) {
    throw new Error('YDoc is not initialized');
  }
  return ydoc;
};

export const getProvider = () => {
  if (!provider) {
    throw new Error('Provider is not initialized');
  }
  return provider;
};

export const yName = () => getYDoc().getText('name');

export const ySetName = (newName: string) => {
  const name = getYDoc().getText('name');
  name.delete(0, name.length);
  name.insert(0, newName);
};

export const ySelectedAvatar = () => getYDoc().getText('selectedAvatar');

export const ySetSelectedAvatar = (newAvatar: string) => {
  const selectedAvatar = getYDoc().getText('selectedAvatar');
  selectedAvatar.delete(0, selectedAvatar.length);
  selectedAvatar.insert(0, newAvatar);
};

export const ySelectedColor = () => getYDoc().getText('selectedColor');

export const ySetSelectedColor = (newColor: string) => {
  const selectedColor = getYDoc().getText('selectedColor');
  selectedColor.delete(0, selectedColor.length);
  selectedColor.insert(0, newColor);
};

export const yLeftColumnCards = () => getYDoc().getArray<CardData>('leftColumnCards');

export const ySetLeftColumnCards = (newCards: CardData[]) => {
  const leftColumnCards = getYDoc().getArray<CardData>('leftColumnCards');
  leftColumnCards.delete(0, leftColumnCards.length);
  leftColumnCards.insert(0, newCards);
};

export const yRightColumnCards = () => getYDoc().getArray<CardData>('rightColumnCards');

export const ySetRightColumnCards = (newCards: CardData[]) => {
  const rightColumnCards = getYDoc().getArray<CardData>('rightColumnCards');
  rightColumnCards.delete(0, rightColumnCards.length);
  rightColumnCards.insert(0, newCards);
};

export const yAddCard = (column: ColumnType, card: CardData) => {
  if (column === 'left') {
    yLeftColumnCards().push([card]);
  } else {
    yRightColumnCards().push([card]);
  }
};

export const yGetCardsForColumn = (column: ColumnType) => {
  return column === 'left' ? yLeftColumnCards() : yRightColumnCards();
};
