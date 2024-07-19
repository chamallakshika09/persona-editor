import { CardData, ColumnCardData, ColumnType } from '@/types/ui';
import TextCard from './TextCard';
import ImageCard from './ImageCard';
import { memo } from 'react';

interface CardFactoryProps {
  card: ColumnCardData;
  column: ColumnType;
}

function CardFactory({ card, column }: CardFactoryProps) {
  switch (card.type) {
    case 'text':
      return <TextCard key={card.id.toString()} card={card} column={column} />;
    case 'image':
      return <ImageCard key={card.id.toString()} card={card} column={column} />;
    default:
      return null;
  }
}

export default memo(CardFactory);
