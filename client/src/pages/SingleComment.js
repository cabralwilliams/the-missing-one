import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReplyForm from "../components/ReplyForm";
import Moment from "react-moment";
// import ReactionForm from "../components/ReactionForm";

import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_COMMENT_BYId } from "../utils/queries";

const SingleComment = () => {
	const { id: commentId, caseId: caseId } = useParams();

	const { loading, data } = useQuery(QUERY_COMMENT_BYId, {
		variables: { caseId: caseId, id: commentId },
	});

	console.log("Looking for caseId = " + caseId + " commentId = " + commentId);
	const comment = data?.getCommentById || {};

	if (loading) {
		return <div>Loading...</div>;
	}
	console.log("Comments ");
	console.log(comment);
	return (
		<main className="container">
			<div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
				<svg
					className="bd-placeholder-img flex-shrink-0 me-2 rounded"
					width="32"
					height="32"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Placeholder: 32x32"
					preserveAspectRatio="xMidYMid slice"
					focusable="false"
				>
					<title>Placeholder</title>
					<rect width="100%" height="100%" fill="#2a52be" />
					<text x="50%" y="50%" fill="#2a52be" dy=".3em">
						32x32
					</text>
				</svg>
				<div className="lh-1 px-2">
					<h1 className="h6 mb-0  lh-1 text-muted">{comment.comment_text}</h1>
					<small>Since 2011</small>
				</div>
			</div>

			<ReplyForm commentId={commentId} />

			<div className="my-3 p-3 bg-body rounded shadow-sm">
				<h6 className="border-bottom pb-2 mb-0">Replies</h6>
				{comment.replies &&
					comment.replies.map((reply) => (
						<div className="d-flex text-muted pt-3" key={reply._id}>
							<svg
								className="bd-placeholder-img flex-shrink-0 me-2 rounded"
								width="32"
								height="32"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Placeholder: 32x32"
								preserveAspectRatio="xMidYMid slice"
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#95a8e0" />
								<text x="50%" y="50%" fill="#95a8e0" dy=".3em">
									32x32
								</text>
							</svg>

							<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
								<div className="d-flex justify-content-between">
									<strong className="text-gray-dark">{reply.name}</strong>
									<span>
										<strong>
											{" "}
											<Moment
												format="MM/DD/YY hh:mm a"
												date={reply.created_at}
											></Moment>{" "}
										</strong>
									</span>
								</div>
								<span className="d-block">{reply.reply_body}</span>
							</div>
						</div>
					))}

				<small className="d-block text-end mt-3">
					<Link to={`/cases/${caseId}`}> Back to Case Details</Link>
				</small>
			</div>
		</main>
	);
};

export default SingleComment;
