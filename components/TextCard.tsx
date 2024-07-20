'use client';

import { useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Card from './Card';
import dynamic from 'next/dynamic';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import useOutsideClick from '@/hooks/useOutsideClick';
import { initYjs } from '@/libs/yjsInstance';
import { useY } from 'react-yjs';

const CustomEditor = dynamic(() => import('./CustomEditor'), { ssr: false });

const elementClassMapping: { [key: string]: string } = {
  h1: 'text-2xl font-bold text-textPrimary',
  h2: 'text-xl font-bold text-textPrimary',
  p: 'text-sm text-textSecondary',
  ul: 'list-disc mb-4 ml-6',
  ol: 'list-decimal mb-4 ml-6',
  strong: 'font-bold',
  em: 'italic',
  u: 'underline',
  blockquote: 'mb-4 pl-4 border-l-4 border-gray-300',
};

function renderHtmlToElements(htmlString: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if ((domNode as Element).type === 'tag' && elementClassMapping[(domNode as Element).name]) {
        const Tag = (domNode as Element).name as keyof JSX.IntrinsicElements;
        return (
          <Tag className={elementClassMapping[(domNode as Element).name]}>
            {domToReact((domNode as Element).children as DOMNode[], options)}
          </Tag>
        );
      }
    },
  };

  return parse(htmlString, options);
}

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
        {isEditing ? <CustomEditor /> : <div className="text-sm text-textSecondary">{renderHtmlToElements(text)}</div>}
      </div>
    </Card>
  );
}
