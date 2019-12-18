export const Movie = (data) => {
    return {
        type : 'MOVIE',
        payload : data
    }
}

export const checkOut = (data) => {
    return {
        type : 'CHECK_OUT',
        payload : data
    }
}

export const storeBanner = (data) => {
    return {
        type : 'STORE_BANNER',
        payload : data
    }
}