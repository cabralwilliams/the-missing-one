import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
//This component would theoretically be what the user saw when browsing the homepage or looking at cases on his/her profile page


const S3_BUCKET = "missingone";

const SimpleCase = (props) => {
	//Destructure properties from props object
	const {
		_id,
		firstname,
		lastname,
		age,
		disappearance_date,
		last_known_location,
		img_src,
		comment_count
	} = props;

	const photoUrl = "https://"+S3_BUCKET+"."+"s3"+"."+"amazonaws.com/"+img_src;
	console.log(photoUrl)

	return (
		<div className="card">
			<div className="card-body">
				<div className="avtar">
					<img src={photoUrl} className="card-img-top" alt="firstimage"></img>{" "}
				</div>
				<h6 className="card-title ">
					<strong>{`${firstname} ${lastname}`}</strong>
					<br />
				</h6>
				<p className="card-text">
					{last_known_location} <br />
					<span className="phone">
						<strong>{age} yrs</strong> <br />
						Missing Since:
						<strong>
							<Moment format="MMM YY" date={disappearance_date}></Moment>
						</strong>
					</span>
				</p>
			</div>
			<div className="d-flex justify-content-between align-items-center">
				<Link to={`/cases/${_id}`}>
					<div className="btn-group">
						<button type="button" className="btn btn-sm btn-outline-primary">
							View Details
						</button>
					</div>
				</Link>
				<small className="text-muted">{comment_count} comments</small>
			</div>
		</div>
	);
};

export default SimpleCase;
