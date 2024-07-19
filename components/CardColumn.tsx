import { CardData, ColumnType } from '@/types/ui';
import AddCardMenu from './AddCardMenu';
import CardFactory from './CardFactory';
import { memo, useEffect } from 'react';

interface CardColumnProps {
  cards: CardData[];
  column: ColumnType;
}

function CardColumn({ cards, column }: CardColumnProps) {
  return (
    <>
      {cards.map((card) => (
        <CardFactory key={card.id} card={card} column={column} />
      ))}
      <AddCardMenu column={column} />
    </>
  );
}

export default memo(CardColumn);
