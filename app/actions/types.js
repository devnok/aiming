import { makeAsyncActions } from './utils';

export const canvasTypes = {
  SELECT_BOX: 'canvas/SELECT_BOX',
  ERASE_BOX: 'canvas/ERASE_BOX',
  UNDO: 'canvas/UNDO',
  REDO: 'canvas/REDO',
  CLEAR: 'canvas/CLEAR',
  UPLOAD_VIDEO: makeAsyncActions('canvas/UPLOAD_VIDEO'),
  UPDATE_BOX: makeAsyncActions('canvas/UPDATE_BOX'),
  FETCH_VIDEO: makeAsyncActions('canvas/FETCH_VIDEO'),
};
