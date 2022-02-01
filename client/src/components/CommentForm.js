import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { GET_CASE_ById, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
//import { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries";

const CommentForm = (props) => {
	const [commentText, setCommentText] = useState("");
	const [characterCount, setCharacterCount] = useState(0);
	const { case_id, username } = props;
	const [addComment, { error }] = useMutation(ADD_COMMENT);

	// update state based on form input changes
	const handleChange = (event) => {
		if (event.target.value.length <= 280) {
			setCommentText(event.target.value);
			setCharacterCount(event.target.value.length);
		}
	};

	// submit form
	const handleFormSubmit = async (event) => {
		//
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

	return (
		<div className="align-center">
			{
				<p
					className={`mx-5 my-0 px-3 ${
						characterCount === 280 || error ? "text-error" : ""
					}`}
				>
					Character Count: {characterCount}/280
					{error && <span className="ml-2">Something went wrong...</span>}
				</p>
			}
			<form onSubmit={handleFormSubmit}>
				{/* className="flex-row justify-center justify-space-between-md " */}
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
