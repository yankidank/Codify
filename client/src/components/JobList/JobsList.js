import React from 'react';
import NavBar from '../NavBar';
import List from './List';

function JobsList() {
  return (
    <div>
      <NavBar />
      <div className="container pushtop jobsList">
        <div className="row">
          <List cols="col s12 m12 l12" />
        </div>
      </div>
    </div>
  );
}

export default JobsList;
