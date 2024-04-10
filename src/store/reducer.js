import React from "react";
import * as actionsName from './action';
const initilaizeState = {
    employee: null,
    user:null,
    // need to be null
    // load: false,

    roles: []
}


const reducer = (state = initilaizeState, action) => {
    switch (action.type) {
        case actionsName.SET_EMPLOYEE:
            {
                console.log(action.employee);
                return {
                    ...state,
                    employee: action.employee,
                }
                break;
            }
            case actionsName.SET_USERNAME:
                {
                    console.log(action.user);
                    return {
                        ...state,
                        user: action.user,
                    }
                    break;
                }
        case actionsName.SET_ROLES:
            return {
                ...state,
                roles: [...state.roles, ...action.roles]
                 // הוספת התפקידים שנשלחו לתוך המערך הקיים של התפקידים
            };
            
        case actionsName.LOAD:
            {

                return {
                    ...state,
                    load: true,

                }
                break;
            }

        case actionsName.EDIT_EMPLOYEE:
            {
                const users = [...state.users]
                const findIndex = users.findIndex(x => x.id === action.userObj.id)
                users[findIndex] = action.userObj;
                return { ...state, users }
                break;
            }

        // case actionsName.DELETE_USER:
        //     {
        //         const users = state.users.filter(x => x.id !== action.userId)
        //         return { ...state, users }
        //         break;
        //     }
        default:

            return { ...state }
            break;
    }
}
export default reducer;
