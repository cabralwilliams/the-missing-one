import { FaAcquisitionsIncorporated } from "react-icons/fa";
import {
	UPDATE_CASES,
	UPDATE_CASE_FILTER,
	UPDATE_CURRENT_CASE,
	LOGIN_USER,
	LOGOUT_USER,
	LOAD_NEXT_PAGE,
} from "./actions";

const initialState = {
	currentCase: {},
	cases: [],
	loggedIn: false,
	user: {},
	cart: [],
	caseFilter: {},
	page: 0,
	perPage: 5,
	displayCases: [],
	totalPages: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CASES:
			const { page: prevPage, perPage } = state;
			//		console.log("prevPage " + prevPage + " perPage = " + perPage);
			// const totalPages = action.cases.length % perPage;
			let dc = [];
			let displayCases1 = [];
			let i = 0;
			let totalPages1 = 0;
			while (i < action.cases.length) {
				dc.push(action.cases[i]);
				i++;
				if (i % perPage == 0) {
					displayCases1.push(dc);
					dc = [];
					totalPages1++;
					//			console.log("increment page " + dc);
				}

				//		console.log("displayCases");
				//		console.log(displayCases1);
				//		console.log(totalPages1);
			}
			if (dc.length > 0) {
				displayCases1.push(dc);
			}

			//		console.log("total pages " + totalPages1);
			return {
				...state,
				totalPages: totalPages1,
				displayCases: [...displayCases1],
				cases: [...action.cases],
			};

		case UPDATE_CASE_FILTER:
			//		console.log(action.caseFilter);
			return { ...state, caseFilter: { ...action.caseFilter } };

		case UPDATE_CURRENT_CASE:
			return { ...state, currentCase: { ...action.currentCase } };

		case LOGIN_USER:
			return { ...state, loggedIn: true, user: { ...action.user } };

		case LOGOUT_USER:
			return { ...state, loggedIn: true, user: {} };

		case LOAD_NEXT_PAGE:
			//		console.log("next page " + action.nextPage);
			return { ...state, page: action.nextPage };

		default:
			return state;
	}
};

export default reducer;
