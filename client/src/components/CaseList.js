import React from "react";
import { GET_CASES } from "../utils/queries";
import SimpleCase from "./SimpleCase";
import { useQuery } from "@apollo/client";

const CaseList = () => {
    const { data, loading } = useQuery(GET_CASES);

    if(loading) {
        return(
            <h2>Cases are loading...</h2>
        );
    }
    return(
        <div>
            {
                data && data.getCases.map(missing => {
                    //Placeholder value
                    missing.img_src = "https://missingone.s3.amazonaws.com/0.jpg";
                    return(
                        <SimpleCase key={missing._id} {...missing} />
                    )
                })
            }
        </div>
    );
};

export default CaseList;