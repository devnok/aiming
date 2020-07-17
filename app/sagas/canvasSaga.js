import { apiSaga } from './common';
import { uploadVideo, updateBox, fetchVideo } from '../actions/CanvasActions';
import * as InPaintAPI from '../api/InPaintAPI';
import { call } from 'redux-saga/effects';

export function* uploadVideoSaga(action) {
  yield call(apiSaga, InPaintAPI.uploadVideo, uploadVideo, {
    apiPayload: action.payload,
  });
}

export function* updateBoxSaga(action) {
  yield call(apiSaga, InPaintAPI.updateBox, updateBox, {
    apiPayload: action.payload,
  });
}

export function* fetchVideoSaga(action) {
  yield call(apiSaga, InPaintAPI.fetchVideo, fetchVideo, {
    apiPayload: action.payload,
  });
}
