const INITIAL_STATE = {
    transcation : []
}

const checkOutReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CHECK_OUT' :
            return {
                ...state,
                transcation : action.payload
            }
        default :
            return state
    }
}

export default checkOutReducer