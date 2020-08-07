import { apiSaga } from './common';
import { uploadVideo, updateBox, fetchVideo } from '../actions/CanvasActions';
import * as InPaintAPI from '../api/InPaintAPI';
import { call, select } from 'redux-saga/effects';

export function* uploadVideoSaga(action) {
  yield call(apiSaga, InPaintAPI.uploadVideo, uploadVideo, {
    apiPayload: action.payload,
  });
}
const boxToVideoSize = ({ box, screen, size }) => {
  const scale = size.width / screen.width;
  const h = size.height / scale;
  const ys = (screen.height - h) / 2;
  const x1 = Math.min(Math.max(box.x1, 0), screen.width) * scale;
  const y1 = (Math.min(Math.max(box.y1, ys), ys + h) - ys) * scale;
  const x2 = Math.min(Math.max(box.x2, 0), screen.width) * scale;
  const y2 = (Math.min(Math.max(box.y2, ys), ys + h) - ys) * scale;
  console.log(scale, h, ys, x1, y1, x2, y2);
  return {
    x: parseInt(Math.min(x1, x2), 10),
    y: parseInt(Math.min(y1, y2), 10),
    w: parseInt(Math.abs(x1 - x2), 10),
    h: parseInt(Math.abs(y1 - y2), 10),
  };
};

export function* updateBoxSaga(action) {
  const box = yield select(state => state.canvasReducer.current.box);
  const screen = yield select(state => state.canvasReducer.screen);
  if (!box || !screen) {
    return;
  }
  const payload = {
    ...boxToVideoSize({ box, screen, size: action.payload.size }),
    filename: action.payload.name,
  };
  console.log(payload);
  yield call(apiSaga, InPaintAPI.updateBox, updateBox, {
    apiPayload: payload,
  });
}

export function* fetchVideoSaga(action) {
  const filename = action.payload.filename;
  yield call(
    apiSaga,
    InPaintAPI.fetchVideo,
    fetchVideo,
    {
      apiPayload: action.payload,
    },
    true,
  );
}
