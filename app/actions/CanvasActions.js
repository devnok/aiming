/*
 * Reducer actions related with login
 */
import { makeActionCreator, makeAsyncActionCreator } from './utils';
import { canvasTypes } from './types';

export const selectBox = makeActionCreator(canvasTypes.SELECT_BOX);
export const eraseBox = makeActionCreator(canvasTypes.ERASE_BOX);
export const uploadVideo = makeAsyncActionCreator(canvasTypes.UPLOAD_VIDEO);
export const updateBox = makeAsyncActionCreator(canvasTypes.UPDATE_BOX);
export const fetchVideo = makeAsyncActionCreator(canvasTypes.FETCH_VIDEO);
export const fetchVideoDone = makeAsyncActionCreator(canvasTypes.FETCH_VIDEO_DONE);
export const stopFetchVideo = makeActionCreator(canvasTypes.STOP_FETCH_VIDEO);
export const setLoading = makeActionCreator(canvasTypes.SET_LOADING);
export const setSource = makeActionCreator(canvasTypes.SET_SOURCE);
export const undo = makeActionCreator(canvasTypes.UNDO);
export const redo = makeActionCreator(canvasTypes.REDO);
export const clear = makeActionCreator(canvasTypes.CLEAR);
