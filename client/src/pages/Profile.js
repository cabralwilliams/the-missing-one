import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { useParams, Redirect } from 'react-router-dom';
import { QUERY_ME} from '../utils/queries';

const Profile = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME ,{
        variables: {  _id: userParam},
    });
    const user = data?.me || {};
    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
        return <Redirect to="/profile" />;
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



    return(
        
        <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing `${user.first_name}'s`  profile.
        </h2>

        </div>
    );
};

export default Profile;