import { useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import dynamic from 'next/dynamic';
import useOutsideClick from '@/hooks/useOutsideClick';
import { initYjs } from '@/libs/yjsInstance';
import { useY } from 'react-yjs';
import HtmlRenderer from './HtmlRenderer';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

const { ydoc } = initYjs();
const yText = ydoc.getText('quill');

export default function TextCard() {
  const [text, setText] = useState(`
  <h1 class="text-base font-semibold text-textPrimary">Complete your persona</h1>
  <p class="text-sm text-textSecondary">You could start by adding some demographic information, needs, frustrations, etc.</p>
`);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const yTextContent = useY(yText);

  useEffect(() => {
    isEditing && setText(yTextContent.toString());
  }, [isEditing, yTextContent]);

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor />
        ) : (
          <div className="text-sm text-textSecondary">
            <HtmlRenderer htmlString={text} />
          </div>
        )}
      </div>
    </Card>
  );
}
