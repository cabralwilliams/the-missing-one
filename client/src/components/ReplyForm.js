import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REPLY } from "../utils/mutations";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../utils/auth";

const ReplyForm = (props) => {
	const [replyBody, setReplyBody] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [characterCount, setCharacterCount] = useState(0);
	const { commentId } = props;
	const [addReply, { error }] = useMutation(ADD_REPLY);

	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	//Get User details from Global store
	console.log(state);
	let username = "Anonymous";
	if (Object.keys(state.user).length > 0)
		username = `${state.user.first_name} ${state.user.last_name}`;
	console.log(username);

	const [inputName, setInputName] = useState(username);
	//validate form
	const validateForm = () => {
		if (inputName) username = inputName;
		else username = "Anonymous User";
		if (!replyBody) {
			setErrorMessage("Please enter your reply");
			console.log(errorMessage);
			return false;
		} else return true;
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("submitting reply form ");
		if (!validateForm()) return false;

		console.log(
			replyBody,
			" commentId  = " + commentId,
			"commentId by " + username
		);
		try {
			await addReply({
				variables: {
					commentId: commentId,
					reply_body: replyBody,
					name: username,
				},
			});
			//	 clear form value
			setReplyBody("");
			setCharacterCount(0);
		} catch (e) {
			console.error(e);
		}
	};

	// update state based on form input changes
	const handleChange = (event) => {
		setErrorMessage("");
		if (event.target.name === "inputname") {
			setInputName(event.target.value);
		} else {
			if (event.target.value.length <= 280) {
				setReplyBody(event.target.value);
				setCharacterCount(event.target.value.length);
			}
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
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

			<div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
				<div className="col-sm-1"></div>
				<textarea
					placeholder="New Reply"
					value={replyBody}
					className="form-input  col-sm-8"
					onChange={handleChange}
				></textarea>
				<div className="col-sm-1 "></div>
				<div className="col-sm-2">
					<button
						className="btn btn-sm btn-outline-primary mt-2 comment-btn"
						type="submit"
						// onClick={handleFormSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default ReplyForm;
