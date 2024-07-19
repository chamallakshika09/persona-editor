'use client';

import { useState, useRef, useCallback, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import CustomEditor from './CustomEditor';
import useOutsideClick from '@/hooks/useOutsideClick';
import { CardData, ColumnType } from '@/types/ui';
import HtmlRenderer from './HtmlRenderer';
import { usePersona } from '@/contexts/PersonaContext';

interface TextCardProps {
  card: CardData;
  column: ColumnType;
}

function TextCard({ card, column }: TextCardProps) {
  console.log('TextCard');

  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const { setLeftColumnCards, setRightColumnCards } = usePersona();

  const updateCardContent = useCallback(
    (content: string) => {
      const id = card.id;
      if (column === 'left') {
        setLeftColumnCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, content } : card)));
      } else {
        setRightColumnCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, content } : card)));
      }
    },
    [card, column, setLeftColumnCards, setRightColumnCards]
  );

  const handleTextChange = (value: string) => {
    updateCardContent(value);
  };

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor text={card.content} handleTextChange={handleTextChange} />
        ) : (
          <div className="text-sm text-textSecondary">
            <HtmlRenderer htmlString={card.content} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default memo(TextCard);
