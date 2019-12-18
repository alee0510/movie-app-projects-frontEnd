const INITIAL_STATE = {
    transcation : []
}

const checkOutReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CHECK_OUT' :
            return {
                transcation : action.payload
            }
        default :
            return INITIAL_STATE
    }
}

export default checkOutReducer