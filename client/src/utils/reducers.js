import { UPDATE_CASES, UPDATE_CASE_FILTER } from "./actions";

const initialState = {
	currentCase: {},
	cases: [],
	loggedIn: false,
	user: {},
	cart: [],
	caseFilter: {},
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CASES:
			return { ...state, cases: [...action.cases] };

		case UPDATE_CASE_FILTER:
			console.log(action.caseFilter);
			return { ...state, caseFilter: { ...action.caseFilter } };

		default:
			return state;
	}
};

export default reducer;
