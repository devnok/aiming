/**
 *  Redux saga class init
 */
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { canvasTypes } from '../actions/types';
import {
  uploadVideoSaga,
  updateBoxSaga,
  fetchVideoDoneSaga,
  downloadVideoSaga,
} from './canvasSaga';

export default function* watch() {
  yield takeLatest(canvasTypes.UPLOAD_VIDEO.INDEX, uploadVideoSaga);
  yield takeLatest(canvasTypes.UPLOAD_VIDEO.SUCCESS, updateBoxSaga);
  yield takeLatest(canvasTypes.UPDATE_BOX.SUCCESS, fetchVideoDoneSaga);
  yield takeLatest(canvasTypes.FETCH_VIDEO_DONE.SUCCESS, downloadVideoSaga);
}
