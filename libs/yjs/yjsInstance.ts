import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

let ydoc: Y.Doc | null = null;
let provider: WebrtcProvider | null = null;

export const initializeYjs = (onInitialized: () => void) => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider('persona-editor', ydoc);
  }

  onInitialized();

  return ydoc;
};

export const getYDoc = () => {
  if (!ydoc) {
    throw new Error('YDoc is not initialized');
  }
  return ydoc;
};

export const getProvider = () => {
  if (!provider) {
    throw new Error('Provider is not initialized');
  }
  return provider;
};
