import React from 'react';
//Import the CaseList - a list of Card-like displays composed of the SimpleCase component
import CaseList from '../components/CaseList';
const photoUrl = "https://missingone.s3.amazonaws.com/0.jpg"

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-space-between">
          <h2>List of Missing People</h2>
          <img
              alt="image 0"
              src={photoUrl}
          />
        </div>     
    </main>
  );
};
export default Home;
