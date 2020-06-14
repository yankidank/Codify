import React, {Component} from 'react';
import NavBar from '../NavBar';
import List from './List';

class JobsList extends Component {
  render (){
    return (
      <div>
      <NavBar />
      <div className="container pushtop jobsList">
        <div className="row">
          <List cols="col s12 m12 l12" />
        </div>
      </div>
    </div>
    )
  }
}

export default JobsList;
