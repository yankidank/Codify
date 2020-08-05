import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import M from 'materialize-css';
import _ from 'lodash';
import InterviewCard from './InterviewCard';
import { getInterviews, addInterview, updateInterview } from '../../../utils/API';

const debouncedUpdateInterview = _.debounce(updateInterview, 500);

function InterviewCardContainer() {
  const [interviews, setInterviews] = useState([
    {
      date: '', time: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: ''
    }
  ]);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const retrievedInterviews = await getInterviews(id);
      if (retrievedInterviews.length > 0) {
        const formattedInterviews = retrievedInterviews.map((interview) => {
          const {
            date, time,
            location: {
              remote, street, city, state, zip
            },
            notes,
            _id
          } = interview;
          return {
            date, time, remote, street, city, state, zip, notes, _id
          };
        });
        setInterviews(formattedInterviews);
      }
    })();
  }, [id]);

  const handleInputChange = async (event, index, interviewId) => {
    const newInterviews = [...interviews];
    const shortName = event.target.name;
    newInterviews[index][shortName] = event.target.value;

    if (interviewId) {
      const {
        date, time, remote, street, city, state, zip, notes
      } = newInterviews[index];
      const formattedDate = new Date(date);
      const formattedInterview = {
        date: formattedDate,
        time,
        location: {
          remote, street, city, state, zip
        },
        notes
      };
      debouncedUpdateInterview(formattedInterview, id, index);
    }

    setInterviews(newInterviews);
  };

  const addInterviewField = () => {
    const newInterview = {
      date: '', time: '', remote: false, street: '', city: '', state: '', zip: '', notes: '', _id: ''
    };
    const newInterviewArr = [...interviews, newInterview];
    setInterviews(newInterviewArr);
  };

  const addNewInterview = async (index) => {
    const {
      date, time, remote, street, city, state, zip, notes
    } = interviews[index];
    if (date || time || remote || street || city || state || zip || notes) {
      const formattedDate = new Date(date);
      const formattedInterview = {
        date: formattedDate,
        time,
        location: {
          remote, street, city, state, zip
        },
        notes
      };
      await addInterview(formattedInterview, id);
      const newInterviews = await getInterviews(id);
      const formattedInterviews = newInterviews.map((interview) => {
        const {
          date, time,
          location: {
            remote, street, city, state, zip
          },
          notes,
          _id
        } = interview;
        return {
          date, time, remote, street, city, state, zip, notes, _id
        };
      });
      setInterviews(formattedInterviews);
    } else {
      M.toast({ html: 'Please fill out at least one field' });
    }
  };

  return (
    <div className="col s12 m12 l6">
      <div className="row card-image">
        <div className="col s6 card-title">Interviews</div>
        <div className="col s6">
          <div onClick={addInterviewField} className="card-button" id="new-interview-btn">
            Add Interview
          </div>
        </div>
      </div>
      {interviews.map((interview, index) => {
			  const {
          date, time, remote, street, city, state, zip, notes
        } = interview;
			  return (
  <InterviewCard
    key={interview._id || index}
    _id={interview._id}
    date={date}
    time={time}
    remote={remote}
    street={street}
    city={city}
    state={state}
    zip={zip}
    notes={notes}
    index={index}
    addNewInterview={addNewInterview}
    handleInputChange={handleInputChange}
  />
			  );
      })}
    </div>
  );
}

export default InterviewCardContainer;
