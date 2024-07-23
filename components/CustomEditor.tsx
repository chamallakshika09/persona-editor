import { useEffect, useRef } from 'react';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { getProvider } from '@/libs/yjs/yjsInstance';
import * as Y from 'yjs';

Quill.register('modules/cursors', QuillCursors);

interface CustomEditorProps {
  initialContent: Y.Text;
}

export default function CustomEditor({ initialContent }: CustomEditorProps) {
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

      quill.setContents(initialContent.toDelta(), 'silent');

      const binding = new QuillBinding(initialContent, quill, provider.awareness);

      return () => {
        binding.destroy();
        const toolbars = document.querySelectorAll('.ql-toolbar');
        toolbars.forEach((toolbar) => toolbar.remove());
      };
    }
  }, []);

  return <div id="editor" ref={editorContainerRef} />;
}
