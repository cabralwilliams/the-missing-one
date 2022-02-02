// import React
import React, { useEffect } from "react";

//Import the CaseList - a list of Card-like displays composed of the SimpleCase component
import CaseList from "../components/CaseList";

//Import useSelector and useDispatch to use if user is logged in
import { useSelector, useDispatch } from "react-redux";

//Import useQuery to see if user is logged in
import { useQuery } from "@apollo/client";

//Import QUERY_ME
import { QUERY_ME } from "../utils/queries";
import { LOAD_NEXT_PAGE } from "../utils/actions";

const photoUrl = "https://missingone.s3.amazonaws.com/0.jpg";
const photoUrl1 = "https://missingone.s3.amazonaws.com/1.jpg";
const photoUrl2 = "https://missingone.s3.amazonaws.com/2.jpg";
const photoUrl3 = "https://missingone.s3.amazonaws.com/3.jpg";
const photoUrl4 = "https://missingone.s3.amazonaws.com/4.jpg";
const photoUrl5 = "https://missingone.s3.amazonaws.com/5.jpg";

const Home = () => {
	console.log("Home component");
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
	console.log(`User: ${JSON.stringify(state.user)}`);

	//Query for a user
	const { data, loading } = useQuery(QUERY_ME);
	const user = data?.me || {};
	const prevPage = state.page;
	const totalPages = state.totalPages;
	// useEffect(() => {

	// 	if(user._id) {
	// 		dispatch({
	// 			type: LOGIN_USER,
	// 			user
	// 		});
	// 	}
	// }, [user, dispatch]);
	// function loadMore() {
	// 	let nextPage = prevPage + 1;
	// 	if (prevPage >= totalPages) nextPage = 0;
	// 	dispatch({
	// 		type: LOAD_NEXT_PAGE,
	// 		nextPage: nextPage,
	// 	});
	// }

	return (
		<main>
			<CaseList />
			{/* {state.totalPages && (
				<button
					className="btn btn-light btn-block w-50 mx-auto"
					onClick={(e) => {
						loadMore();
					}}
				></button>
			)} */}
		</main>
	);
};
export default Home;
