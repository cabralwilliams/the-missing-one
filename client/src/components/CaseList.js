import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_CASES, SEARCH_CASES } from "../utils/queries";
import SimpleCase from "./SimpleCase";
import { useQuery } from "@apollo/client";

const CaseList = () => {
	const state = useSelector((state) => state);
	const caseFilter = state.caseFilter;
	//	const { data, loading } = useQuery(GET_CASES);
	console.log("state now ");
	console.log(state);
	let firstname1 = "",
		lastname1 = "";
	if (Object.keys(caseFilter).length > 0) {
		firstname1 = caseFilter.firstname;
		lastname1 = caseFilter.lastname;
		console.log(firstname1, lastname1);
	}
	const { data, loading } = useQuery(SEARCH_CASES, {
		variables: { firstname: firstname1, lastname: lastname1 },
	});
	const dispatch = useDispatch();

	// if (loading) {
	// 	return <h2>Cases are loading...</h2>;
	// } else console.log(data);

	console.log("in caselist");

	useEffect(() => {
		// //	if (Object.keys(caseFilter).length > 0) {
		// 		console.log("casefilter exists");
		// 		dispatch({
		// 			type: "UPDATE_CASES",
		// 			cases: data.searchCases,
		// 		});
		// //	} else
		if (data) {
			console.log("executing dispatch to update state");
			dispatch({
				type: "UPDATE_CASES",
				cases: data.searchCases,
			});
		}
	}, [data, dispatch]);

	const filterCases = useSelector((state) => state.cases);
	console.log("filtering cases");
	console.log(filterCases);
	const photoUrl = "https://missingone.s3.amazonaws.com/0.jpg";
	const photoUrl1 = "https://missingone.s3.amazonaws.com/1.jpg";
	const photoUrl2 = "https://missingone.s3.amazonaws.com/2.jpg";
	const photoUrl3 = "https://missingone.s3.amazonaws.com/3.jpg";
	const photoUrl4 = "https://missingone.s3.amazonaws.com/4.jpg";
	const photoUrl5 = "https://missingone.s3.amazonaws.com/5.jpg";
	return (
		<div>
			<div className="clearfix">
				<div className="row width-80">
					{filterCases.length &&
						filterCases.map((missing) => (
							<div
								className="col-md-4 my-3 animated fadeIn text-center rounded "
								key={missing._id}
							>
								<SimpleCase
									_id={missing._id}
									firstname={missing.firstname}
									lastname={missing.lastname}
									age={missing.age}
									disappearance_date={missing.disappearance_date}
									last_known_location={missing.last_known_location}
									img_src=""
								></SimpleCase>
								{/* <div className="card">
									<div className="card-body">
										<div className="avtar">
											<img
												src={photoUrl}
												className="card-img-top"
												alt="firstimage"
											></img>{" "}
										</div>
										<h6 className="card-title ">
											<strong>{`${missing.firstname} ${missing.lastname}`}</strong>
										</h6>
										<p className="card-text">
											{missing.last_known_location} <br />
											<span className="phone">
												Missing Since:
												<strong>
													<Moment
														format="MMM YY"
														date={missing.disappearance_date}
													></Moment>
												</strong>
											</span>
										</p>
									</div>
								</div> */}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CaseList;
