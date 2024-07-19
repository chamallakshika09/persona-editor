import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { PERSONA_ICONS } from '@/assets/PersonaIcons';
import { colors } from '@/data/colors';
import { CardData } from '@/types/ui';
import { getNewCard } from '@/utils/cards';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('persona-editor', ydoc);

const name = ydoc.getText('name');
name.insert(0, 'New persona');

const setName = (newName: string) => {
  ydoc.getText('name').delete(0, name.length);
  ydoc.getText('name').insert(0, newName);
};

const selectedAvatar = ydoc.getText('selectedAvatar');
selectedAvatar.insert(0, PERSONA_ICONS[4].name);

const setSelectedAvatar = (newAvatar: string) => {
  ydoc.getText('selectedAvatar').delete(0, selectedAvatar.length);
  ydoc.getText('selectedAvatar').insert(0, newAvatar);
};

const selectedColor = ydoc.getText('selectedColor');
selectedColor.insert(0, colors[4]);

const setSelectedColor = (newColor: string) => {
  ydoc.getText('selectedColor').delete(0, selectedColor.length);
  ydoc.getText('selectedColor').insert(0, newColor);
};

const leftColumnCards = ydoc.getArray<CardData>('leftColumnCards');
leftColumnCards.insert(0, [getNewCard('image')]);

const setLeftColumnCards = (newCards: CardData[]) => {
  leftColumnCards.delete(0, leftColumnCards.length);
  leftColumnCards.insert(0, newCards);
};

const rightColumnCards = ydoc.getArray<CardData>('rightColumnCards');
rightColumnCards.insert(0, [getNewCard('text')]);

const setRightColumnCards = (newCards: CardData[]) => {
  rightColumnCards.delete(0, rightColumnCards.length);
  rightColumnCards.insert(0, newCards);
};

export {
  ydoc,
  provider,
  name,
  setName,
  selectedAvatar,
  setSelectedAvatar,
  selectedColor,
  setSelectedColor,
  leftColumnCards,
  setLeftColumnCards,
  rightColumnCards,
  setRightColumnCards,
};
