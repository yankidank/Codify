import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import CompanyInfo from './subComponents/CompanyInfo';
import StatusBar from './subComponents/StatusBar';
import PositionCard from './subComponents/Position';
import ContactCardContainer from './subComponents/ContactCardContainer';
import InterviewCardContainer from './subComponents/InterviewCardContainer';
import OfferCardContainer from './subComponents/OfferCardContainer';
import { getJob } from '../../utils/API';

function Saved() {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState('saved');

  useEffect(() => {
    (async () => {
      const retrievedStatus = await getJob(id);
      setCurrentStatus(retrievedStatus.data.status);
    })();

    // Textarea height expansion
    const autoExpand = function (field) {
      // Reset field height
      field.style.height = 'inherit';
      // Get the computed styles for the element
      const computed = window.getComputedStyle(field);
      // Calculate the height
      const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
        + parseInt(computed.getPropertyValue('padding-top'), 10)
        + field.scrollHeight
        + parseInt(computed.getPropertyValue('padding-bottom'), 10)
        + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      field.style.height = `${height}px`;
      field.style.minHeight = '31vh';
    };
    document.addEventListener(
      'input',
      (event) => {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
      },
      false
    );
    document.addEventListener(
      'click',
      (event) => {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
      },
      false
    );
  }, [id]);

  return (
    <div className="job">
      <Helmet>
        <title>Job </title>
      </Helmet>
      <NavBar />
      <div className="container job-container">
        <div className="row">
          <CompanyInfo
            id={id}
            status={currentStatus}
            setStatus={setCurrentStatus}
          />
          <StatusBar
            id={id}
            status={currentStatus}
            setStatus={setCurrentStatus}
            first="Saved"
            second="Applied"
            third="Interview"
            fourth="Offer"
          />
        </div>
        <div className="row">
          <div className="card-container">
            <PositionCard jobId={id} />
            <ContactCardContainer jobId={id} />
            <InterviewCardContainer jobId={id} />
            <OfferCardContainer jobId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Saved;
