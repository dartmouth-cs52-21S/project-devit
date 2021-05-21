import React from 'react';

const Profile = (props) => {
  return (
    <div id="profile">
      <div className="left-side">
        <div className="current-projects">
          <h2>Current Projects</h2>
          <div className="project">
            <h2>LiveWell</h2>
            <div className="descriptions">
              <h3>Mobile App</h3>
              <h3>Website</h3>
              <h3>PWA</h3>
            </div>
          </div>
          <div className="project">
            <h2>Sonic</h2>
            <div className="descriptions">
              <h3>Website</h3>
              <h3>PWA</h3>
            </div>
          </div>

        </div>
        <div className="activity-container">
          <h2>Recent Activity</h2>
          <div className="activity">
            <h3>Pull request</h3>
            <p>Today, 4:22pm</p>
          </div>
          <div className="activity">
            <h3>Joined project</h3>
            <p>4/19, 2:10pm</p>
          </div>
        </div>

      </div>
      <div className="right-side">
        <img className="profile" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="profile" />
        <h1>First Last</h1>
        <h3>Location</h3>
        <div className="badges-container">
          <h3>Develop</h3>
          <div className="badges">
            <img src="../../images/cil_badge.png" alt="badge" />
            <img src="../../images/cil_badge.png" alt="badge" />
            <img src="../../images/cil_badge.png" alt="badge" />
          </div>

        </div>
        <div className="badges-container">
          <h3>Design</h3>
          <div className="badges">
            <img src="../../images/cil_badge.png" alt="badge" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
