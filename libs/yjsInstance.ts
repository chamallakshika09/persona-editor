import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('persona-editor', ydoc);

export { ydoc, provider };
