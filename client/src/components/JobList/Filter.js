import React, { useEffect } from 'react';

function Filter() {
  useEffect(() => {
    // Toggle Filter Visibility
    const dropdown = document.getElementById('filter-toggle');
    const container = document.getElementById('filter-container');
    let hidden = container.classList.contains("hidden");
    dropdown.addEventListener(
      'click',
      function () {
        // if filter is open
        if(hidden){
          dropdown.classList.add('filter-active');
          container.classList.remove('hidden');
          hidden = false;
        } else {
          console.log('hide')
          dropdown.classList.remove('filter-active');
          container.classList.add('hidden');
          hidden = true;
        }
      },
      false
    );
  });

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
            <button className="btn-saved">Saved</button>
          </div>
          <div className="btn-filter" id="filter-applied">
            <button className="btn-applied">Applied</button>
          </div>
          <div className="btn-filter" id="filter-interview">
            <button className="btn-interview">Interview</button>
          </div>
          <div className="btn-filter" id="filter-offer">
            <button className="btn-offer">Offer</button>
          </div>
          <div className="btn-filter" id="filter-ended">
            <button className="btn-ended btn-filter-disabled">Ended</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
