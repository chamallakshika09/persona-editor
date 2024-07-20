import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface CustomEditorProps {
  text: string;
  handleTextChange: (text: string) => void;
}

export default function CustomEditor({ text, handleTextChange }: CustomEditorProps) {
  return (
    <>
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link'],
            ['clean'],
          ],
        }}
        formats={[
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'header',
          'size',
          'list',
          'bullet',
          'color',
          'background',
          'link',
          'clean',
        ]}
      />
    </>
  );
}
