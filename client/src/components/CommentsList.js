import React from "react";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import moment from "moment";

const CommentsList = (props) => {
	const { comments, case_id, username } = props;
	console.log("printing comments ");
	console.log(comments);

	function sortComments(array) {
		console.log(array);
		const sortedArray = array.sort(
			(a, b) =>
				moment(a.created_at, "YYYYMMDD") - moment(b.created_at, "YYYYMMDD")
		);
		// arr.sort(function (a, b) {
		// 	console.log("first date");
		// 	console.log(moment(a.created_at, "YYYY-MM-DD hh:mm:ss"));
		// 	console.log("second date");
		// 	console.log(moment(b.created_at, "YYYY-MM-DD hh:mm:ss"));
		// 	var c = moment(a.created_at, "YYYY-MM-DD hh:mm:ss").diff(
		// 		moment(a.created_at, "YYYY-MM-DD hh:mm:ss")
		// 	);
		console.log("sorted array for me");
		console.log(sortedArray);
	}
	const commentsReveseArray = comments.slice(0).reverse();
	console.log("sorted comments");
	console.log(commentsReveseArray);
	return (
		<main className="container">
			<div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
				{/* <div className="lh-1">
					<h1 className="h6 mb-0 text-white lh-1">Bootstrap</h1>
					<small>Since 2011</small>
				</div> */}{" "}
				<h3> </h3>
				<h5 className="text-center section-heading">
					<FaComments />
					&nbsp;&nbsp; &nbsp;Recent Updates
				</h5>
			</div>

			<div className="my-3 p-3 bg-body rounded shadow-sm">
				<CommentForm case_id={case_id} username={username} />
				<h6 className="border-bottom pb-2 mb-0">Recent Comments</h6>
				{commentsReveseArray &&
					commentsReveseArray.map((comment) => (
						<div
							className="d-flex text-muted pt-3 border-bottom "
							key={comment._id}
						>
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
							<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
								<div className="d-flex justify-content-between">
									<strong className="text-gray-dark">{`@${comment.created_by}`}</strong>
									<span>
										<strong>
											{" "}
											<Moment
												format="MM/DD/YY hh:mm a"
												date={comment.created_at}
											></Moment>{" "}
										</strong>
									</span>
								</div>
								<div className="d-flex justify-content-between">
									<span className="d-block">{comment.comment_text}</span>
									<div className="text-start mt-3 ">
										<Link
											to={`/comment/${case_id}/${comment._id}`}
											className="btn btn btn-outline-primary btn-sm reply-btn px-3"
											role="button"
										>
											Reply{"    "}
										</Link>
									</div>
								</div>
							</div>{" "}
						</div>
					))}
			</div>

			{/* <div className="my-3 p-3 bg-body rounded shadow-sm">
				<h6 className="border-bottom pb-2 mb-0">Suggestions</h6>
				<div className="d-flex text-muted pt-3">
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
						<rect width="100%" height="100%" fill="#007bff" />
						<text x="50%" y="50%" fill="#007bff" dy=".3em">
							32x32
						</text>
					</svg>

					<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
						<div className="d-flex justify-content-between">
							<strong className="text-gray-dark">Full Name</strong>
							<a href="#">Follow</a>
						</div>
						<span className="d-block">@username</span>
					</div>
				</div>
				<div className="d-flex text-muted pt-3">
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
						<rect width="100%" height="100%" fill="#007bff" />
						<text x="50%" y="50%" fill="#007bff" dy=".3em">
							32x32
						</text>
					</svg>

					<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
						<div className="d-flex justify-content-between">
							<strong className="text-gray-dark">Full Name</strong>
							<a href="#">Follow</a>
						</div>
						<span className="d-block">@username</span>
					</div>
				</div>
				<div className="d-flex text-muted pt-3">
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
						<rect width="100%" height="100%" fill="#007bff" />
						<text x="50%" y="50%" fill="#007bff" dy=".3em">
							32x32
						</text>
					</svg>

					<div className="pb-3 mb-0 small lh-sm border-bottom w-100">
						<div className="d-flex justify-content-between">
							<strong className="text-gray-dark">Full Name</strong>
							<a href="#">Follow</a>
						</div>
						<span className="d-block">@username</span>
					</div>
				</div>
				<small className="d-block text-end mt-3">
					<a href="#">All suggestions</a>
				</small>
			</div> */}
		</main>
	);
};

export default CommentsList;
