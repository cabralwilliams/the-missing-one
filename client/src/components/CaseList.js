import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_CASES, SEARCH_CASES } from "../utils/queries";
import SimpleCase from "./SimpleCase";
import { useQuery } from "@apollo/client";
import { LOAD_NEXT_PAGE } from "../utils/actions";
const CaseList = () => {
	const state = useSelector((state) => state);
	const caseFilter = state.caseFilter;

	const prevPage = state.page;
	const totalPages = state.totalPages;

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
	const selectedPage = useSelector((state) => state.page);
	console.log("Page Selected " + selectedPage);
	//Store cases under Global store
	useEffect(() => {
		console.log("use effect");
		if (data) {
			console.log("executing dispatch to update state");
			dispatch({
				type: "UPDATE_CASES",
				cases: data.searchCases,
			});
		}
	}, [data, dispatch, selectedPage]);

	// const filterCases = useSelector((state) => state.cases);
	const filterCases = useSelector((state) => state.displayCases[selectedPage]);

	if (loading) {
		return <h2>Cases are loading...</h2>;
	}

	if (!filterCases) {
		return <h2>Cases are loading...</h2>;
	}
	console.log("filtering cases");
	console.log(filterCases);
	console.log("caselist component");

	function loadMore() {
		let nextPage = prevPage + 1;
		if (nextPage > totalPages) nextPage = 0;
		dispatch({
			type: LOAD_NEXT_PAGE,
			nextPage: nextPage,
		});
	}

	return (
		<div>
			<div className="clearfix">
			<div className="row width-80">
          		<div className="col-md-3 my-3 animated fadeIn text-center rounded "></div>
				<div className="col-md-6 my-3 animated fadeIn text-center rounded section-heading h3 ">Someone, Somewhere is Looking for Them! Let's Help!!</div>
            	<div className="col-md-6 my-3 animated fadeIn text-center rounded "></div>
			</div>
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
									comment_count={missing.comments.length}
								></SimpleCase>
							</div>
						))}
				</div>
				<div className="row width-80">
					<div className="col-md-3 my-3 animated fadeIn text-center rounded "></div>
					<div className="col-md-6 my-3 animated fadeIn text-center rounded ">
						{(state.totalPages)? (
							<button
								className="btn  btn-block w-50 mx-auto load-more-btn "
								onClick={(e) => {
									loadMore();
								}}
							>
								Load More{" "}
							</button>
						):(<span></span>)}
					</div>
					<div className="col-md-3 my-3 animated fadeIn text-center rounded "></div>
				</div>
			</div>
		</div>
	);
};

export default CaseList;
