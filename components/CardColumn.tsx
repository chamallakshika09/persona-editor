import { ColumnCardData, ColumnType } from '@/types/ui';
import AddCardMenu from './AddCardMenu';
import CardFactory from './CardFactory';

interface CardColumnProps {
  cards: ColumnCardData[];
  column: ColumnType;
}

export default function CardColumn({ cards, column }: CardColumnProps) {
  return (
    <>
      {cards.map((card) => (
        <CardFactory key={card.id.toString()} card={card} column={column} />
      ))}
      <AddCardMenu column={column} />
    </>
  );
}
