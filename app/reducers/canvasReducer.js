/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import { canvasTypes } from '../actions/types';

const initialState = {
  prev: [],
  current: {
    box: null,
  },
  next: [],
  isLoading: false,
  isChanged: false,
  screen: {
    width: 0,
    height: 0,
  },
};

export const canvasReducer = createReducer(initialState, {
  [canvasTypes.SELECT_BOX](state, action) {
    return {
      ...state,
      prev: [...state.prev, state.current],
      current: {
        box: {
          x1: action.payload.x1,
          y1: action.payload.y1,
          x2: action.payload.x2,
          y2: action.payload.y2,
        },
      },
      next: [],
      screen: action.payload.screen,
    };
  },
  [canvasTypes.ERASE_BOX](state) {
    return {
      ...state,
      prev: [...state.prev, state.current],
      current: {
        box: null,
      },
      next: [],
    };
  },
  [canvasTypes.UNDO](state) {
    if (state.prev.length) {
      return {
        ...state,
        prev: state.prev.slice(0, -1),
        current: state.prev[state.prev.length - 1],
        next: [state.current, ...state.next],
      };
    }
    return state;
  },
  [canvasTypes.REDO](state) {
    if (state.next.length) {
      return {
        ...state,
        prev: [...state.prev, state.current],
        current: state.next[0],
        next: state.next.slice(1),
      };
    }
    return state;
  },
  [canvasTypes.CLEAR](state) {
    return initialState;
  },
  [canvasTypes.UPLOAD_VIDEO.REQUEST](state, action) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [canvasTypes.UPLOAD_VIDEO.SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
    };
  },
  [canvasTypes.UPLOAD_VIDEO.FAIL](state, action) {
    return {
      ...state,
      isLoading: false,
    };
  },
  [canvasTypes.UPDATE_BOX.REQUEST](state, action) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [canvasTypes.UPDATE_BOX.SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
    };
  },
  [canvasTypes.UPDATE_BOX.FAIL](state, action) {
    return {
      ...state,
      isLoading: false,
    };
  },
  [canvasTypes.FETCH_VIDEO.REQUEST](state, action) {
    return {
      ...state,
      isLoading: true,
    };
  },
  [canvasTypes.FETCH_VIDEO.SUCCESS](state, action) {
    return {
      ...state,
      isLoading: false,
      file: action.payload.file,
    };
  },
  [canvasTypes.FETCH_VIDEO.FAIL](state, action) {
    return {
      ...state,
      isLoading: true,
    };
  },
});
