import React from 'react';
import NavBar from '../NavBar';
import CompanyInfo from './subComponents/CompanyInfo';
import StatusBar from './subComponents/StatusBar';
import PositionCard from './subComponents/Position';
import ContactCard from './subComponents/Contact';
import InterviewCard from './subComponents/Interview';
import OfferCard from './subComponents/Offer';

function Saved() {
  return (
    <div className="job">
      <NavBar />
      <div className="container job-container">
        <div className="row">
          <CompanyInfo />
          <StatusBar state="saved" />
          <PositionCard />
          <ContactCard />
          <InterviewCard />
          <OfferCard />
        </div>
      </div>
    </div>
  );
}

export default Saved;
