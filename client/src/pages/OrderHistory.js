import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Moment from "react-moment";


function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  return (
    <>
      <div className="container my-1">

        {user ? (
          <>
               <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                    <p className="text-center"> Viewing Donation's History for {user.first_name} {user.last_name}.</p>
                    </h1>
                </div>
              </div>
            {user.donations.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  On Day {new Date(parseInt(order.createdAt)).toLocaleDateString()} you donated the amount of: 
               
                   <span>${order.amount}</span>
                   </h3>
               </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
export default OrderHistory;