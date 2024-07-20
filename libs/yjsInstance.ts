import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

let ydoc: Y.Doc;
let provider: WebrtcProvider;

export const initYjs = () => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider('quill-demo-xxxx', ydoc);
  }

  return { ydoc, provider };
};
