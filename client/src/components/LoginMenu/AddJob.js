import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"
import M from "materialize-css";
require('dotenv').config();

function AddJob() {
  const [autofillBtn, setAutofillBtn] = useState('hidden'); // Hide button until data is loaded
  const [autofillCheck, setAutofillCheck] = useState('hidden'); // Track if form fields have been autofilled
  const [scrape, setScrape] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    url: ""
  });
  const [post, setPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    status: "",
    url: ""
  });

  const getPost = async function (url) {
    // Check if URL is supported
    const builtIn = url.startsWith('https://www.builtin');
    const indeed = url.startsWith('https://www.indeed.com/');
    const linkedIn = url.startsWith('https://www.linkedin.com/');
    const simplyHired = url.startsWith('https://www.simplyhired.com/');
    const startupJobs = url.startsWith('https://startup.jobs/');
    const zipRecruiter = url.startsWith('https://www.ziprecruiter.com/');

    if (builtIn || indeed || startupJobs || zipRecruiter || linkedIn || simplyHired){
      // Scrape post data
      const puppeteerDomain = process.env.DOMAIN || 'http://localhost';
      let puppeteerPort = process.env.PUPPETEER_PORT || 4000;
      puppeteerPort = puppeteerPort.toString();
      const puppeteerScrape = 'scrape';
      const puppeteerUrl = puppeteerDomain+':'+ puppeteerPort +'/'+ puppeteerScrape +'?url='+url;
      const postResp = await fetch(puppeteerUrl);
      const postObj = await postResp.json();
      if (postObj.company !== undefined || postObj.position !== undefined){        
        // Store data to import on click
        const {company, position, city, state, description} = postObj;
        setScrape({
          companyName: company, 
          position: position,
          city: city,
          state: state,
          notes: description,
          url: url
        });
        // autofill button visibility
        setAutofillBtn('visible')
      } else {
        M.toast({ html: 'Unable to import job data' });
      }
      const exportObj = {...postObj, url: url}
      return exportObj;
    }
  };

  // Click to autofill form function
  const autofillForm = async function () {
    console.log('autofill click')
    console.table(scrape)
    let {companyName, position, city, state, description, url} = scrape;

    setPost({
      ...post, 
      companyName: companyName, 
      position: position,
      city: city,
      state: state,
      notes: description,
      url: url
    });

    // Update the input field values
    const inputCompanyName = document.getElementById('inputCompanyName');
    if (companyName){ inputCompanyName.value = companyName;}
    const inputPosition = document.getElementById('inputPosition');
    if (position){ inputPosition.value = position;}
    const inputCity = document.getElementById('inputCity');
    if (city){ inputCity.value = city;}
    const inputState = document.getElementById('inputState');
    if (state){ inputState.value = state;}
    //M.toast({ html: 'Data Imported from Clipboard URL' });
    setAutofillBtn('hidden');
    setAutofillCheck('visible')
  }

  const fetchClipboard = async function () {
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

  const formClear = async function () {
    // Clear all input fields
    setPost({
      ...post, 
      companyName: null, 
      position: null,
      city: null,
      state: null,
      notes: null,
      url: null
    });
    const inputCompanyName = document.getElementById('inputCompanyName');
    inputCompanyName.value = null;
    const inputPosition = document.getElementById('inputPosition');
    inputPosition.value = null;
    const inputCity = document.getElementById('inputCity');
    inputCity.value = null;
    const inputState = document.getElementById('inputState');
    inputState.value = null;
    //M.toast({ html: 'Form Input Fields Cleared' });
    setAutofillBtn('visible');
    setAutofillCheck('hidden');
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
    // Attempt to read clipboard text
    window.addEventListener("load", fetchClipboard);
    return () => {
      window.removeEventListener("load", fetchClipboard);
    };
    
  });

  return (
    <div>
      <NavBar />
      <div className="container menuNav">
        <div className="row">
          <div className="card-container">
            <div className="col s12">
              <div className="row card-image">
                <div className="col s6 card-title">
                  Add New Job
                </div>
                <div className="col s6">
                  <div onClick={autofillForm} id="autofill-button" className={`card-button ${autofillBtn}`}>
                    Autofill {scrape.companyName} Job
                  </div>
                  <div onClick={formClear} id="autofill-clear" className={`card-button ${autofillCheck}`}>
                    Clear All
                  </div>
                </div>
              </div>
              <div className="card card-padded card-add-job">
                <div className="row">
                  <div className="input-field col s12 l6">
                    <input name="companyName" id="inputCompanyName" className="validate" type="text" onChange={onPostInput}></input>
                    <label htmlFor="inputCompanyName" className={post.companyName ? "active" : ""}>Company Name</label>
                  </div>
                  <div className="input-field col s12 l6">
                    <input name="position" id="inputPosition" className="validate" type="text" onChange={onPostInput}></input>
                    <label htmlFor="inputPosition" className={post.position ? "active" : ""}>Position Title</label>
                  </div>
                  <div className="input-field col s12 l6">
                    <input name="city" id="inputCity" className="validate" type="text" onChange={onPostInput}></input>
                    <label htmlFor="inputCity" className={post.city ? "active" : ""}>City</label>
                  </div>
                  <div className="input-field col s12 l6">
                    <input name="state" id="inputState" className="validate" type="text" onChange={onPostInput}></input>
                    <label htmlFor="inputState" className={post.state ? "active" : ""}>State</label>
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
        </div>
      </div>
    </div>
  );
}

export default AddJob;
