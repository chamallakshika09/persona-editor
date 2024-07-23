import { ColumnCardData, ColumnType } from '@/types/ui';
import AddCardMenu from './AddCardMenu';
import CardFactory from './CardFactory';
import { memo } from 'react';

interface CardColumnProps {
  cards: ColumnCardData[];
  column: ColumnType;
}

function CardColumn({ cards, column }: CardColumnProps) {
  return (
    <>
      {cards.map((card) => (
        <CardFactory key={card.id.toString()} card={card} column={column} />
      ))}
      <AddCardMenu column={column} />
    </>
  );
}

export default memo(CardColumn);
