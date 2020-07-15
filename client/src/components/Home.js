import React, {useState} from 'react';
import NavBar from './NavBar';
import { Doughnut } from 'react-chartjs-2';

const state = {
  labels: ['Applied', 'Interviews', 'Offers'],
  datasets: [
    {
      label: 'Application Overview',
      backgroundColor: ['#05ACE1', '#32CEC5', '#2ED47A'],
      data: [160, 56, 16],
    },
  ],
};

function Home() {
  const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : '';
  const [autofillBtn, setAutofillBtn] = useState({visibility:'visible'}); // Hide button until data is loaded
  const [autofillClear, setAutofillClear] = useState({visibility:'hidden'}); // Track if form fields have been autofilled

  const scrape = {
    companyName: "Hulu",
    position: "Full Stack Developer",
    city: "Santa Monica",
    state: "CA",
  };

  const [dummyPost, setDummyPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
  });

  const onPostInput = event => {
    const { target: { name, value }} = event;
    setDummyPost({ ...dummyPost, [name]: value})
  }
  
  const autofillForm = async function () {
    let {companyName, position, city, state} = scrape;
    setDummyPost({
      ...dummyPost, 
      companyName: companyName, 
      position: position,
      city: city,
      state: state,
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
    setAutofillBtn({...autofillBtn, visibility:"hidden"});
    setAutofillClear({...autofillClear, visibility:"visible"});
  }

  const formClear = async function () {
    // Clear all input fields
    setDummyPost({
      ...dummyPost, 
      companyName: null, 
      position: null,
      city: null,
      state: null,
    });
    const inputCompanyName = document.getElementById('inputCompanyName');
    inputCompanyName.value = null;
    const inputPosition = document.getElementById('inputPosition');
    inputPosition.value = null;
    const inputCity = document.getElementById('inputCity');
    inputCity.value = null;
    const inputState = document.getElementById('inputState');
    inputState.value = null;
    setAutofillBtn({...autofillBtn, visibility:"visible"});
    setAutofillClear({...autofillClear, visibility:"hidden"});
  }

  return (
    <div className="home">
      <NavBar />
      <div className="container pushtop dashboard">
        <div className="row">
          <div className="col s12 m12 l12 dashboard-content">
            <div className="row">
              <div className="col s12">
                <h2>Begin Your Job Hunt</h2>
              </div>
            </div>
            <div className="home-intro">
             <p><a href="/menu/login">Create an account</a> and begin tracking job posts, applications, contacts, interviews, and offers. Stay organized throughout your job hunt.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-login">
        <div className="container-full">
          <div className="container dashLogin">
            <h4 className="text-center">Sign Up</h4>
            <p className="text-center">Quickly create an account and login using the following services</p>
            <ul className="menuNav home-menuNav">
              <li>
                <a href={`${domain}/auth/github`} className="button btn-github">
                  <div className="btn-logo">
                    <img src="/assets/img/icon-github.png" alt="GitHub"></img>
                  </div>
                  <div className="btn-title">Login with GitHub</div>
                </a>
              </li>
              <li>
                <a href={`${domain}/auth/linkedin`} className="button btn-linkedin">
                  <div className="btn-logo">
                    <img src="/assets/img/icon-linkedin.png" alt="LinkedIn"></img>
                  </div>
                  <div className="btn-title">Login with LinkedIn</div>
                </a>
              </li>
              <li>
                <a href={`${domain}/auth/google`} className="button btn-google">
                  <div className="btn-logo">
                    <img src="/assets/img/icon-google.png" alt="Google"></img>
                  </div>
                  <div className="btn-title">Login with Google</div>
                </a>
              </li>
            </ul>
            <h4 className="text-center">Track Jobs</h4>
            <p className="text-center">Save job post URLs and track the position all the way to a job offer</p>
            <div className="row">
              <div className="col s0 m1 l2"></div>
              <div className="col s12 m10 l8 home-jobslist-col">
                <div className="card card-home-jobslist">
                  <div className="container container-full container-home-jobs">
                    <div className="card-content">
                      <div className="row card-inner">
                        <div className="col s3 m2 l2 company-image">
                          <img src="/assets/img/company-icons/apple.png" alt="Apple" className="company-img-src" />
                        </div>
                        <div className="col s5 m6 l7 company-details">
                          <a href="/jobs/add">
                            <h3>Apple</h3>
                            <p>Senior Full Stack Developer</p>
                            <p>Cupertino, CA</p>
                          </a>
                        </div>
                        <div className="col s4 m4 l3 btn-status">
                          <button className="btn-saved">Saved</button>
                        </div>
                      </div>
                      <div className="row card-inner">
                        <div className="col s3 m2 l2 company-image">
                          <img src="/assets/img/company-icons/spotify.png" alt="Spotify" className="company-img-src" />
                        </div>
                        <div className="col s5 m6 l7 company-details">
                          <a href="/jobs/add">
                            <h3>Spotify</h3>
                            <p>Back End Developer</p>
                            <p>New York, NY</p>
                          </a>
                        </div>
                        <div className="col s4 m4 l3 btn-status">
                          <button className="btn-applied">Applied</button>
                        </div>
                      </div>
                      <div className="row card-inner">
                        <div className="col s3 m2 l2 company-image">
                          <img src="/assets/img/company-icons/snap.png" alt="Snap" className="company-img-src" />
                        </div>
                        <div className="col s5 m6 l7 company-details">
                          <a href="/jobs/1">
                            <h3>Snap</h3>
                            <p>Full Stack Developer</p>
                            <p>Santa Monica, CA</p>
                          </a>
                        </div>
                        <div className="col s4 m4 l3 btn-status">
                          <button className="btn-applied">Applied</button>
                        </div>
                      </div>
                      <div className="row card-inner">
                        <div className="col s3 m2 l2 company-image">
                          <img src="/assets/img/company-icons/tiktok.png" alt="TikTok" className="company-img-src" />
                        </div>
                        <div className="col s5 m6 l7 company-details">
                          <a href="/jobs/add">
                            <h3>TikTok</h3>
                            <p>Product Designer</p>
                            <p>Los Angeles, CA</p>
                          </a>
                        </div>
                        <div className="col s4 m4 l3 btn-status">
                          <button className="btn-offer">Offer</button>
                        </div>
                      </div>
                      <div className="row card-inner">
                        <div className="col s3 m2 l2 company-image">
                          <img src="/assets/img/company-icons/postmates.png" alt="Postmates" className="company-img-src" />
                        </div>
                        <div className="col s5 m6 l7 company-details">
                          <a href="/jobs/add">
                            <h3>Postmates</h3>
                            <p>Software Engineer, Backend</p>
                            <p>Los Angeles, CA</p>
                          </a>
                        </div>
                        <div className="col s4 m4 l3 btn-status">
                          <button className="btn-saved">Saved</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s1 m1 l2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pushtop dashboard">
        <div className="row">
          <div className="col s12 dashboard-content">
          <div className="row">
              <div className="col s12 m6">
                <h3>Autofill</h3>
                <p>Add new jobs with ease by autofilling information from popular job boards. This feature checks your clipboard for a URL from the following sites:</p>
                <p style={{opacity:0.6}}>Angel.co, BuiltIn, Craigslist, GitHub Jobs, GlassDoor, Indeed, LinkedIn, SimplyHired, SnagAJob, StackOverflow, StartupJobs, and ZipRecruiter</p>
              </div>
              <div className="col s12 m6">
                <div className="row card-image" style={{marginTop:30}}>
                  <div className="col s6 card-title">
                    Add New Job
                  </div>
                  <div className="col s6">
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
                      <label htmlFor="inputCompanyName" className={dummyPost.companyName ? "active" : ""}>Company Name</label>
                    </div>
                    <div className="input-field col s12 l6">
                      <input name="position" id="inputPosition" className="validate" type="text" onChange={onPostInput}></input>
                      <label htmlFor="inputPosition" className={dummyPost.position ? "active" : ""}>Position Title</label>
                    </div>
                    <div className="input-field col s12 l6">
                      <input name="city" id="inputCity" className="validate" type="text" onChange={onPostInput}></input>
                      <label htmlFor="inputCity" className={dummyPost.city ? "active" : ""}>City</label>
                    </div>
                    <div className="input-field col s12 l6">
                      <input name="state" id="inputState" className="validate" type="text" onChange={onPostInput}></input>
                      <label htmlFor="inputState" className={dummyPost.state ? "active" : ""}>State</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6 l6">
                <h3>Gain Insights</h3>
                <p>Analyze activity and measure your success at a glance. Data is knowledge and knowledge is power.</p>
              </div>
              <div className="col s12 m6 l6">
                <div className="row card-image" style={{marginTop:25}}>
                  <div className="col s12 card-title">Analytics</div>
                </div>
                <div className="card card-padded card-doughnut">
                  <div className="offerInputs">
                    <Doughnut
                      data={state}
                      options={{
                        title: {
                          display: false,
                          text: 'Application Overview',
                          fontSize: 20,
                        },
                        legend: {
                          display: true,
                          position: 'top',
                        },
                        cutoutPercentage: 77,
                        maintainAspectRatio: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l6">
                <h3>Manage Contacts</h3>
                <p>Save the company hiring manager&apos;s contact information and add other key references for each company.</p>
              </div>
              <div className="col s12 m12 l6" style={{marginTop:25}}>
                <div className="row card-image">
                  <div className="col s6 card-title">Contacts</div>
                  <div className="col s6">
                    <a href="/jobs/add" className="card-button" id="new-contact-btn">
                      Add Contact
                    </a>
                  </div>
                </div>
                <div className="card card-padded card-contact">
                  <div className="contactInputs">
                    <div className="input-field col s6">
                        <input name="home-contact-name" id="home-contact-name" className="validate" type="text" />
                        <label htmlFor="home-contact-name">Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="home-contact-position" id="home-contact-position" className="validate" type="text" />
                        <label htmlFor="home-contact-position">Position</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="home-contact-email" id="home-contact-email" className="validate" type="text" />
                        <label htmlFor="home-contact-email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="home-contact-phone" id="home-contact-phone" className="validate" type="text" />
                        <label htmlFor="home-contact-phone">Phone</label>
                    </div>
                    <div className="input-field col s12">
                        <textarea name="home-contact-textarea" id="home-contact-textarea" className="validate materialize-textarea" type="text" />
                        <label htmlFor="home-contact-textarea">Notes</label>
                    </div>
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

export default Home;
