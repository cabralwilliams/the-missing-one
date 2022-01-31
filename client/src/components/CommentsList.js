import React from "react";
import Moment from "react-moment";
import CommentForm from "./CommentForm";

const CommentsList = (props) => {
	const { comments, case_id, username } = props;
	console.log("printing comments ");
	console.log(comments);
	return (
		<main className="container">
			<div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
				<img
					className="me-3"
					src="/docs/5.0/assets/brand/bootstrap-logo-white.svg"
					alt=""
					width="48"
					height="38"
				/>
				<div className="lh-1">
					<h1 className="h6 mb-0 text-white lh-1">Bootstrap</h1>
					<small>Since 2011</small>
				</div>
			</div>

			<div className="my-3 p-3 bg-body rounded shadow-sm">
				<CommentForm case_id={case_id} username={username} />
				<h6 className="border-bottom pb-2 mb-0">Recent updates</h6>
				{comments &&
					comments.map((comment) => (
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

							<div className="pb-3 mb-0 small lh-sm width-80">
								<strong className="d-block text-gray-dark comment-header">
									{`@${comment.created_by} posted on `}{" "}
									<Moment
										format="MM/DD/YY hh:mm a"
										date={comment.created_at}
									></Moment>
								</strong>
								{comment.comment_text}
								<div className="text-end mt-3">
									<button className="btn btn btn-outline-primary btn-sm reply-btn">
										Reply{" "}
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
			{/* <div className="d-flex text-muted pt-3">
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
						<rect width="100%" height="100%" fill="#e83e8c" />
						<text x="50%" y="50%" fill="#e83e8c" dy=".3em">
							32x32
						</text>
					</svg>

					<p className="pb-3 mb-0 small lh-sm border-bottom">
						<strong className="d-block text-gray-dark">@username</strong>
						Some more representative placeholder content, related to this other
						user. Another status update, perhaps.
					</p>
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
						<rect width="100%" height="100%" fill="#6f42c1" />
						<text x="50%" y="50%" fill="#6f42c1" dy=".3em">
							32x32
						</text>
					</svg>

					<p className="pb-3 mb-0 small lh-sm border-bottom">
						<strong className="d-block text-gray-dark">@username</strong>
						This user also gets some representative placeholder content. Maybe
						they did something interesting, and you really want to highlight
						this in the recent updates.
					</p>
				</div>
				<small className="d-block text-end mt-3">
					<a href="#">All updates</a>
				</small>
			</div> */}

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
