export const Movie = (data) => {
    return {
        type : 'MOVIE',
        payload : data
    }
}

export const selectMovie = (data) => {
    return {
        type : 'SELECT_MOVIE',
        payload : data
    }
}

export const checkOut = (data) => {
    return {
        type : 'CHECK_OUT',
        payload : data
    }
}