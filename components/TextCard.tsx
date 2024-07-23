import { useState, useRef, memo, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ColumnType } from '@/types/ui';
import HtmlRenderer from './HtmlRenderer';
import { useY } from 'react-yjs';
import { yGetCardsForColumn } from '@/libs/yjs/yjsInstance';
import dynamic from 'next/dynamic';
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

  const xContent = cards[cardIndex].get('content');

  const displayContent = useY(xContent);

  const [text, setText] = useState<string>(displayContent.toString());
  const [quill, setQuill] = useState<any>(null);

  useEffect(() => {
    if (quill && !isEditing) {
      setText(quill.root.innerHTML);
    }
  }, [isEditing, quill]);

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor xContent={xContent} setQuill={setQuill} />
        ) : (
          <div className="text-sm text-textSecondary">
            <HtmlRenderer htmlString={text} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default memo(TextCard);
