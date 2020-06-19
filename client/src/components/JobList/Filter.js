import React, { useEffect } from 'react';

function Filter({ handleFilterChange }) {
  useEffect(() => {
    // Toggle Filter Visibility
    const dropdown = document.getElementById('filter-toggle');
    const container = document.getElementById('filter-container');
    let hidden = container.classList.contains('hidden');
    dropdown.addEventListener(
      'click',
      function () {
        // if filter is open
        if (hidden) {
          dropdown.classList.add('filter-active');
          container.classList.remove('hidden');
          hidden = false;
        } else {
          console.log('hide');
          dropdown.classList.remove('filter-active');
          container.classList.add('hidden');
          hidden = true;
        }
      },
      false
    );
    container.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', event => {
        //handle click
        console.log(button);
        button.classList.toggle('active')
      }, false)
    })
  }, []);

  return (
    <div>
      <div className="row row-filter">
        <div className="col l12 card-filter" id="filter-toggle">
          Filter <i className="material-icons">keyboard_arrow_down</i>
        </div>
      </div>
      <div className="row hidden" id="filter-container">
        <div className="col l12 filter-tags">
          <div className="btn-filter" id="filter-saved">
            <button
              className="btn-saved"
              name="saved"
              onClick={() => handleFilterChange("saved")}
            >
              Saved
            </button>
          </div>
          <div className="btn-filter" id="filter-applied">
            <button
              className="btn-applied"
              name="applied"
              onClick={() => handleFilterChange("applied")}
            >
              Applied
            </button>
          </div>
          <div className="btn-filter" id="filter-interview">
            <button
              className="btn-interview"
              name="interview"
              onClick={() => handleFilterChange("interview")}
            >
              Interview
            </button>
          </div>
          <div className="btn-filter" id="filter-offer">
            <button
              className="btn-offer"
              name="offer"
              onClick={() => handleFilterChange("offer")}
            >
              Offer
            </button>
          </div>
          <div className="btn-filter" id="filter-ended">
            <button
              className="btn-ended btn-filter-disabled"
              name="ended"
              onClick={() => handleFilterChange("ended")}
            >
              Ended
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
