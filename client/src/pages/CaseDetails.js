
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CASE_ById } from "../utils/queries";
import { useParams } from 'react-router-dom';
import CaseDetail from '../components/CaseDetail'

const CaseDetails = () => {
    const { caseId } = useParams();

    const { data, loading } = useQuery(GET_CASE_ById,
        { variables: { id: caseId }, }
    );

    const caseDetail = data?.getCaseById || {};


    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <CaseDetail caseDetail={caseDetail}/>
    );
};

export default CaseDetails;