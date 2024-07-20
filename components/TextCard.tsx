'use client';

import { useState, useRef } from 'react';
import Card from './Card';
import CustomEditor from './CustomEditor';

import useOutsideClick from '@/hooks/useOutsideClick';
import HtmlRenderer from './HtmlRenderer';

export default function TextCard() {
  const [text, setText] = useState(
    '<h1 class="text-base font-semibold text-textPrimary">Complete your persona</h1>' +
      '<p class="text-sm text-textSecondary">You could start by adding some demographic information, needs, frustrations, etc.</p>'
  );
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  useOutsideClick(editorRef, () => setIsEditing(false));

  return (
    <Card height="h-auto" border={isEditing}>
      <div className="flex flex-col p-3 justify-center" onClick={() => setIsEditing(true)} ref={editorRef}>
        {isEditing ? (
          <CustomEditor text={text} handleTextChange={handleTextChange} />
        ) : (
          <div className="text-sm text-textSecondary">
            <HtmlRenderer htmlString={text} />
          </div>
        )}
      </div>
    </Card>
  );
}
