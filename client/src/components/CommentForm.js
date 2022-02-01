import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
//import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const CommentForm = (props) => {
	const [commentText, setCommentText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [characterCount, setCharacterCount] = useState(0);
	const { case_id } = props;
	let { username } = props;
	const [addComment, { error }] = useMutation(ADD_COMMENT);
	const [inputName, setInputName] = useState(username);

	// submit form
	const handleFormSubmit = async (event) => {
	//	event.preventDefault();
		console.log("submitting reply form ");
		if (!validateForm()) return false;
		//	event.preventDefault();
		console.log(commentText, "Case id  = " + case_id, "created by " + username);
		try {
			await addComment({
				variables: {
					comment_text: commentText,
					case_id: case_id,
					created_by: username,
				},
			});
			//	 clear form value
			setCommentText("");
			setCharacterCount(0);
		} catch (e) {
			console.error(e);
		}
	};

	const validateForm = () => {
		if (inputName) username = inputName;
		else username = "Anonymous User";
		if (!commentText) {
			setErrorMessage("Please enter your reply");
			console.log(errorMessage);
			return false;
		} else return true;
	};

	// update state based on form input changes
	const handleChange = (event) => {
		setErrorMessage("");
		if (event.target.name === "inputname") {
			setInputName(event.target.value);
		} else {
			if (event.target.value.length <= 280) {
				setCommentText(event.target.value);
				setCharacterCount(event.target.value.length);
			}
		}
	};

	return (
		<div className="align-center">
			{/* {
				<p
					className={`mx-5 my-0 px-3 ${
						characterCount === 280 || error ? "text-error" : ""
					}`}
				>
					Character Count: {characterCount}/280
					{error && <span className="ml-2">Something went wrong...</span>}
				</p>
			} */}
			<form onSubmit={handleFormSubmit}>
				{/* className="flex-row justify-center justify-space-between-md " */}
				<div className="d-flex align-items-center p-3 text-white bg-purple rounded shadow-sm">
					<div>
						<label className="form-label text-dark" htmlFor="inputname">
							Your Name
						</label>{" "}
						<input
							type="text"
							className="form-control width-80"
							id="inputname"
							name="inputname"
							placeholder=" Name"
							defaultValue={username}
							onChange={handleChange}
						/>
					</div>
				</div>
				{characterCount === 280 || error || errorMessage ? (
					<div className="d-flex align-items-center  text-white bg-purple rounded shadow-sm ">
						<h6
							className="ml-2 alert alert-info"
							style={{ padding: "3px", margin: "5px" }}
						>
							{" "}
							Character Count: {characterCount}/280
						</h6>
						{error && (
							<h6
								className="alert alert-danger"
								style={{ padding: "3px", margin: "5px" }}
							>
								{" "}
								Something went wrong!
							</h6>
						)}
						{errorMessage && (
							<h6
								className="alert alert-danger"
								style={{ padding: "3px", margin: "5px" }}
							>
								{errorMessage}
							</h6>
						)}
					</div>
				) : (
					<div>
						<h6
							className="ml-2 alert alert-info"
							style={{ padding: "3px", margin: "5px" }}
						>
							{" "}
							Character Count: {characterCount}/280
						</h6>
					</div>
				)}
				<div className="row justify-space-between-md mb-4 ">
					<div className="col-md-1"></div>
					<textarea
						placeholder="New Comment"
						value={commentText}
						className="form-input col-10 col-md-9"
						onChange={handleChange}
					></textarea>
					<div className="col-md-2">
						<button
							className="btn btn-sm btn-outline-primary mt-2 comment-btn"
							type="submit"
						>
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
