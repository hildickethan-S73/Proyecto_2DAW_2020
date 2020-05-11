import {
    AUTH_REGISTER, AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHANGE, AUTH_LOAD_NEWUSER, AUTH_LOAD_NEWUSER_REGISTER, AUTH_CHANGE_REGISTER, CLASS_GET_CLASSES
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case AUTH_REGISTER:
            return {
                ...state,
                user: action.payload
            }
        case AUTH_LOGIN:
            if (action.payload.error !== undefined) {
                console.error(action.payload.error);
                
                return {
                    ...state,
                    user: {},
                    error: action.payload.error
                }
            }
            return {
                user: action.payload
            }
        case AUTH_LOGOUT:
            if (action.payload.error !== undefined) {
                console.error(action.payload.error)
                return {
                    ...state,
                    error: action.payload.error
                }
            }
            return {
                user: {}
            }
        case AUTH_CHANGE:
            return {
                ...state,
                newuser: {
                    ...action.payload.newuser,
                    [action.payload.target.name]: action.payload.target.value
                }
            }

        case AUTH_CHANGE_REGISTER:
            return {
                ...state,
                new_user_register: {
                    ...action.payload.new_user_register,
                    [action.payload.target.name]: action.payload.target.value
                }
            }
            
        case AUTH_LOAD_NEWUSER:
            return {
                ...state,
                newuser: {
                    type: "student"
                }
            }
        
        case AUTH_LOAD_NEWUSER_REGISTER:
            return {
                ...state,
                new_user_register: {}
            }
        
        case CLASS_GET_CLASSES:
            if (action.payload.error !== undefined) {
                console.error(action.payload.error);
                
                return {
                    ...state,
                    classes: {},
                    error: action.payload.error
                }
            }
            return {
                ...state,
                classes: action.payload.classes,
                user: {
                    ...state.user,
                    token: action.payload.token
                }
            };

        default:
            return state;
    }
}