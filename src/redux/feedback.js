import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = [], action) => {
  switch (action.type) {
    
    case ActionTypes.ADD_FEEDBACK:
        var feedback = action.payload;
      
        return state.concat(feedback);

    default:
      return state;
  }
};