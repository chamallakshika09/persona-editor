import { CardData, ColumnType } from '@/types/ui';
import TextCard from './TextCard';
import ImageCard from './ImageCard';

interface CardFactoryProps {
  card: CardData;
}

export default function CardFactory({ card }: CardFactoryProps) {
  switch (card.type) {
    case 'text':
      return <TextCard key={card.id} />;
    case 'image':
      return <ImageCard key={card.id} />;
    default:
      return null;
  }
}
