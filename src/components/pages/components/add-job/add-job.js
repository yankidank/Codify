import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import M from 'materialize-css';
import { Helmet } from 'react-helmet';
import NavBar from '../../../layout/components/navbar';
import { addJob } from '../../../../utils/API';

function AddJob() {
  const [autofillBtn, setAutofillBtn] = useState({ visibility: 'hidden' }); // Hide button until data is loaded
  const [autofillClear, setAutofillClear] = useState({ visibility: 'hidden' }); // Track if form fields have been autofilled
  const [autofillLoading, setAutofillLoading] = useState({ visibility: 'hidden' }); // Autofill loading button visibility
  const [scrape, setScrape] = useState({
    companyName: '',
    position: '',
    city: '',
    state: '',
    remote: false,
    salary: '',
    url: '',
    notes: ''
  });
  const [post, setPost] = useState({
    companyName: '',
    position: '',
    city: '',
    state: '',
    status: '',
    remote: false,
    salary: '',
    url: '',
    notes: ''
  });

  const getPost = useCallback((url, trigger) => { 

    // Check if the URL is already stored
    if (scrape.url === url) {
      return scrape;
    }

    const cleanUrl = url.toLowerCase().replace('://www.', '://').trim(); // Make the URL easier to work with
    const angelCo = cleanUrl.includes('://angel.co/');
    const authenticJobs = cleanUrl.includes('authenticjobs.com/job/');
    const builtIn = cleanUrl.includes('://builtin');
    const careerBuilder = cleanUrl.includes('careerbuilder.com/job/');
    const craigslist = cleanUrl.includes('craigslist.org/');
    const dice = cleanUrl.includes('dice.com/jobs/');
    const gitHub = cleanUrl.includes('jobs.github.com/positions/');
    const glassDoor = cleanUrl.includes('glassdoor.com/job');
    const greenhouse = cleanUrl.includes('boards.greenhouse.io/');
    const indeed = cleanUrl.includes('indeed.com') && cleanUrl.includes('job');
    const jobot = cleanUrl.includes('jobot.com/details/');
    const lever = cleanUrl.includes('jobs.lever.co/');
    const linkedIn = cleanUrl.includes('linkedin.com/jobs');
    const monster = cleanUrl.includes('job-openings.monster.com/');
    const motionRecruitment = cleanUrl.includes('motionrecruitment.com/');
    const theMuse = cleanUrl.includes('themuse.com/jobs/');
    const powerToFly = cleanUrl.includes('powertofly.com/jobs/detail/');
    const remoteCo = cleanUrl.includes('remote.co/job/');
    const resumeLibrary = cleanUrl.includes('resume-library.com/job/view/');
    const simplyHired = cleanUrl.includes('simplyhired.com/job/') || cleanUrl.includes('simplyhired.com/search?');
    const snagAJob = cleanUrl.includes('snagajob.com/jobs/');
    const stackOverflow = cleanUrl.includes('stackoverflow.com/jobs/');
    const startupJobs = cleanUrl.includes('://startup.jobs/');
    const techFetch = cleanUrl.includes('techfetch.com/partner-jobs/') || cleanUrl.includes('techfetch.com/job-description/');
    const ventureLoop = cleanUrl.includes('ventureloop.com/ventureloop/job/');
    const weWorkRemotely = cleanUrl.includes('weworkremotely.com/remote-jobs/');
    const whoIsHiring = cleanUrl.includes('whoishiring.io/s/');
    const workingNomads = cleanUrl.includes('workingnomads.co/jobs?');
    const zipRecruiter = cleanUrl.includes('ziprecruiter.com/jobs/') || cleanUrl.includes('ziprecruiter.com/c/');

    if (angelCo
        || authenticJobs
        || builtIn
        || careerBuilder
        || craigslist
        || dice
        || gitHub
        || glassDoor
        || greenhouse
        || indeed
        || jobot
        || lever
        || linkedIn
        || monster
        || motionRecruitment
        || theMuse
        || powerToFly
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
    ) {
      if (scrape.url === '') {
        const scrapeSync = async () => {

          setAutofillLoading({ ...autofillLoading, visibility: 'visible' });
          setAutofillBtn({ ...autofillBtn, visibility: 'hidden' });
          setAutofillClear({ ...autofillClear, visibility: 'hidden' });
  
          // Scrape post data
          const puppeteerDomain = process.env.DOMAIN || 'http://localhost';
          let puppeteerPort = process.env.PUPPETEER_PORT || '4000';
          if (puppeteerPort === undefined) {
            puppeteerPort = '';
          } else if (puppeteerPort !== '') {
            puppeteerPort = `:${puppeteerPort}`;
          }
  
          const puppeteerUrl = `${puppeteerDomain}${puppeteerPort}/scrape?url=${url}`;
          const postResp = await fetch(puppeteerUrl);
          const postObj = await postResp.json();
  
          if (postObj.company !== undefined || postObj.position !== undefined) {
            // Store data to import on click
            const {
              company, position, city, state, remote, salary, description
            } = postObj;
  
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
  
            setAutofillLoading({ ...autofillLoading, visibility: 'hidden' });
            setAutofillBtn({ ...autofillBtn, visibility: 'visible' });
            setAutofillClear({ ...autofillClear, visibility: 'hidden' });
          } else {
            setAutofillLoading({ ...autofillLoading, visibility: 'hidden' });
            setAutofillBtn({ ...autofillBtn, visibility: 'hidden' });
            setAutofillClear({ ...autofillClear, visibility: 'hidden' });
            M.toast({ html: 'Unable to Autofill using the URL provided' });
          }
  
          const exportObj = { ...postObj, url };
          return exportObj;
        }
        scrapeSync();

      }
    } else {
      if (trigger === 'click') {
        M.toast({
          displayLength: 5000,
          html: '<span><a href="/autofill">Autofill</a><span> clipboard URL not supported',
        });
      }
      console.log('URL not supported by Autofill');
    }
  }, [autofillBtn, autofillClear, autofillLoading, scrape]);

  const autofillForm = useCallback((scrapeObj) => { 
    const inputCompanyName = document.getElementById('inputCompanyName');
    const inputPosition = document.getElementById('inputPosition');
    const inputCity = document.getElementById('inputCity');
    const inputState = document.getElementById('inputState');

    if (scrapeObj.position !== undefined) {
      const {
        company, position, city, state, remote, salary, description, url
      } = scrapeObj;
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
      if (company && !inputCompanyName.value) { inputCompanyName.value = company; }
      if (position && !inputPosition.value) { inputPosition.value = position; }
      if (city && !inputCity.value) { inputCity.value = city; }
      if (state && !inputState.value) { inputState.value = state; }
    } else {
      const {
        companyName, position, city, state, remote, salary, notes, url
      } = scrape;
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
      if (companyName && !inputCompanyName.value) { inputCompanyName.value = companyName; }
      if (position && !inputPosition.value) { inputPosition.value = position; }
      if (city && !inputCity.value) { inputCity.value = city; }
      if (state && !inputState.value) { inputState.value = state; }
    }
    setAutofillLoading({ ...autofillLoading, visibility: 'hidden' });
    setAutofillBtn({ ...autofillBtn, visibility: 'hidden' });
    setAutofillClear({ ...autofillClear, visibility: 'visible' });
  }, [autofillBtn, autofillClear, autofillLoading, post, scrape]); 

  const fetchClipboardClick = async () => {
    // Track what triggered a function call to limit toast error messages
    fetchClipboard('click');
  };

  const fetchClipboard = useCallback((trigger) => { 
    if (!navigator.clipboard) {
      // Clipboard API not available
      if (trigger === 'click') {
        M.toast({
          displayLength: 5000,
          html: '<span><a href="/autofill">Autofill</a><span> is unable to access your clipboard',
        });
      }
      return;
    }

    // Check for URL in clipboard
    navigator.clipboard
      .readText()
      .then((text) => {
        const pasteText = text.trim();
        const checkUrl = pasteText.startsWith('http');
        if (checkUrl) {
          try {
            getPost(pasteText, trigger);
          } catch (error) {
            console.log(error);
          }
        } else if (trigger === 'click') {
          M.toast({
            displayLength: 5000,
            html: '<span><a href="/autofill">Autofill</a><span> is unable to detect a URL in your clipboard',
          });
        }
      })
      .catch((error) => {
        if (trigger === 'click') {
          M.toast({
            displayLength: 5000,
            html: '<span><a href="/autofill">Autofill</a><span> is unable to access your clipboard',
          });
        }
        console.log(error);
      });
  }, [getPost]); 

  const fetchSource = useCallback((url) => { 
    const checkUrl = url.startsWith('http');
    if (checkUrl) {
      try {
        const fetchObj = getPost(url);
        return fetchObj;
      } catch (error) {
        console.log(error);
      }
    }
  }, [getPost]); 

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

    const inputCompanyName = document.getElementById('inputCompanyName');
    const inputPosition = document.getElementById('inputPosition');
    const inputCity = document.getElementById('inputCity');
    const inputState = document.getElementById('inputState');

    inputCompanyName.value = null;
    inputPosition.value = null;
    inputCity.value = null;
    inputState.value = null;

    setAutofillLoading({ ...autofillLoading, visibility: 'hidden' });
    setAutofillBtn({ ...autofillBtn, visibility: 'visible' });
    setAutofillClear({ ...autofillClear, visibility: 'hidden' });
  };

  // Hitting the Post endpoint
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const newJob = await addJob({ ...post, status: post.status || 'saved' });
      if (newJob && newJob.status === 200) {
        const { data: { _id } } = newJob;
        window.open(`/jobs/${_id}`, '_self');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPostInput = (event) => {
    const { target: { name, value } } = event;
    setPost({ ...post, [name]: value });
  };

  let autofillMessage;
  if (autofillLoading.visibility === 'visible') {
    autofillMessage = (
      <div className="row">
        <div className="col s12">
          <div className="card-button autofill-help valign-wrapper">
            <i className="material-icons animate-spin-left">loop</i>
            {' '}
            Autofill is importing the provided URL
          </div>
        </div>
      </div>
    );
  } else if (autofillBtn.visibility === 'visible') {
    autofillMessage = (
      <div className="row">
        <div className="col s12">
          <div className="card-button btn-offer autofill-help valign-wrapper" onClick={autofillForm}>
            <i className="material-icons">next_week</i>
            {' '}
            Click to Autofill Job from
            {' '}
            { scrape.companyName || scrape.url.replace('//www.', '').replace('http:', '').replace('https:', '').split(/[/?#]/)[0].substring(0, 20) }
          </div>
        </div>
      </div>
    );
  } else if (autofillClear.visibility === 'visible') {
    autofillMessage = (
      <div className="row">
        <div className="col s12">
          <div className="card-button autofill-help valign-wrapper" onClick={formClear}>
            <i className="material-icons">assignment_turned_in</i>
            {' '}
            Autofill Complete! Click again to empty fields
          </div>
        </div>
      </div>
    );
  } else {
    autofillMessage = (
      <div className="row">
        <div className="col s12">
          <div className="card-button autofill-help valign-wrapper" onClick={fetchClipboardClick}>
            <i className="material-icons">assignment</i>
            {' '}
            Autofill fields by copying a supported URL to your device&apos;s clipboard, then click here
          </div>
        </div>
      </div>
    );
  }

  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');

  useEffect(() => {
    if (source !== null && !scrape.url) {
      const fetchData = async () => {
        const fetch = await fetchSource(source);
        const autofill = autofillForm(fetch);
        return autofill;
      };
      fetchData();  
    } else if (!scrape.url && autofillLoading.visibility === 'hidden') {
      fetchClipboard('auto');
    }
  }, [scrape, source, autofillForm, autofillLoading, fetchClipboard, fetchSource]);

  return (
    <div>
      <Helmet>
        <title>Track a New Job</title>
      </Helmet>
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
                    <input name="companyName" id="inputCompanyName" className="validate" type="text" onChange={onPostInput} />
                    <label htmlFor="inputCompanyName" className={post.companyName ? 'active' : ''}>Company Name</label>
                  </div>
                  <div className="input-field col s12 l6">
                    <input name="position" id="inputPosition" className="validate" type="text" onChange={onPostInput} />
                    <label htmlFor="inputPosition" className={post.position ? 'active' : ''}>Position Title</label>
                  </div>
                  <div className="input-field col s8 l6">
                    <input name="city" id="inputCity" className="validate" type="text" onChange={onPostInput} />
                    <label htmlFor="inputCity" className={post.city ? 'active' : ''}>City</label>
                  </div>
                  <div className="input-field col s4 l6">
                    <input name="state" id="inputState" className="validate" type="text" onChange={onPostInput} />
                    <label htmlFor="inputState" className={post.state ? 'active' : ''}>State</label>
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
