import React, { useEffect } from "react";
import { GET_CASES } from "../utils/queries";
import SimpleCase from "./SimpleCase";
import { useQuery } from "@apollo/client";
import Moment from "react-moment";

const CaseList = () => {
	const { data, loading } = useQuery(GET_CASES);

	if (loading) {
		return <h2>Cases are loading...</h2>;
	} else console.log(data);
	const cases = data?.getCases || [];
	console.log("in caselist");
	console.log(cases);

	// useEffect(() => {
	//     if (data) {

	//     }
	// })
	const photoUrl = "https://missingone.s3.amazonaws.com/0.jpg";
	const photoUrl1 = "https://missingone.s3.amazonaws.com/1.jpg";
	const photoUrl2 = "https://missingone.s3.amazonaws.com/2.jpg";
	const photoUrl3 = "https://missingone.s3.amazonaws.com/3.jpg";
	const photoUrl4 = "https://missingone.s3.amazonaws.com/4.jpg";
	const photoUrl5 = "https://missingone.s3.amazonaws.com/5.jpg";
	return (
		<div>
			<div className="clearfix">
				<div className="row">
					{cases.length &&
						cases.map((missing) => (
							<div
								className="col-md-4 my-2 animated fadeIn text-center rounded "
								key={missing._id}
							>
								<div className="card">
									<div className="card-body">
										<div className="avtar">
											<img
												src={photoUrl}
												className="card-img-top"
												alt="firstimage"
											></img>{" "}
										</div>
										<h6 className="card-title ">
											<strong>{`${missing.firstname} ${missing.lastname}`}</strong>
										</h6>
										<p className="card-text">
											{missing.last_known_location} <br />
											<span className="phone">
												Missing Since:
												<strong>
													<Moment
														format="MMM YY"
														date={missing.disappearance_date}
													></Moment>
												</strong>
											</span>
										</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default CaseList;
