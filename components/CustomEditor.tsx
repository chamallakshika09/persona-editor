import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import { initYjs } from '@/libs/yjsInstance';
import QuillCursors from 'quill-cursors';

Quill.register('modules/cursors', QuillCursors);

export default function CustomEditor() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const { ydoc, provider } = initYjs();
    const yText = ydoc.getText('quill');

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

      const binding = new QuillBinding(yText, quill, provider.awareness);

      return () => {
        binding.destroy();
        const toolbars = document.querySelectorAll('.ql-toolbar');
        toolbars.forEach((toolbar) => toolbar.remove());
      };
    }
  }, []);

  return <div id="editor" ref={editorContainerRef} />;
}
