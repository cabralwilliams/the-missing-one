import React from "react";
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { useParams, Redirect } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
const Profile = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { _id: userParam },
    });
    const user = data?.me || {};
    console.log(user);
    
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
        <div>
            <div className="flex-row mb-3">
                <h2 className=" text-secondary p-3 display-inline-block">
                    Viewing {user.first_name}'s profile.
                </h2>
            </div>

            <div >
                <h4>Personal Information</h4>
                First Name: {user.first_name}<br />
                Last Name: {user.last_name}<br />
                Email :{user.email}<br />
                Phone Number :{user.contact_number}<br />
                {user.created_cases.length > 0 && (
                    <div className="container">
                        Cases you created :
                        <div className="row">
                       { user.created_cases.map (cases =>(
                           
                           <div className="col-sm">
                           <li>First name: {cases.firstname}</li>
                           <li>Last name: {cases.lastname}</li>
                           <li>Age:{cases.age}</li>
                           <li> Last seen Location:{cases.last_known_location}</li>
                             <li>Dissapeared on: {cases.disappearance_date}</li>
                             </div>
                        
                       ) ) }
                       </div>
                   

                    </div>
                )}

                <div>
                   <Link to ="/edit"> <button className="btn btn-primary" >Edit Profile </button></Link>
                </div>


            </div>
        </div>

    );
};

export default Profile;