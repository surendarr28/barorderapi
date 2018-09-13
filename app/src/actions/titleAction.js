import {TYPES, TYPESs} from './actionTypes';

export const titleAction = () => dispatch => {
    dispatch({
        type: TYPES.TITLE,
        payload: 'Kashvi Sri'
    })
}
export const title2Action = () => dispatch => {
    dispatch({
        type: TYPES.TITLE,
        payload: 'Kashvi Sri. S'
    })
}