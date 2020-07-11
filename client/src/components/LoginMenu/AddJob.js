import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"
import M from "materialize-css";
require('dotenv').config();

function AddJob() {
  const [post, setPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    status: "",
    url: ""
  });

  var getPost = async function (url) {
    // Get the post data
    const puppeteerDomain = process.env.DOMAIN || 'http://localhost';
    var puppeteerPort = process.env.PUPPETEER_PORT || 4000;
    puppeteerPort = puppeteerPort.toString();
    const puppeteerScrape = 'scrape';
    const puppeteerUrl = puppeteerDomain+':'+ puppeteerPort +'/'+ puppeteerScrape +'?url='+url;
    //console.log(puppeteerUrl)
    var postResp = await fetch(puppeteerUrl);
    var postObj = await postResp.json();
    //console.table(postObj);
    let {company, position, city, state, description} = postObj;
    setPost({
      ...post, 
      companyName: company, 
      position: position,
      city: city,
      state: state,
      notes: description,
      url: url
    });
    const inputCompanyName = document.getElementById('inputCompanyName');
    inputCompanyName.value = postObj.company;
    const inputPosition = document.getElementById('inputPosition');
    inputPosition.value = postObj.position;
    const inputCity = document.getElementById('inputCity');
    inputCity.value = postObj.city;
    const inputState = document.getElementById('inputState');
    inputState.value = postObj.state;
    M.toast({ html: 'Data Imported from Clipboard URL' });
  };

  var fetchClipboard = async function () {
    navigator.clipboard
    .readText()
    .then(text => {
      const pasteText = text.trim();
      // Check that the clipboard holds a link
      const checkUrl = pasteText.startsWith('http');
      if (checkUrl) {  
        getPost(pasteText);        
      }
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
  }

  // Hitting the Post endpoint
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let newJob = await addJob({ ...post, status: post.status || 'saved' })
      if (newJob && newJob.status === 200) {
        const { data: { _id }} = newJob;
        window.open(`/jobs/${_id}`, '_self');
      }
    }
    catch (error){
      console.error(error);
    }
  }

  const onPostInput = event => {
    const { target: { name, value }} = event;
    setPost({ ...post, [name]: value})
  }

  useEffect(() => {
    // handleAdd();

    // Attempt to read clipboard text
    window.addEventListener('load', fetchClipboard);

  });

  return (
    <div>
      <NavBar />
      <div className="menuNav container">
        <div className="row card-image">
          <div className="col s12 card-title card-title-add-job">
            Add New Job
          </div>
        </div>
        <div className="card-add-job card card-padded">
          <div className="row">
            <div className="col s12 m12 l6">
              <input className="menu-input-field" placeholder="Company Name" name="companyName" id="inputCompanyName" onChange={onPostInput}></input>
            </div>
            <div className="col s12 m12 l6">
              <input className="menu-input-field" placeholder="Position" name="position" id="inputPosition" onChange={onPostInput}></input>
            </div>
            <div className="col s6 m6 l6">
              <input className="menu-input-field" placeholder="City" name="city" id="inputCity" onChange={onPostInput}></input>
            </div>
            <div className="col s6 m6 l6">
              <input className="menu-input-field" placeholder="State" name="state" id="inputState" onChange={onPostInput}></input>
            </div>
            <div className="col s12">
              <a href="/jobs/add" className="button btn-job-add" onClick={handleAdd}>
                Save Job
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
