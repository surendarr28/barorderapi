import { TYPES } from './actionTypes';

export const MrriageTimer = () => dispatch => {
    dispatch({
        type: TYPES.MARRAGE_TIMER,
        payload: {
            date: 5,
            month: 6,
            year: 2017,
            slogan:"Two heart's united on"
        }
    })
}
export const BirthTimer = () => dispatch => {
    dispatch({
        type: TYPES.BIRTH_TIMER,
        payload: {
            date: 25,
            month: 3,
            year: 2018,
            slogan:"Princess Entered"
        }
    })
}

export const BirthInitTimer = () => dispatch => {
    dispatch({
        type: TYPES.BIRTH_INIT_TIMER,
        payload: {
            date: 23,
            month: 6,
            year: 2017,
            slogan: "Soul Formed"
        }
    })
}