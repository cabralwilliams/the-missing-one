import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_DONATION } from '../utils/mutations';
import { retrieveDonationAmount } from "../utils/helpers";

function Success() {
    const [addDonation] = useMutation(ADD_DONATION);

    useEffect(() => {
        async function saveDonation() {
            const donation = retrieveDonationAmount();
            const { data } = await addDonation({ variables: { amount: donation }});

            console.log(data);

            setTimeout(() => {
                window.location.replace('/');
            }, 3000);
        }

        saveDonation();
    }, [addDonation]);

    return(
        <div>
            <h1>Success!</h1>
            <h2>Thank you for your contribution to help find the missing!</h2>
            <h2>You will now be redirected to the homepage.</h2>
        </div>
    );
};

export default Success;