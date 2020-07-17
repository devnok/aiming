export const keyMirror = function (prefix, obj) {
  prefix = prefix || '';
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = prefix + key;
    }
  }
  return ret;
};

export function makeActionCreator(actionType) {
  return payload => ({ type: actionType, payload });
}

export function makeAsyncActions(actionName) {
  const prefix = actionName;
  return keyMirror(prefix + '_', {
    INDEX: null,
    REQUEST: null,
    SUCCESS: null,
    FAIL: null,
  });
}

export function makeAsyncActionCreator(actions) {
  let actionCreator = makeActionCreator(actions.INDEX);
  actionCreator.request = makeActionCreator(actions.REQUEST);
  actionCreator.success = makeActionCreator(actions.SUCCESS);
  actionCreator.fail = makeActionCreator(actions.FAIL);
  return actionCreator;
}
