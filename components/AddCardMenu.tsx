import AddCardIcon from '@/assets/icons/AddCard.icon';
import ArrowDownIcon from '@/assets/icons/ArrowDown.icon';
import ImageCardIcon from '@/assets/icons/ImageCard.icon';
import TextCardIcon from '@/assets/icons/TextCard.icon';
import useOutsideClick from '@/hooks/useOutsideClick';
import { yAddCard } from '@/libs/yjs/yjsInstance';
import { CardType, ColumnType } from '@/types/ui';
import { getNewCard } from '@/utils/cards';
import { memo, useRef, useState } from 'react';

interface AddCardMenuProps {
  column: ColumnType;
}

function AddCardMenu({ column }: AddCardMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openButtonRef = useRef<HTMLDivElement>(null);

  useOutsideClick(openButtonRef, () => setIsMenuOpen(false));

  const addCard = (type: CardType) => {
    yAddCard(column, getNewCard(type));
  };

  return (
    <div className="relative group" ref={openButtonRef}>
      <div className="flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity border-t-2 border-[#222ADD]">
        <div className="flex flex-row text-white justify-center items-center">
          <div className="bg-[#222ADD] flex flex-row items-center justify-center text-white font-semibold py-2 px-4 rounded-bl-lg">
            <AddCardIcon />
            Add Card
          </div>
          <button
            className="bg-[#00256E] border-l border-white px-3 py-2 rounded-br-lg"
            onClick={() => setIsMenuOpen(true)}
          >
            <ArrowDownIcon />
          </button>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col gap-2 bg-white p-2 rounded-md border border-[#E6E6E6] w-full mt-1">
            <button onClick={() => addCard('text')} className="flex flex-row gap-2 p-3">
              <TextCardIcon />
              Text
            </button>
            <button onClick={() => addCard('image')} className="flex flex-row gap-2 p-3">
              <ImageCardIcon />
              Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AddCardMenu);
