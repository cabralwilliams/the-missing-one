import {
  UPDATE_CASES,
} from "./actions";


const initialState = {
    currentCase: {},
  	cases: [],
	  loggedIn: false,
  	user: {},
    cart: [],
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CASES:
      return { ...state }, { cases: [...action.cases] ,};
   
    default:
      return state;
  }
};

export default reducer;
