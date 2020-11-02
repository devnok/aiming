import { makeAsyncActions } from './utils';

export const canvasTypes = {
  SELECT_BOX: 'canvas/SELECT_BOX',
  ERASE_BOX: 'canvas/ERASE_BOX',
  UNDO: 'canvas/UNDO',
  REDO: 'canvas/REDO',
  CLEAR: 'canvas/CLEAR',
  SET_LOADING: 'canvas/SET_LOADING',
  SET_SOURCE: 'canvas/SET_SOURCE',
  UPLOAD_VIDEO: makeAsyncActions('canvas/UPLOAD_VIDEO'),
  UPDATE_BOX: makeAsyncActions('canvas/UPDATE_BOX'),
  STOP_FETCH_VIDEO: 'canvas/STOP_FETCH_VIDEO',
  FETCH_VIDEO: makeAsyncActions('canvas/FETCH_VIDEO'),
  FETCH_VIDEO_DONE: makeAsyncActions('canvas/FETCH_VIDEO_DONE'),
};
