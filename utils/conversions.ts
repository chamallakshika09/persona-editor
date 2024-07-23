import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

export const convertDeltaToHtml = (delta: any) => {
  const converter = new QuillDeltaToHtmlConverter(delta, {});
  return converter.convert();
};
