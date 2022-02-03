import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import { useSelector, useDispatch } from "react-redux";
import CaseDetail from "../components/CaseDetail";
import { UPDATE_CURRENT_CASE } from "../utils/actions";

const CaseDetails = () => {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();
    const [didCreate,setDidCreate] = useState(false);

//	console.log("Printing store user");
//	console.log(`User: ${JSON.stringify(state.user)}`);

	//Get Caseid from url parameter
	const { caseId } = useParams();
//	console.log(caseId);
	const { data, loading } = useQuery(GET_CASE_ById, {
		variables: { id: caseId },
	});

	// function geeks_outer(array) {
	// 	array.sort(function (a, b) {
	// 		return new Date(a.created_at) - new Date(b.created_at);
	// 	});

	// 	return JSON.stringify(array);
	// }

	const caseDetail = data?.getCaseById || {};
	console.log(caseDetail);

    useEffect(() => {
        setDidCreate(caseDetail.creator_id === state.user._id);
    }, [caseDetail.creator_id,state]);

	useEffect(() => {
		dispatch({
			type: UPDATE_CURRENT_CASE,
			currentCase: caseDetail
		})
		console.log(state);
	},[caseDetail,dispatch]);

	if (loading) {
		return <div>Loading...</div>;
	}

	//Get User details from Global store
	let username = "Anonymous";
	if (Object.keys(state.user).length > 0)
		username = `${state.user.first_name} ${state.user.last_name}`;
	//console.log(username);

	return (
		<section className="about">
            {didCreate && <a className="btn btn-primary" href={`/edit/${caseId}`} role="button">Edit Case</a>}
			<CaseDetail caseDetail={caseDetail} />
			<CommentsList
				comments={caseDetail.comments}
				case_id={caseDetail._id}
				username={username}
			/>
		</section>
		// <CommentsList
		// 	comments={caseDetail.comments}
		// 	case_id={caseDetail._id}
		// 	username={username}
		// />
	);
};

export default CaseDetails;
