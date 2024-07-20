import { CardData, ColumnType } from '@/types/ui';
import AddCardMenu from './AddCardMenu';
import CardFactory from './CardFactory';

interface CardColumnProps {
  cards: CardData[];
  setCards: (cards: CardData[]) => void;
}

export default function CardColumn({ cards, setCards }: CardColumnProps) {
  return (
    <>
      {cards.map((card) => (
        <CardFactory key={card.id} card={card} />
      ))}
      <AddCardMenu cards={cards} setCards={setCards} />
    </>
  );
}
