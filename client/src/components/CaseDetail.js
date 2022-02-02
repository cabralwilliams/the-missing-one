import React, { useState } from "react";
import Moment from "react-moment";
// const formatDate = dateStr => {
//     return dateStr.split(' ')[0];
// }


const CaseDetails = ({ caseDetail }) => {
	return (
		<section className="about" >
            <div className="container" data-aos="fade-up">
                <div className="section-title">
                    <div className=" col-lg-8 pt-4 pt-lg-0 content m-auto">
                        <h3 className="text-center text-primary"> Viewing {caseDetail.firstname}'s Case Details</h3>
                        <br />
                    </div>

                </div>


                <div className="row my-3 ">
                    <div className="col-lg-4 bg-purple rounded shadow-sm p-3 my-3">
                        <img src="{caseDetail.images}" className="img-fluid" alt="CaseImage" />
                    </div>

                    <div className="col-lg-4 content bg-purple rounded shadow-sm p-3 my-3" >
                        <ul>

                            <li><i class="bi bi-rounded-right"> <strong>First Name:</strong></i> {caseDetail.firstname}</li>
                            <li><i class="bi bi-rounded-right"> <strong>Last Name:</strong></i> {caseDetail.lastname}</li>
                            <li><i class="bi bi-rounded-right"> <strong>Age:</strong></i> {caseDetail.age}</li>
                            <li><i class="bi bi-rounded-right"> <strong>Gender:</strong></i> {caseDetail.gender}</li>
                            <li><i class="bi bi-rounded-right"> <strong>Last Seen:</strong></i> {caseDetail.last_known_location}</li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> Race:</strong></i>
                                {caseDetail.race ? caseDetail.race : ' Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong>
                                    Biograph:</strong></i> {caseDetail.biograph ? caseDetail.biograph : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong>  Case Status: </strong></i> {caseDetail.case_status ? "Open" : 'Closed'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> Ncic Number:</strong></i> {caseDetail.ncic ? caseDetail.ncic : 'Not Available'}
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-4 content bg-purple rounded shadow-sm p-3 my-3">
                        <ul>

                            <li><i class="bi bi-rounded-right"><strong>Address:</strong></i>
                                {caseDetail.address ? caseDetail.address : ' Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> Date of Disappearance:</strong></i>  {caseDetail.disappearance_date ? 
									<Moment
									format="MM/DD/YYYY"
									date={caseDetail.disappearance_date}
								></Moment> : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> Date of Birth:</strong></i>
                                {caseDetail.dob ? <Moment
									format="MM/DD/YYYY"
									date={caseDetail.dob}
								></Moment> : ' Not Available'}
                            </li>



                            <li>
                                <i class="bi bi-rounded-right"><strong> Nationality:</strong></i>  {caseDetail.nationality ? caseDetail.nationality : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> Mobile: </strong></i> {caseDetail.mobile ? caseDetail.mobile : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong> License Id:</strong></i>  {caseDetail.licenseId ? caseDetail.licenseId : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong>IssuedState: </strong></i> {caseDetail.issuedState ? caseDetail.issuedState : 'Not Available'}
                            </li>
                            <li>
                                <i class="bi bi-rounded-right"><strong>  License Plate:</strong></i>  {caseDetail.licensePlate ? caseDetail.licensePlate : 'Not Available'}
                            </li>




                            <li>
                                <i class="bi bi-rounded-right"><strong> Other Information:</strong></i>  {caseDetail.other_info ? caseDetail.other_info : 'Not Available'}
                            </li>

                        </ul>

                    </div>


                </div>
            </div>
        </section>
	);
};

export default CaseDetails;
