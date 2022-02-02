import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_CASES, SEARCH_CASES } from "../utils/queries";
import SimpleCase from "./SimpleCase";
import { useQuery } from "@apollo/client";

const CaseList = () => {
	const state = useSelector((state) => state);
	const caseFilter = state.caseFilter;
	console.log("state now ");
	console.log(state);
	let firstname1 = "",
		lastname1 = "",
		ncic = "";
	if (Object.keys(caseFilter).length > 0) {
		if (caseFilter.ncic.trim().length > 0) {
			firstname1 = "";
			lastname1 = "";
			ncic = caseFilter.ncic;
		} else {
			firstname1 = caseFilter.firstname;
			lastname1 = caseFilter.lastname;
			console.log(firstname1, lastname1);
		}
	}
	const { data, loading } = useQuery(SEARCH_CASES, {
		variables: { firstname: firstname1, lastname: lastname1, ncic },
	});
	const dispatch = useDispatch();

	console.log("in caselist");

	//Store cases under Global store
	useEffect(() => {
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

	if (loading) {
		return <h2>Cases are loading...</h2>;
	}
	console.log(filterCases);
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
									img_src={missing.images[0]}
								></SimpleCase>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CaseList;
