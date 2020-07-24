import React from 'react';
import NavBar from './NavBar';

const supportedSites = [
	'Angel.co',
	'Authentic Jobs',
	'BuiltIn[City]',
	'Career Builder',
	'Craigslist',
	'Dice',
	'GitHub Jobs',
	'Glassdoor',
	'Greenhouse',
	'Indeed',
	'Jobot',
	'Lever.co',
	'LinkedIn',
	'Monster',
	'MotionRecruitment',
	'TheMuse',
	'Remote.co',
	'Resume-Library',
	'SimplyHired',
	'Snagajob',
	'StackOverflow',
	'Startup.jobs',
	'TechFetch',
	'VentureLoop',
	'WeWorkRemotely',
	'WhoIsHiring.io',
	'Working Nomads',
	'ZipRecruiter'
]

function Autofill() { 
  return (
    <div className="home">
      <NavBar />
      <div className="container pushtop">
        <div className="row">
          <div className="col s12 m12 l12 autofill-content">
            <div className="row">
              <div className="col s12">
                <h3>Autofill</h3>
              </div>
            </div>
            <div className="autofill-description">
							<p>
								Codify makes copying information from job board websites easy with Autofill. 
								To use this feature, visit the <a href="/jobs/add">Add Job</a> page and grant the site permission to access your clipboard when asked.
								When a supported URL is detected in your clipboard and imported by Autofill, a green button will appear at the bottom of the page allowing you to autocomplete input fields.
							</p>
						</div>
						<div className="row">
              <div className="col s12">
                <h4>Autofill Supports {supportedSites.length} Job Boards</h4>
              </div>
							<div className="autofill-support-list">
								<ul className="row autofill-supported">
									{supportedSites.map((site, index) => <li key={index}>{site}</li>)}
								</ul>
							</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Autofill;
