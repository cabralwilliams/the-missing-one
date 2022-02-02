import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import { useSelector, useDispatch } from "react-redux";
import CaseDetail from "../components/CaseDetail";
import { Link } from "react-router-dom";
const CaseDetails = () => {
	const state = useSelector((state) => state);
    const [didCreate,setDidCreate] = useState(false);

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

    useEffect(() => {
        setDidCreate(caseDetail.creator_id === state.user._id);
    }, [caseDetail.creator_id,state]);

	if (loading) {
		return <div>Loading...</div>;
	}

	//Get User details from Global store
	let username = "Anonymous";
	if (Object.keys(state.user).length > 0)
		username = `${state.user.first_name} ${state.user.last_name}`;
	console.log(username);

	return (
		<section className="about">
            {didCreate && <button><Link to={`/edit/${caseId}`}>Edit Case</Link></button>}
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
