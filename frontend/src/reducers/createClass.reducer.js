import { CREATECLASS_CREATE, CREATECLASS_CHANGE, CREATECLASS_LOAD_NEWCLASS, CLASS_UNLOAD_NEWCLASS } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch(action.type) {
      case CREATECLASS_CREATE:
          if (action.payload.error !== undefined) {
              console.error(action.payload.error);
              
              return {
                  ...state,
                  class: {},
                  error: action.payload.error
              }
          }
          return {
            class: action.payload
          }
      case CREATECLASS_CHANGE:
          return {
              ...state,
              newClass: {
                  ...action.payload.newClass,
                  [action.payload.target.name]: action.payload.target.value
              }
          }
      case CREATECLASS_LOAD_NEWCLASS:
          return {
              ...state,
              newClass: {}
          }
      case CLASS_UNLOAD_NEWCLASS:
        return {}
      default:
          return state;
  }
}