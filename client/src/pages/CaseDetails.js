import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import Auth from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
const CaseDetails = () => {
	const state = useSelector((state) => state);

	console.log("Printing store user");
	console.log(`User: ${JSON.stringify(state.user)}`);

	const { caseId } = useParams();
	console.log(caseId);
	const { data, loading } = useQuery(GET_CASE_ById, {
		variables: { id: caseId },
	});
	//const { data: queryMEData, loading: queryMELoading } = useQuery(QUERY_ME);
	const caseDetail = data?.getCaseById || {};
	console.log(caseDetail);

	if (loading) {
		return <div>Loading...</div>;
	}

	// const userData = queryMEData?.me || {};
	// console.log(userData);
	// const username = Object.keys(userData).length
	// 	? `${userData.first_name} ${userData.last_name}`
	// 	: "Anonymous User";
	// console.log(username);
	let username = "Anonymous";
	if (Object.keys(state.user).length > 0)
		username = `${state.user.first_name} ${state.user.last_name}`;
	console.log(username);
	//use effect dispatch case details to current case in store

	return (
		<CommentsList
			comments={caseDetail.comments}
			case_id={caseDetail._id}
			username={username}
		/>
		// <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
		//         <div class="lh-1">
		//             <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
		//             <p class="text-center"> Viewing {caseDetail.firstname}'s profile.</p>
		//             </h1>
		//         </div>
		//     </div>
	);
};

export default CaseDetails;
