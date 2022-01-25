import React from "react";
import { Link } from "react-router-dom";

//This component would theoretically be what the user saw when browsing the homepage or looking at cases on his/her profile page
const SimpleCase = (props) => {
    //Destructure properties from props object
    const { _id, firstname, lastname, age, disappearance_date, last_known_location } = props;
    return(
        <div>
            <h3>{firstname} {lastname}</h3>
            <div className="photo-div"></div>
            <div>Age: {age}</div>
            <div>Last Seen: {disappearance_date}</div>
            <div>Location: {last_known_location}</div>
            <Link to={`/cases/${_id}`}>
                <p>See More Information</p>
            </Link>
        </div>
    );
};

export default SimpleCase;