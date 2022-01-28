import {
  UPDATE_CASES,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
  TOGGLE_CART
} from "./actions";


const initialState = {
    currentCase: {},
  	cases: [],
	  loggedIn: false,
  	user: {},
    cart: [],
    cartOpen: false,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CASES:
        return { ...state }, { cases: [...action.cases] };
   
    default:
      return state;
  }
};

export default reducer;
