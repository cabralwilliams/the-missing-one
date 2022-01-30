import React, {useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';

import { QUERY_CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import { saveDonationAmount } from '../utils/helpers';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DonationCart = () => {
    const [formState, setFormState] = useState({ amount: 1});
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    const handleFormSubmit = async (event) => {
      event.preventDefault();

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

    return (
      <section className="container" >
            <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                    <p className="text-center"> Viewing Donation's Cart.</p>
                    </h1>
                </div>
            </div>
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
          <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
              <div className="flex-row flex-end text-center">
                  {Auth.loggedIn() ? (
                      <button className= "btn btn-primary" onClick={handleFormSubmit}>Checkout</button>
                    ) : (
                      <span className='text-black'>(Please log in to check out)</span>
                    )}
              </div>
        </div>
     </section>   
    );
  }
export default DonationCart;