export default function(state={}, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return {...state, login: action.payload}
            
        case 'USER_AUTH': 
            return {...state, login: action.payload}

        case 'USER_POSTS': 
            return {...state, posts: action.payload}
        
        case 'GET_USERS': 
            return {...state, users: action.payload}
        
        case 'REGISTER_USER': 
            return {...state, users: action.payload.users, success: action.payload.success}
        
        default:
            return state;
    }   
}
