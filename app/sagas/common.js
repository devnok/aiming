import { put, call, delay } from 'redux-saga/effects';

export function* apiSaga(api, asyncAction, options, loop = false) {
  let success = false;
  do {
    yield put(asyncAction.request());
    try {
      const payload = options && options.apiPayload;
      const result = yield call(api, payload);
      yield put(asyncAction.success({ result, ...payload }));
      console.log(result);
      success = true;
    } catch (error) {
      const failAction = asyncAction.fail({ error });
      yield call(errorHandler, failAction);
      yield put(failAction);
    }
    yield delay(5000);
  } while (loop && !success);
}

const openModal = ({ action, error }) => {
  // console.warn(error);
  // console.warn(action);
};

function* errorHandler(failAction) {
  const error = failAction.payload.error;
  openModal({ action: failAction, error: error });
}
