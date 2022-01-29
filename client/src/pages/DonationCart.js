import React, {useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
//import { ADD_DONATION} from '../utils/mutations';
import { QUERY_CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import { saveDonationAmount } from '../utils/helpers';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DonationCart = () => {
    const [formState, setFormState] = useState({ amount: 1});
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

   // const [addDonation] = useMutation(ADD_DONATION);
 
    const handleFormSubmit = async (event) => {
      event.preventDefault();
    //   const mutationResponse = await addDonation({
    //     variables: {
    //       amount: formState.amount,
    //     },
    //   });
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if(!token) {
        return false;
      }

      try {
        const queryCheckout = await getCheckout({ variables: { amount: parseFloat(formState.amount) }});
        saveDonationAmount(formState.amount);
        console.log(queryCheckout);
      } catch(e) {
        console.error(e);
      }
      
    };

    useEffect(() => {
      if(data) {
        console.log(data);
        stripePromise.then(res => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    function submitCheckout() {
    }
    
    return (
    <div className="container my-1">
       <h2>Donation Cart</h2>
       <form id="donation-form" onSubmit={handleFormSubmit}>
         <div className="flex-row space-between my-2">
                <label htmlFor="amount">Donation Amount:</label>
                <input 
                    placeholder="1"
                    name="amount"
                    type="number"
                    id="amount"
                    onChange={handleChange}
                />
          </div>     
          <div className="flex-row flex-end">
          {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </form>
        </div>
    );
  }
export default DonationCart;