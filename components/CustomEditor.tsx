import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import { getProvider, getYDoc } from '@/libs/yjs/yjsInstance';

Quill.register('modules/cursors', QuillCursors);

export default function CustomEditor() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const yText = getYDoc().getText('quill');

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

      quill.setContents(yText.toDelta(), 'silent');

      const binding = new QuillBinding(yText, quill, getProvider().awareness);

      return () => {
        binding.destroy();
        const toolbars = document.querySelectorAll('.ql-toolbar');
        toolbars.forEach((toolbar) => toolbar.remove());
      };
    }
  }, []);

  return <div id="editor" ref={editorContainerRef} />;
}
