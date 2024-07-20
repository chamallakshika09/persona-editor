'use client';

import { useState, useRef, memo } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import CustomEditor from './CustomEditor';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ColumnCardData, ColumnType } from '@/types/ui';
import HtmlRenderer from './HtmlRenderer';
import { useY } from 'react-yjs';
import { yGetCardsForColumn } from '@/libs/yjsInstance';

interface TextCardProps {
  card: ColumnCardData;
  column: ColumnType;
}

function TextCard({ card, column }: TextCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const cards = yGetCardsForColumn(column).toArray();

  const cardIndex = cards.findIndex((c) => c.get('id') === card.id);

  const xContent = cards[cardIndex].get('content');

  const displayContent = useY(cards[cardIndex].get('content'));

  const handleTextChange = (value: string) => {
    xContent.delete(0, displayContent.length);
    xContent.insert(0, value);
  };

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor text={displayContent.toString()} handleTextChange={handleTextChange} />
        ) : (
          <div className="text-sm text-textSecondary">
            <HtmlRenderer htmlString={displayContent.toString()} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default memo(TextCard);
