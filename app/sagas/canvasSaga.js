import { apiSaga } from './common';
import { uploadVideo, updateBox, fetchVideo, stopFetchVideo, fetchVideoDone, setSource } from '../actions/CanvasActions';
import * as InPaintAPI from '../api/InPaintAPI';
import { call, select, take, fork, cancel, put } from 'redux-saga/effects';
import RNBackgroundDownloader, { Priority } from 'react-native-background-downloader';
import { canvasTypes } from '../actions/types';
import { eventChannel } from 'redux-saga';

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

export function* bgFetchVideoSaga(action) {
  yield call(
    apiSaga,
    InPaintAPI.fetchVideoDone,
    fetchVideoDone,
    {
      apiPayload: action.payload,
    },
    true,
  );
}

export function* fetchVideoDoneSaga(action) {
  const bgSyncTask = yield fork(bgFetchVideoSaga, action);

  yield take(canvasTypes.STOP_FETCH_VIDEO);

  console.log('fetch stopped');
  yield cancel(bgSyncTask);
}
function* downloadVideo(uri) {

}
function createDownloadChannel(task, uri) {
  return eventChannel(emit => {
    task
      .begin(expectedBytes => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        emit(uri);
      })
      .error(err => {
        emit(new Error(err?.message));
      });
    return () => {
      task.stop();
    };
  });
}
export function* downloadVideoSaga(action) {
  const { filename } = action.payload;
  const uri = `${RNBackgroundDownloader.directories.documents}/${filename}`;
  const task = RNBackgroundDownloader.download({
    id: filename,
    url: 'http://c3.iptime.org:1486/output/' + filename,
    priority: Priority.HIGH,
    destination: uri,
  });
  const downloadChannel = yield call(createDownloadChannel, task, uri);
  while (true) {
    try {
      const payload = yield take(downloadChannel);
      yield put(setSource(payload));
    } catch (err) {
      console.err('download error:', err);
    }
  }
}
