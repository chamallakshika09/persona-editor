import { useState, useRef, memo } from 'react';
import Card from './Card';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ColumnType } from '@/types/ui';
import HtmlRenderer from './HtmlRenderer';
import { yGetCardsForColumn } from '@/libs/yjs/yjsInstance';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { convertDeltaToHtml } from '@/utils/conversions';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

interface TextCardProps {
  cardId: string;
  column: ColumnType;
}

function TextCard({ cardId, column }: TextCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const cards = yGetCardsForColumn(column).toArray();

  const cardIndex = cards.findIndex((c) => c.get('id') === cardId);

  const content = cards[cardIndex].get('content');

  const text = convertDeltaToHtml(content.toDelta());

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor initialContent={content} />
        ) : (
          <div className="text-sm text-textSecondary overflow-auto">
            <HtmlRenderer htmlString={text} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default memo(TextCard);
