import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import _ from 'lodash';
import OfferCard from './OfferCard';
import { getOffers, updateOffer, addOffer } from '../../../utils/API';
import convertMoneyToNumber from '../../../utils/formatCleave';

function OfferCardContainer() {
  const [offers, setOffers] = useState([{ salary: '', bonus: '', benefits: '' }]);

  const { id } = useParams();

  const debouncedUpdateOffer = useCallback(_.debounce(updateOffer, 500), []);

  useEffect(() => {
    (async () => {
      const retrievedOffers = await getOffers(id);
      if (retrievedOffers.length > 0) setOffers(retrievedOffers);
    })();
  }, []);

  const handleInputChange = async (event, index, offerId) => {
    const newOffers = [...offers];
    const shortName = event.target.name;
    newOffers[index][shortName] = event.target.value;

    if (offerId) {
      const {
        date, startDate, salary, bonus, benefits
      } = newOffers[index];
      const formattedDate = new Date(date);
      const formattedStartDate = new Date(startDate);
      const formattedSalary = convertMoneyToNumber(salary);
      const formattedBonus = convertMoneyToNumber(bonus);
      const formattedOffer = {
        date: formattedDate,
        startDate: formattedStartDate,
        salary: formattedSalary,
        bonus: formattedBonus,
        benefits
      };
      debouncedUpdateOffer(formattedOffer, id, index);
    }

    setOffers(newOffers);
  };

  const addOfferField = () => {
    const newOffer = { salary: '', bonus: '', benefits: '' };
    const newOfferArr = [...offers, newOffer];
    setOffers(newOfferArr);
  };

  const addNewOffer = async (index) => {
    const {
      startDate, date, salary, bonus, benefits
    } = offers[index];
    const formattedSalary = convertMoneyToNumber(salary);
    const formattedBonus = convertMoneyToNumber(bonus);

    if (startDate || date || formattedSalary || formattedBonus || benefits) {
      const formattedDate = date && new Date(date);
      const formattedStartDate = startDate && new Date(startDate);
      const formattedOffer = {
        date: formattedDate,
        startDate: formattedStartDate,
        salary: formattedSalary,
        bonus: formattedBonus,
        benefits
      };

      await addOffer(formattedOffer, id);

      const newOffers = await getOffers(id);
      setOffers(newOffers);
    } else {
      M.toast({ html: 'Please fill out at least one field' });
    }
  };

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">Offers</div>
        <div className="col s6">
          <div className="card-button" id="new-contact-btn" onClick={addOfferField}>
            Add Offer
          </div>
        </div>
      </div>
      {offers.map((offer, index) => {
        const {
          startDate, date, salary, bonus, benefits
        } = offer;
        return (
          <OfferCard
            key={offer._id || index}
            startDate={startDate}
            date={date}
            salary={salary}
            bonus={bonus}
            benefits={benefits}
            index={index}
            _id={offer._id}
            handleInputChange={handleInputChange}
            addNewOffer={addNewOffer}
          />
        );
      })}
    </div>
  );
}

export default OfferCardContainer;
