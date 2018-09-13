
import { TYPES } from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case TYPES.MARRAGE_TIMER:
            return { ...state, "mirrage": action.payload };
        case TYPES.BIRTH_INIT_TIMER:
            return { ...state, "birthinit": action.payload };
        case TYPES.BIRTH_TIMER:
            return { ...state, "birth": action.payload };
        default:
            return state
    }
}
