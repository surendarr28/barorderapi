import { combineReducers } from 'redux';
import title from './titleReducer';
import timer from './timerReducer';
export default combineReducers({
    title,
    timer
});