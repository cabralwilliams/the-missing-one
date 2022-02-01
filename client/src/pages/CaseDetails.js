import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import { useSelector, useDispatch } from "react-redux";

const CaseDetails = () => {
	const state = useSelector((state) => state);

	console.log("Printing store user");
	console.log(`User: ${JSON.stringify(state.user)}`);

	//Get Caseid from url parameter
	const { caseId } = useParams();
	console.log(caseId);
	const { data, loading } = useQuery(GET_CASE_ById, {
		variables: { id: caseId },
	});

	const caseDetail = data?.getCaseById || {};
	console.log(caseDetail);

	if (loading) {
		return <div>Loading...</div>;
	}

	//Get User details from Global store
	let username = "Anonymous";
	if (Object.keys(state.user).length > 0)
		username = `${state.user.first_name} ${state.user.last_name}`;
	console.log(username);

	return (
		//Rest of case details
		<CommentsList
			comments={caseDetail.comments}
			case_id={caseDetail._id}
			username={username}
		/>
	);
};

export default CaseDetails;
