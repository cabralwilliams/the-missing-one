
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById } from "../utils/queries";
import { useParams } from 'react-router-dom';


const CaseDetails = () => {
    const { caseId } = useParams();
    console.log(caseId);
    const { data, loading } = useQuery(GET_CASE_ById ,
        {   variables: { id: caseId },}
        );

    const caseDetail = data?.getCaseById || {};
    console.log(caseDetail);

    
    if (loading) {
        return <div>Loading...</div>;
    }
    return(
        <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div class="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                    <p class="text-center"> Viewing {caseDetail.firstname}'s profile.</p>
                    </h1>
                </div>
            </div>
    );
};

export default CaseDetails;