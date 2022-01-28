import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
//import { ADD_DONATION} from '../utils/mutations';
import Auth from '../utils/auth';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const DonationCart = () => {
    const [formState, setFormState] = useState({ amount: 1});    

   // const [addDonation] = useMutation(ADD_DONATION);
 
    const handleFormSubmit = async (event) => {
      event.preventDefault();
    //   const mutationResponse = await addDonation({
    //     variables: {
    //       amount: formState.amount,
    //     },
    //   });
      
    };
  
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
                <label htmlFor="Amount">Donation Amount:</label>
                <input 
                    placeholder="1"
                    name="amaount"
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