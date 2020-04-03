import {
    ASYNC_START,
    ASYNC_END
} from '../constants/actionTypes';

const defaultState = {
  appName: 'Redux',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
      case ASYNC_START:
        return {
          ...state,
          inProgress: true
        };
      case ASYNC_END:
        return {
          ...state,
          inProgress: false
        };
      default:
        return state;
    }
};