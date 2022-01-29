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
        <section className="container" >
            <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div class="lh-1">
                    <h1 className=" h3 mb-0 text-center lh-1 event-mgr-header text-primary">
                    <p className ="text-center"> Viewing {user.first_name}'s profile.</p>
                    </h1>
                </div>
            </div>


            <div className="col-lg-8 col-xl-6 bg-purple rounded shadow-sm">
                <h1 className="h5 mb-2  lh-1 text-left event-mgr-header">

                   <p> First Name: {user.first_name}</p></h1>
                <h1 className="h5 mb-2  lh-1 text-left event-mgr-header">

                <p> Last Name: {user.last_name}</p></h1>

              <p>  <h1 className="h5 mb-2  lh-1 text-left event-mgr-header">

                    Email :{user.email}</h1></p>
               <p> <h1 className="h5 mb-2  lh-1 text-left event-mgr-header">

                    Phone Number :{user.contact_number}<br/></h1></p><br/>


            </div>
            {user.created_cases.length > 0 && (
                <div className="container">
                <div className="d-flex row justify-content-md-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                    <h1 className=" h3 mb-0  lh-1 event-mgr-header text-primary">
                    <br/>
                    <p className="text-center">  Cases you created </p>
                    </h1>
                    </div>

                    <div className="row width-80">
                        {user.created_cases.map(cases => (
                            <div className="col-md-4 my-3 animated fadeIn text-center rounded "
                                 key={cases._id}
                            >
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


                        ))} </div>
                </div>)}

            <Link to="/edit"> <br/><p className="text-center"><button className="btn btn-primary" >Edit Profile </button></p></Link>


        </section >



    );
};

export default Profile;