import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// const CustomToolbar = () => (
//   <div id="toolbar">
//     <select className="ql-header" defaultValue={''} onChange={(e) => e.persist()}>
//       <option value="1">Heading 1</option>
//       <option value="2">Heading 2</option>
//       <option value="">Normal</option>
//     </select>
//     <button className="ql-bold" />
//     <button className="ql-italic" />
//     <button className="ql-underline" />
//     <button className="ql-strike" />
//     <button className="ql-list" value="ordered" />
//     <button className="ql-list" value="bullet" />
//     <button className="ql-align" />
//     <button className="ql-link" />
//     <button className="ql-clean" />
//   </div>
// );

export default function CustomEditor({
  text,
  handleTextChange,
}: {
  text: string;
  handleTextChange: (text: string) => void;
}) {
  return (
    <>
      {/* <CustomToolbar /> */}
      <ReactQuill
        value={text}
        onChange={handleTextChange}
        // modules={{
        //   toolbar: {
        //     container: '#toolbar',
        //   },
        // }}
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }],
            [{ size: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'size',
          'font',
          'list',
          'bullet',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'align',
          'link',
        ]}
      />
    </>
  );
}
