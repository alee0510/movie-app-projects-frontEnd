const INITIAL_STATE = {
    banner : []
}

const banerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'STORE_BANNER' :
            return {
                banner : action.payload
            }
        default :
            return INITIAL_STATE
    }
}

export default banerReducer