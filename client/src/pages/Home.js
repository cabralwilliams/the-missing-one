// import React
import { React, useEffect } from "react";

//Import the CaseList - a list of Card-like displays composed of the SimpleCase component
import CaseList from "../components/CaseList";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { LOGIN_USER } from "../utils/actions";
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

	//Store user under Global state.
	useEffect(() => {
		if (user._id) {
			dispatch({
				type: LOGIN_USER,
				user,
			});
		}
	}, [user, dispatch]);
	return (
		<main>
			<CaseList />
		</main>
	);
};
export default Home;
