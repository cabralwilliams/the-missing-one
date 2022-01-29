import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;
  if (data) {
    user = data.user;
  }
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Home</Link>
        {user ? (
          <>
            <h2>
              Donation History for {user.firstName} {user.lastName}
            </h2>
            {user.donations.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.createdAt)).toLocaleDateString()}
                </h3>
                   <span>${order.amount}</span>
               </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}
export default OrderHistory;