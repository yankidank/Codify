import React, { useEffect, useState } from 'react';
import {useLocation} from "react-router-dom";
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"
import M from "materialize-css";

function AddJob() {

  const [autofillBtn, setAutofillBtn] = useState({visibility:'hidden'}), // Hide button until data is loaded
        [autofillClear, setAutofillClear] = useState({visibility:'hidden'}), // Track if form fields have been autofilled
        [autofillLoading, setAutofillLoading] = useState({visibility:'hidden'}), // Autofill loading button visibility
        [scrape, setScrape] = useState({
          companyName: "",
          position: "",
          city: "",
          state: "",
          remote: false,
          salary: "",
          url: "",
          notes: ""
        }),
        [post, setPost] = useState({
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
        
  const getPost = async (url) => {

    // Check if the URL is already stored
    if (scrape.url === url){
      return scrape;
    } else {

      const cleanUrl = url.toLowerCase().replace("://www.", "://").trim(), // Make the URL easier to work with
            angelCo = cleanUrl.includes('://angel.co/'),
            authenticJobs = cleanUrl.includes('authenticjobs.com/job/'),
            builtIn = cleanUrl.includes('://builtin'),
            careerBuilder = cleanUrl.includes('careerbuilder.com/job/'),
            craigslist = cleanUrl.includes('craigslist.org/'),
            dice = cleanUrl.includes('dice.com/jobs/'),
            gitHub = cleanUrl.includes('jobs.github.com/positions/'),
            glassDoor = cleanUrl.includes('glassdoor.com/job'),
            indeed = cleanUrl.includes('indeed.com') && cleanUrl.includes('job'),
            jobot = cleanUrl.includes('jobot.com/details/'),
            lever = cleanUrl.includes('jobs.lever.co/'),
            linkedIn = cleanUrl.includes('linkedin.com/jobs'),
            motionRecruitment = cleanUrl.includes('motionrecruitment.com/'),
            theMuse = cleanUrl.includes('themuse.com/jobs/'),
            remoteCo = cleanUrl.includes('remote.co/job/'),
            resumeLibrary = cleanUrl.includes('resume-library.com/job/view/'),
            simplyHired = cleanUrl.includes('simplyhired.com/job/') || cleanUrl.includes('simplyhired.com/search?'),
            snagAJob = cleanUrl.includes('snagajob.com/jobs/'),
            stackOverflow = cleanUrl.includes('stackoverflow.com/jobs/'),
            startupJobs = cleanUrl.includes('://startup.jobs/'),
            techFetch = cleanUrl.includes('techfetch.com/partner-jobs/') || cleanUrl.includes('techfetch.com/job-description/'),
            ventureLoop = cleanUrl.includes('ventureloop.com/ventureloop/job/'),
            weWorkRemotely = cleanUrl.includes('weworkremotely.com/remote-jobs/'),
            whoIsHiring = cleanUrl.includes('whoishiring.io/s/'),
            workingNomads = cleanUrl.includes('workingnomads.co/jobs?'),
            zipRecruiter = cleanUrl.includes('ziprecruiter.com/jobs/') || cleanUrl.includes('ziprecruiter.com/c/');
      
      if ( angelCo 
        || authenticJobs 
        || builtIn 
        || careerBuilder 
        || craigslist 
        || dice 
        || gitHub 
        || glassDoor 
        || indeed 
        || jobot 
        || lever 
        || linkedIn 
        || motionRecruitment
        || theMuse 
        || remoteCo 
        || resumeLibrary 
        || simplyHired 
        || snagAJob 
        || stackOverflow 
        || startupJobs 
        || techFetch 
        || ventureLoop
        || weWorkRemotely 
        || whoIsHiring 
        || workingNomads 
        || zipRecruiter
        ){
        
        if (scrape.url === ''){

          setAutofillLoading({...autofillLoading, visibility:"visible"});
          setAutofillBtn({...autofillBtn, visibility:"hidden"});
          setAutofillClear({...autofillClear, visibility:"hidden"});
          
          // Scrape post data
          const puppeteerDomain = process.env.DOMAIN || 'http://localhost';
          let puppeteerPort = process.env.PUPPETEER_PORT || '4000';
          if (puppeteerPort === undefined) {
            puppeteerPort = '';
          } else if (puppeteerPort !== ''){
            puppeteerPort = `:${puppeteerPort}`;
          }

          const puppeteerUrl = `${puppeteerDomain}${puppeteerPort}/scrape?url=${url}`,
                postResp = await fetch(puppeteerUrl),
                postObj = await postResp.json();
          
          if (postObj.company !== undefined || postObj.position !== undefined){
            
            // Store data to import on click
            const {company, position, city, state, remote, salary, description} = postObj;
            
            setScrape({
              companyName: company,
              position,
              city,
              state,
              remote,
              salary,
              notes: description,
              url
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
        //M.toast({ html: 'URL not supported by Autofill' });
        console.log('URL not supported by Autofill');
      }
    }
  };

  const autofillForm = async (scrapeObj) => {

    const inputCompanyName = document.getElementById('inputCompanyName'),
          inputPosition = document.getElementById('inputPosition'),
          inputCity = document.getElementById('inputCity'),
          inputState = document.getElementById('inputState');
    
    if (scrapeObj.position !== undefined){

      let {company, position, city, state, remote, salary, description, url} = await scrapeObj;
      setPost({
        ...post, 
        companyName: company, 
        position,
        city,
        remote,
        salary,
        state,
        notes: description,
        url
      });

      // Update the input field values
      if (company && !inputCompanyName.value){ inputCompanyName.value = company }
      if (position && !inputPosition.value){ inputPosition.value = position }
      if (city && !inputCity.value){ inputCity.value = city }
      if (state && !inputState.value){ inputState.value = state }

    } else {

      let {companyName, position, city, state, remote, salary, notes, url} = scrape;
      setPost({
        ...post, 
        companyName, 
        position,
        city,
        remote,
        salary,
        state,
        notes,
        url
      });

      // Update the input field values
      if (companyName && !inputCompanyName.value){ inputCompanyName.value = companyName }
      if (position && !inputPosition.value){ inputPosition.value = position }
      if (city && !inputCity.value){ inputCity.value = city }
      if (state && !inputState.value){ inputState.value = state }

    }
    setAutofillLoading({...autofillLoading, visibility:"hidden"});
    setAutofillBtn({...autofillBtn, visibility:"hidden"});
    setAutofillClear({...autofillClear, visibility:"visible"});

  }
  
  const fetchClipboard = async () => {

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
      const checkUrl = pasteText.startsWith('http');
      if (checkUrl) {
        try{
          await getPost(pasteText);
        } catch (error) {
          console.log(error);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });

  }

  const fetchSource = async (url) => {
    const checkUrl = url.startsWith('http');
    if (checkUrl) {
      try{
        let fetchObj = await getPost(url);
        return fetchObj;
      } catch (error) {
        console.log(error);
      }
    }
  }

  const formClear = async () => {

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

    const inputCompanyName = document.getElementById('inputCompanyName'),
          inputPosition = document.getElementById('inputPosition'),
          inputCity = document.getElementById('inputCity'),
          inputState = document.getElementById('inputState');

    inputCompanyName.value = null;
    inputPosition.value = null;
    inputCity.value = null;
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

  let autofillMessage;
  if (autofillLoading.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper"><i className="material-icons animate-spin-left">loop</i> Autofill is importing the provided URL</div></div></div>;
  } else if (autofillBtn.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button btn-offer autofill-help valign-wrapper" onClick={autofillForm}><i className="material-icons">next_week</i> Click to Autofill Job from { scrape.companyName || scrape.url.replace('//www.','').replace('http:','').replace('https:','').split(/[/?#]/)[0].substring(0,20) }</div></div></div>;
  } else if (autofillClear.visibility === 'visible') {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper" onClick={formClear}><i className="material-icons">assignment_turned_in</i> Autofill Complete! Click again to empty fields</div></div></div>;
  } else {
    autofillMessage = <div className="row"><div className="col s12"><div className="card-button autofill-help valign-wrapper" onClick={fetchClipboard}><i className="material-icons">assignment</i> Autofill fields by copying a supported URL to your device&apos;s clipboard, then click here</div></div></div>;
  }

  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');

  useEffect(() => {
    if(source !== null && !scrape.url){
      const fetchData = async () => {
        let fetch = await fetchSource(source);
        let autofill = await autofillForm(fetch);
        return autofill;
      }
      fetchData();
    } else if (!scrape.url){
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
                  <div className="input-field col s8 l6">
                    <input name="city" id="inputCity" className="validate" type="text" onChange={onPostInput}></input>
                    <label htmlFor="inputCity" className={post.city ? "active" : ""}>City</label>
                  </div>
                  <div className="input-field col s4 l6">
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
