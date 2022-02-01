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
import { LOGIN_USER } from "../utils/actions";

const photoUrl = "https://missingone.s3.amazonaws.com/0.jpg";
const photoUrl1 = "https://missingone.s3.amazonaws.com/1.jpg";
const photoUrl2 = "https://missingone.s3.amazonaws.com/2.jpg";
const photoUrl3 = "https://missingone.s3.amazonaws.com/3.jpg";
const photoUrl4 = "https://missingone.s3.amazonaws.com/4.jpg";
const photoUrl5 = "https://missingone.s3.amazonaws.com/5.jpg";

const Home = () => {
	console.log("Home component");
	const state = useSelector(state => state );
	const dispatch = useDispatch();
	console.log(`User: ${JSON.stringify(state.user)}`);

	//Query for a user
	const { data, loading } = useQuery(QUERY_ME);
	const user = data?.me || {};

	useEffect(() => {
		
		if(user._id) {
			dispatch({
				type: LOGIN_USER,
				user
			});
		}
	}, [user, dispatch]);
	
	return (
		<main>
			<CaseList />
			{/* <section className="jumbotron text-center">
				<div className="container">
					<h1 className="jumbotron-heading">Missing People</h1>
					<p className="lead text-muted">
						Something short and leading about the collection below—its contents,
						the creator, etc. Make it short and sweet, but not too short so
						folks don't simply skip over it entirely.
					</p>
					<p>
						<a href="#" className="btn btn-primary my-2">
							Main call to action
						</a>
						<a href="#" className="btn btn-secondary my-2">
							Secondary action
						</a>
					</p>
				</div>
			</section>
			<div className="flex-row justify-space-between">
				<h2>List of Missing People</h2>
				<img alt="image 0" src={photoUrl} />
				<img alt="image 1" src={photoUrl1} />
				<img alt="image 2" src={photoUrl2} />
				<img alt="image 3" src={photoUrl3} />
				<img alt="image 4" src={photoUrl4} />
				<img alt="image 5" src={photoUrl5} />
			</div> */}
		</main>
	);
};
export default Home;
