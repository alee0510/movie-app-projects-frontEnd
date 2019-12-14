const INITIAL_STATE = {
    username : '',
    pass : '',
    email : '',
    role : '',
    avatar : '',
    cart : ''
}

const logReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'LOG_IN' :
            return {
                ...state,
                username : action.payload.username,
                pass : action.payload.pass,
                email : action.payload.email,
                role : action.payload.role,
                avatar : action.payload.avatar,
                cart : action.payload.cart
            }
        case 'LOG_OUT' :
            return INITIAL_STATE
        default :
            return state
    }
}

export default logReducer