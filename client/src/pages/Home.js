import React from 'react';
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
