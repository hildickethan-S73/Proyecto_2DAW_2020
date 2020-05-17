import {
  CLASS_GET_CURRENT, CLASS_GET_STUDENTS, CLASS_SEARCH_STUDENT, CLASS_INVITATIONS_CHANGE, STUDENT_UPDATE_GROWTH, STUDENT_UPDATE_ACTIVE
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CLASS_GET_CURRENT:
      return {
        ...state,
        class: action.payload[0]
      };
    
    case CLASS_GET_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
        activeStudent: action.payload.students[0] || {}
      };

    case CLASS_SEARCH_STUDENT:
      return {
        ...state,
        search: state.students.filter((s) => s.name.toLowerCase().includes(action.payload.target.value))
      };
    
    case CLASS_INVITATIONS_CHANGE:
      return {
        ...state,
        invitations: action.payload.target.value
      }

    case STUDENT_UPDATE_GROWTH:
      return {
        ...state,
        activeStudent: action.payload,
        students: state.students.map(s => [action.payload].find(o => o.id === s.id) || s)
      }
    
    case STUDENT_UPDATE_ACTIVE:
      return {
        ...state,
        activeStudent: state.students.filter((s) => s.id === action.payload)[0]
      }


    default:
      return state;
  }
};