
import {TYPES} from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
     case TYPES.TITLE:
      return {
       name: action.payload
      }
     default:
      return state
    }
   }
   