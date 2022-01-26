import React from "react";
import { createStore } from "redux";
const UPDATE_CASES = "UPDATE_CASES";
const initialState = {
	currentCase: {},
	cases: [],
	loggedIn: false,
	user: {},
};
const missingoneReducer = (state = { ...initialState }, action) => {
  switch(action.type){
    case UPDATE_CASES:
  }
};

const store = createStore(missingoneReducer);

export default store;
