import React from "react";
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useParams, Redirect } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import SimpleCase from '../components/SimpleCase'

const Profile = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { _id: userParam },
    });
    const user = data?.me || {};
   
    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {

        return <Redirect to="/login" />;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?._id) {
        return (
            <h4>
                You need to be logged in to see this page. Use the navigation links above to sign up or log in!
            </h4>
        );
    }


    return (
    <div className="container" >
            <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                    <p className="text-center"> Viewing {user.first_name}'s profile.</p>
                    </h1>
                </div>
            </div>
            <div className="row g-3">
                    <div className="col-md-5 col-lg-4 ">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary text-center">Profile</span>
                            </h4>
                            <hr className="my-4"></hr>
                            <div className="col-12">
                              <h2 className="h5 mb-2  lh-1 text-left event-mgr-header">
                                 First Name: {user.first_name}
                              </h2>
                            </div>
                            <div className="col-12">
                              <h2 className="h5 mb-2  lh-1 text-left event-mgr-header">
                                  Last Name: {user.last_name}
                              </h2>
                            </div>
                            <div className="col-12">
                              <h2 className="h5 mb-2  lh-1 text-left event-mgr-header">
                                  Email: {user.email}
                              </h2>
                            </div>
                            <div className="col-12">
                              <h2 className="h5 mb-2  lh-1 text-left event-mgr-header">
                                  Phone Number: {user.contact_number}
                              </h2>
                            </div>
                            <hr className="my-4"></hr>
                                <Link to="/edit"> <br/><p className="text-center"><button className="btn btn-primary" >Edit Profile </button></p></Link>
                            <hr className="my-4"></hr>
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary text-center">Donation History</span>
                            </h4>
                               {user ? (
                                <>
                                    <h3> On Date:</h3>
                                    {user.donations.map((order) => (
                                    <div key={order._id} className="my-2">
                                        <h4>{new Date(parseInt(order.createdAt)).toLocaleDateString()}  $: {order.amount}</h4>
                                    </div>
                                    
                                    ))}
                                    
                                </>
                                ) : null}
                     </div>
                     <div className="col-md-7 col-lg-8">
                            <div className="col-md-5 col-lg-4 ">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-primary text-center">Cases you created</span>
                                    </h4>
                            </div>
                        
                            <hr className="my-4"></hr>
                            <div className="row width-100">
                               {user.created_cases.map(cases => (
                                  <div className="col-md-6 my-3 animated fadeIn text-center rounded " key={cases._id}>
                                        <SimpleCase
                                        _id={cases._id}
                                        firstname={cases.firstname}
                                        lastname={cases.lastname}
                                        age={cases.age}
                                        disappearance_date={cases.disappearance_date}
                                        last_known_location={cases.last_known_location}
                                        img_src=""
                                    ></SimpleCase>
                                  </div>         
                               ))}
                            </div>   
                            <hr className="my-4"></hr>
                    </div>
                </div>
            
    </div>
    );
};

export default Profile;