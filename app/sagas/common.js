import { put, call } from 'redux-saga/effects';

export function* apiSaga(api, asyncAction, options) {
  yield put(asyncAction.request());
  try {
    const payload = options && options.apiPayload;
    const result = yield call(api, payload);
    yield put(asyncAction.success({ result }));
  } catch (error) {
    const failAction = asyncAction.fail({ error });
    yield call(errorHandler, failAction);
    yield put(failAction);
  }
}

const openModal = ({ action, error }) => {
  console.warn(error);
  console.warn(action);
};

function* errorHandler(failAction) {
  const error = failAction.payload.error;
  openModal({ action: failAction, error: error });
}