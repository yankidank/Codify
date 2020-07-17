import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"
import M from "materialize-css";

function AddJob() {

  const [autofillBtn, setAutofillBtn] = useState({visibility:'hidden'}); // Hide button until data is loaded
  const [autofillClear, setAutofillClear] = useState({visibility:'hidden'}); // Track if form fields have been autofilled
  const [autofillLoading, setAutofillLoading] = useState({visibility:'hidden'}); // Autofill loading button visibility

  const [scrape, setScrape] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    remote: false,
    salary: "",
    url: "",
    notes: ""
  });

  const [post, setPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    status: "",
    remote: false,
    salary: "",
    url: "",
    notes: ""
  });

  const getPost = async function (url) {
    // Check if values have already been stored
    if (scrape.url === url){
      return scrape;
    } else {

      const cleanUrl = url.toLowerCase().replace("://www.", "://").trim();

      // Check if URL is supported
      const angelCo = cleanUrl.includes('://angel.co/');
      const builtIn = cleanUrl.includes('://builtin');
      const craigslist = cleanUrl.includes('craigslist.org/');
      const gitHub = cleanUrl.includes('jobs.github.com/positions/');
      const glassDoor = cleanUrl.includes('glassdoor.com/job');
      const indeed = cleanUrl.includes('indeed.com') && cleanUrl.includes('job');
      const linkedIn = cleanUrl.includes('linkedin.com/jobs');
      const simplyHired = cleanUrl.includes('simplyhired.com/job/') || cleanUrl.includes('simplyhired.com/search?');
      const snagAJob = cleanUrl.includes('snagajob.com/jobs/');
      const stackOverflow = cleanUrl.includes('stackoverflow.com/jobs/');
      const startupJobs = cleanUrl.includes('://startup.jobs/');
      const zipRecruiter = cleanUrl.includes('ziprecruiter.com/jobs/') || cleanUrl.includes('ziprecruiter.com/c/');
      
      if ( angelCo || builtIn || craigslist || gitHub || glassDoor || indeed || linkedIn || simplyHired || snagAJob || stackOverflow || startupJobs || zipRecruiter){
        // Company name input field .value check
        const inputCompanyName = document.getElementById('inputCompanyName');
        if (!inputCompanyName.value && scrape.url === ''){
          setAutofillLoading({...autofillLoading, visibility:"visible"});
          setAutofillBtn({...autofillBtn, visibility:"hidden"});
          setAutofillClear({...autofillClear, visibility:"hidden"});
          // Scrape post data
          const puppeteerDomain = process.env.DOMAIN || 'http://localhost';
          let puppeteerPort = process.env.PUPPETEER_PORT || '4000';
          if (puppeteerPort === undefined) {
            puppeteerPort = '';
          } else if (puppeteerPort !== ''){
            puppeteerPort = ':'+puppeteerPort;
          }
          const puppeteerUrl = puppeteerDomain + puppeteerPort + '/scrape?url=' + url;
          const postResp = await fetch(puppeteerUrl);
          const postObj = await postResp.json();
          if (postObj.company !== undefined || postObj.position !== undefined){
            // Store data to import on click
            const {company, position, city, state, remote, salary, description} = postObj;
            setScrape({
              companyName: company,
              position: position,
              city: city,
              state: state,
              remote: remote,
              salary: salary,
              notes: description,
              url: url
            });
            setAutofillLoading({...autofillLoading, visibility:"hidden"});
            setAutofillBtn({...autofillBtn, visibility:"visible"});
            setAutofillClear({...autofillClear, visibility:"hidden"});
          } else {
            setAutofillLoading({...autofillLoading, visibility:"hidden"});
            setAutofillBtn({...autofillBtn, visibility:"hidden"});
            setAutofillClear({...autofillClear, visibility:"hidden"});
            M.toast({ html: 'Unable to Autofill using the URL provided' });
          }
          const exportObj = {...postObj, url: url}
          return exportObj;
        } else {
          return;
        }
      } else {
        //M.toast({ html: 'Clipboard URL not supported by Autofill' });
        console.log('Clipboard URL not supported by Autofill');
      }
    }
  };

  const autofillForm = async function () {
    let {companyName, position, city, state, remote, salary, notes, url} = scrape;
    setPost({
      ...post, 
      companyName: companyName, 
      position: position,
      city: city,
      remote: remote,
      salary: salary,
      state: state,
      notes: notes,
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
    setAutofillLoading({...autofillLoading, visibility:"hidden"});
    setAutofillBtn({...autofillBtn, visibility:"hidden"});
    setAutofillClear({...autofillClear, visibility:"visible"});
  }
  
  const fetchClipboard = async function () {
    if (!navigator.clipboard) {
      // Clipboard API not available
      M.toast({ html: 'Unable to access clipboard' });
      return;
    }
    // Check for URL in clipboard
    navigator.clipboard
    .readText()
    .then(async text => {
      const pasteText = text.trim();
      // Check that the clipboard holds a link
      const checkUrl = pasteText.startsWith('http');
      if (checkUrl) { 
        const returnPost = await getPost(pasteText);
        return returnPost;       
      }
    })
    .catch(err => {
      //M.toast({ html: 'Unable to read clipboard' });
      console.log(err);
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
      remote: false,
      salary: null,
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
    setAutofillLoading({...autofillLoading, visibility:"hidden"});
    setAutofillBtn({...autofillBtn, visibility:"visible"});
    setAutofillClear({...autofillClear, visibility:"hidden"});
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

  var autofillMessage;
  if (autofillLoading.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper"><i className="material-icons animate-spin-left">loop</i> Autofill is importing the URL from your device&apos;s clipboard</div></div></div>;
  } else if (autofillBtn.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button btn-offer autofill-help valign-wrapper" onClick={autofillForm}><i className="material-icons">next_week</i> Click to Autofill { scrape.companyName || scrape.url.replace('//www.','').replace('http:','').replace('https:','').split(/[/?#]/)[0].substring(0,20) } Job</div></div></div>;
  } else if (autofillClear.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper" onClick={formClear}><i className="material-icons">assignment_turned_in</i> Autofill Complete! Click to Undo</div></div></div>;
  } else {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper" onClick={fetchClipboard}><i className="material-icons">assignment</i> Autofill fields by copying a supported URL to your device&apos;s clipboard, then click here</div></div></div>;
  }
  
  useEffect(() => {
    if (!scrape.url){
      fetchClipboard();
    }
  },[scrape] );

  return (
    <div>
      <NavBar />
      <div className="container menuNav add-new-job">
        <div className="row">
          <div className="card-container">
            <div className="col s12">
              <div className="row card-image">
                <div className="col s12 card-title">
                  Add New Job
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
        {autofillMessage}
      </div>
    </div>
  );
}

export default AddJob;
