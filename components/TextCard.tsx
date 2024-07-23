import { useState, useRef, useMemo } from 'react';
import Card from './Card';
import dynamic from 'next/dynamic';
import useOutsideClick from '@/hooks/useOutsideClick';
import HtmlRenderer from './HtmlRenderer';
import { getYDoc } from '@/libs/yjs/yjsInstance';
import { convertDeltaToHtml } from '@/utils/conversions';
import { useY } from 'react-yjs';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

const initialCardDelta = [
  {
    insert: 'Complete your persona',
  },
  {
    insert: '\n',
    attributes: {
      header: 1,
    },
  },
  {
    insert: 'You could start by adding some demographic information, needs, frustrations, etc.',
  },
];

export default function TextCard() {
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const yText = getYDoc().getText('quill');

  const yTextLength = useY(yText).toString().length;

  const text = convertDeltaToHtml(yTextLength > 0 ? yText.toDelta() : initialCardDelta);

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor />
        ) : (
          <div className="text-sm text-textSecondary overflow-auto">
            <HtmlRenderer htmlString={text} />
          </div>
        )}
      </div>
    </Card>
  );
}
