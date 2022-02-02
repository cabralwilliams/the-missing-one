import React, {useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useParams, Redirect } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import SimpleCase from '../components/SimpleCase'
import { UPDATEUSER } from '../utils/mutations';

const S3_BUCKET = "missingone";



const Profile = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { _id: userParam },
    });
    const user = data?.me || {};
    console.log(user)
    //initialized vars to be use when editing the profile
    const [formState, setFormState] = useState({ first_name: user.first_name, last_name: user.last_name, email: user.email, contact_number: user.contact_number });
    const [updateUser, { error }] = useMutation(UPDATEUSER);

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


    //use for modal when editing profile
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          console.log(formState)
          const mutationResponse = await updateUser({
            variables: {
              first_name: formState.first_name, last_name: formState.last_name,
              email: formState.email, contact_number: formState.contact_number
    
            },
          })
        //   if (mutationResponse) {
        //      window.location.replace('/Profile')
        //   }
        } catch (e) {
          console.log(e);
        };
    };

    //use for modal when editing profile
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    

    return (
   <div>
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
                            {/* Here, it is when we invoke the modal for edit profile */}
                            <div className="col-md-12 text-center">
                                <button type="button" className="btn btn-primary btn-lg  text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Edit Profile
                                </button>
                            </div>
                            <hr className="my-4"></hr>
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-primary text-center">Donation History</span>
                            </h4>
                               {/* display the donations */}
                               {user ? (
                                <>
                                    <h4> On Date:</h4>
                                    <hr className="my-4"></hr>
                                    {user.donations.map((order) => (
                                        <div className="my-2"  key={order._id}>
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
                                  <div className="col-md-6 my-3 animated fadeIn text-center rounded" key={cases._id}>
                                        <SimpleCase
                                        key={cases._id}
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

    {/* This is the modal to edit profile  */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h2 className="fw-bold mb-0" id="staticBackdropLabel">Edit Profile</h2>
        </div>
        <form className="" onSubmit={handleFormSubmit}>
          <div className="modal-body p-5 pt-0">
                <div className="form-floating mb-3">
                  <input 
                  className="form-control rounded-4"
                  value={formState.first_name}
                  name="first_name"
                  type="first_name"
                  id="first_name"
                  onChange={handleChange}
                  required
                  />
                  <label htmlFor="first name">First Name:</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                    className="form-control rounded-4"
                    value={formState.last_name}
                    name="last_name"
                    type="last_name"
                    id="last_Name"
                    onChange={handleChange}
                    required
                    />
                    <label htmlFor="last_name">Last Name:</label>
                </div>
                <div className="form-floating mb-3">
                      <input
                        className="form-control rounded-4"
                        value={formState.contact_number}
                        name="contact_number"
                        type="contact_number"
                        id="contact_number"
                        onChange={handleChange}
                      />
                      <label htmlFor="contact_number">Phone:</label>
                </div>
                <div className="form-floating mb-3">
                      <input
                        className="form-control rounded-4"
                        value={formState.email}
                        name="email"
                        type="email"
                        id="email"
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email">Email:</label>
               </div>
            </div>
            <div className="modal-footer">
                  <button className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit" data-bs-dismiss="modal">Save Changes</button>
                  <button className="w-100 mb-2 btn btn-lg rounded-4 btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
      </div>
    </div>
    </div>
  </div>
   );
};

export default Profile;