import React from "react";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "K.KANISTAN",
    regNo: "2021E064",
    image: "/images/kanistan.jpg",
    linkedin: "https://www.linkedin.com/in/kanistan",
  },
  {
    name: "P.POGITHA",
    regNo: "2021E112",
    image: "/images/pogitha.jpg",
    linkedin: "https://www.linkedin.com/in/member2",
  },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        We are a dedicated team working on efficient page replacement
        algorithms.
      </p>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img
              src={member.image}
              alt={member.name}
              className="profile-image"
            />
            <h3>{member.name}</h3>
            <p>{member.regNo}</p>
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
