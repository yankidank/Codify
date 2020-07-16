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
            M.toast({ html: 'Unable to autofill job details' });
          }
          const exportObj = {...postObj, url: url}
          return exportObj;
        } else {
          return;
        }
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
    //M.toast({ html: 'Data Imported from Clipboard URL' });

  }
  
  const fetchClipboard = async function () {
    if (!navigator.clipboard) {
      // Clipboard API not available
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
    //M.toast({ html: 'Form Input Fields Cleared' });
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
  
  useEffect(() => {
    if (!scrape.url){
      fetchClipboard();
    }
  },[scrape] );

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
                  <div id="autofill-loading" className={`card-button animate-loading ${autofillLoading.visibility}`}>
                    <div className="animate-text-loading">Loading</div>
                  </div>
                  <div onClick={autofillForm} id="autofill-button" className={`card-button btn-offer ${autofillBtn.visibility}`}>
                    Autofill { scrape.companyName || scrape.url.replace('//www.','').replace('http:','').replace('https:','').split(/[/?#]/)[0].substring(0,20) } Job
                  </div>
                  <div onClick={formClear} id="autofill-clear" className={`card-button ${autofillClear.visibility}`}>
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
        {autofillBtn.visibility === 'hidden' &&
          <div className="row">
            <div className="col s12 autofill-help">
              Autofill available when a supported URL is copied to your device's clipboard
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default AddJob;
