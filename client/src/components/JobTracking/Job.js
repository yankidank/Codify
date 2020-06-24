import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import CompanyInfo from './subComponents/CompanyInfo';
import StatusBar from './subComponents/StatusBar';
import PositionCard from './subComponents/Position';
import ContactCardContainer from './subComponents/ContactCardContainer';
import InterviewCardContainer from './subComponents/InterviewCardContainer';
import OfferCardContainer from './subComponents/OfferCardContainer';
import { getJob} from '../../utils/API'


function Saved() {

  const { id } = useParams();
  const [currentStatus, setCurrentStatus ] = useState( "saved")


  useEffect(() => {
		(async () => {
      let retrievedStatus = await getJob(id);
      setCurrentStatus(retrievedStatus.data.status);
		})();
  }, []);

  useEffect(() => {
    // Textarea height expansion
    var autoExpand = function (field) {
      // Reset field height
      field.style.height = 'inherit';
      // Get the computed styles for the element
      var computed = window.getComputedStyle(field);
      // Calculate the height
      var height =
        parseInt(computed.getPropertyValue('border-top-width'), 10) +
        parseInt(computed.getPropertyValue('padding-top'), 10) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue('padding-bottom'), 10) +
        parseInt(computed.getPropertyValue('border-bottom-width'), 10);

      field.style.height = height + 'px';
    };
    document.addEventListener(
      'input',
      function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
      },
      false
    );
  }, []);

  return (
    <div className="job">
      <NavBar />
      <div className="container job-container">
        <div className="row">
          <StatusBar
            status ={currentStatus}
            first="Saved"
            second="Applied"
            third="Interview"
            fourth="Offer"
          />
          <CompanyInfo setStatus = {setCurrentStatus} />
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
