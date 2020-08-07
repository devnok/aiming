/**
 *  Redux saga class init
 */
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { canvasTypes } from '../actions/types';
import { uploadVideoSaga, updateBoxSaga, fetchVideoSaga } from './canvasSaga';

export default function* watch() {
  yield takeLatest(canvasTypes.UPLOAD_VIDEO.INDEX, uploadVideoSaga);
  yield takeLatest(canvasTypes.UPLOAD_VIDEO.SUCCESS, updateBoxSaga);
  yield takeLatest(canvasTypes.UPDATE_BOX.SUCCESS, fetchVideoSaga);
}
