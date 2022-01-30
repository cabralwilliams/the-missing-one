import { StatsEvent } from "@aws-sdk/client-s3";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GoSearch } from "react-icons/go";
import { SEARCH_CASES } from "../utils/queries";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
	// const [getSearchResults, { loading, error, data }] =
	// 	useLazyQuery(SEARCH_CASES);

	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	const initialFormState = {
		firstname: "",
		lastname: "",
		ncic: "",
	};
	const [formState, setFormState] = useState(initialFormState);
	const handleChange = (e) => {
		var msg = "";
		console.log(e.target.name + " " + e.target.value);
		if (e.target.name === "firstname") {
			setFormState({ ...formState, firstname: e.target.value.toLowerCase() });
		} else if (e.target.name === "lastname") {
			// console.log("firstname" + e.target.value)
			setFormState({ ...formState, lastname: e.target.value.toLowerCase() });
		} else {
			// console.log("ncic" + e.target.value)
			setFormState({ ...formState, ncic: e.target.value });
		}
	};

	const searchHandler = (e) => {
		console.log(formState);
		dispatch({
			type: "UPDATE_CASE_FILTER",
			caseFilter: { ...formState },
		});
	};
	// if (loading) return <p>Loading ...</p>;
	// if (error) return `Error! ${error}`;
	// console.log("searchResults");
	// console.log(data);
	console.log(state);
	return (
		<div className="border-end bg-white" id="sidebar-wrapper">
			<div className="sidebar-heading border-bottom bg-light">Search Cases</div>
			<form>
				<div className="list-group list-group-flush">
					{/* <a
					className="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!"
				>
					Dashboard
				</a> */}
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" htmlFor="firstname">
							First Name
						</label>
						<input
							type="text"
							className="form-control"
							id="firstname"
							name="firstname"
							placeholder="First Name"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" htmlFor="lastname">
							Last Name
						</label>
						<input
							type="text"
							name="lastname"
							className="form-control"
							id="lastname"
							placeholder="Last Name"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2">
						<label className="form-label" htmlFor="ncic">
							NCIC#
						</label>
						<input
							type="text"
							className="form-control"
							id="ncic"
							name="ncic"
							placeholder="NCIC#"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-3 list-group-item list-group-item-action list-group-item-light p-2 text-center">
						<button
							type="button"
							className="btn btn-primary w-75"
							id="searchCases"
							onClick={searchHandler}
							// onClick={() => getSearchResults({ variables: { ...formState } })}
						>
							{" "}
							<GoSearch />
							&nbsp;&nbsp;Search
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default SideBar;
