import React from 'react';
import NavBar from '../NavBar';
import CompanyInfo from './subComponents/CompanyInfo';
import StatusBar from './subComponents/StatusBar';
import Position from './subComponents/Position';
import Contact from './subComponents/Contact';
import NewContactBtn from './subComponents/NewContactBtn';
import NewOfferBtn from './subComponents/NewOfferBtn';
import OfferInputs from './subComponents/Offer';

function Offer() {
  return (
    <div className="offer">
      <NavBar />
      <div className="container">
        <div className="row">
          <CompanyInfo />
          <StatusBar state="offer" />
          <NewOfferBtn />
          <OfferInputs />
          <Position />
          <NewContactBtn />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default Offer;
