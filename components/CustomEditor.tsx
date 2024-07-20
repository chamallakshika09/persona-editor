import { useEffect, useRef } from 'react';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { getProvider } from '@/libs/yjsInstance';
import * as Y from 'yjs';

Quill.register('modules/cursors', QuillCursors);

interface CustomEditorProps {
  xContent: Y.Text;
  setQuill: (quill: any) => void;
}

export default function CustomEditor({ xContent, setQuill }: CustomEditorProps) {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const provider = getProvider();

    if (editorContainerRef.current) {
      const quill = new Quill(editorContainerRef.current, {
        modules: {
          cursors: true,
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['clean'],
          ],
        },
        theme: 'snow',
      });

      const binding = new QuillBinding(xContent, quill, provider.awareness);

      setQuill(quill);

      return () => {
        binding.destroy();
        const toolbars = document.querySelectorAll('.ql-toolbar');
        toolbars.forEach((toolbar) => toolbar.remove());
      };
    }
  }, []);

  return <div id="editor" ref={editorContainerRef} />;
}
