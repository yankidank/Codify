import React from 'react';
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
          <div className="col s12 m12 l12 dashboard-content">
            <div className="row">
              <div className="col s12 m6 l6">
                <h3>Gain Insights</h3>
                <p>Analyze activity and measure your success at a glance. Data is knowledge and knowledge is power.</p>
              </div>
              <div className="col s12 m6 l6">
                <div className="row card-image">
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
            <div className="col s12 m12 l6">
              <h3>Manage Contacts</h3>
              <p>Save the company hiring manager&apos;s contact information and add other key references for each company.</p>
            </div>
            <div className="col s12 m12 l6">
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
                  <input className="col s6 m6 l6" placeholder="Full Name"></input>
                  <input className="col s6 m6 l6" placeholder="Position"></input>
                  <input className="col s6 m6 l6" placeholder="Email@address.tld"></input>
                  <input className="col s6 m6 l6" placeholder="(800) 555-1234"></input>
                  <textarea placeholder="Notes"></textarea>
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
