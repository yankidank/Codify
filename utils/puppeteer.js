// puppeteer.js
// ------------
// The file serves a proxy server for retrieving data, and returns a JSON object
// Supports: BuiltIn[City].com, GitHub.com, Indeed.com, LinkedIn, SimplyHired, Startup.Jobs, and ZipRecruiter  
// Example: localhost:4000/scrape?url=[Supported Website]

const express = require('express');
const cors = require('cors');

function puppeteerProxy() {

  const puppeteer = require('puppeteer');
  const domainName = process.env.DOMAIN || 'http://localhost';
  let domainPortBack = process.env.PORT || '3001';
  let domainPortFront = process.env.FRONTEND_PORT || '3000';
  let puppeteer_port = process.env.PUPPETEER_PORT || '4000';

  let whitelist = [domainName, domainName+':'+domainPortFront, domainName+':'+domainPortBack, domainName+':'+puppeteer_port]
  const proxy = express();
  proxy.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(whitelist.indexOf(origin) === -1){
        var message = 'The CORS policy does not allow this origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }));

  const { performance } = require('perf_hooks'); // Performance testing

  // Async error handling
  const handle = (promise) => {
    return promise
      .then(data => ([data, undefined]))
      .catch(error => Promise.resolve([undefined, error]));
  }

  // Uppercase first letters
  function capitalizeWords(str){
    var lowerCase = str.toLowerCase();
    str = lowerCase.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }

  // Start puppeteer proxy server
  proxy
    .get('/scrape', async (req, res) => {

      const t0 = performance.now(); // Start performance timer

      let pageObject = {}; // Holds job details for final output
      let [position, positionErr, company, companyErr, city, cityErr, state, stateErr, country, countryErr, remote, remoteErr, description, descriptionErr, salary, salaryErr] = '';
      
      // Retrieve the job post URL
      const scrapeUrl = req.originalUrl;
      const jobUrl = scrapeUrl.replace('/scrape?url=', '' )
      
      const browser = await puppeteer.launch({
        //headless:false,
        ignoreHTTPSErrors: true,
        args :[
          '--ignore-certificate-errors',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--lang=ja,en-US;q=0.9,en;q=0.8',
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        ]
      });

      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(20000);

      // Ignore images and CSS
      await page.setRequestInterception(true);
      page.on('request', req => {
        if (req.resourceType() === 'font'
          || req.resourceType() === 'image' 
          || req.resourceType() === 'manifest'
          || req.resourceType() === 'media' 
          || req.resourceType() === 'stylesheet')
          req.abort();
        else
          req.continue();
      });

      await page.goto(jobUrl , {
        //waitUntil: 'load',
        //timeout: 0
      });
      //await page.waitFor(20000); // Pause for testing
      
      const cleanUrl = req.query.url.toLowerCase().replace("://www.", "://").trim();

      const builtIn = cleanUrl.includes('://www.builtin') || cleanUrl.includes('://builtin');
      const craigslist = cleanUrl.includes('craigslist.org/');
      const gitHub = cleanUrl.includes('jobs.github.com/positions/');
      const glassDoor = cleanUrl.includes('glassdoor.com/job');
      const indeed = cleanUrl.includes('indeed.com/jobs') || cleanUrl.includes('indeed.com/viewjob');
      const linkedIn = cleanUrl.includes('linkedin.com/jobs');
      const simplyHired = cleanUrl.includes('simplyhired.com/job/');
      const startupJobs = cleanUrl.includes('://startup.jobs/');
      const zipRecruiter = cleanUrl.includes('ziprecruiter.com/jobs/') || cleanUrl.includes('ziprecruiter.com/c/');
      
      if (builtIn && craigslist && gitHub && glassDoor && indeed && linkedIn && simplyHired && startupJobs && zipRecruiter === false){
        // Unsupported URL, exit
        return;
      }

      if (builtIn) {
        console.log('BuiltIn...')
        await page.waitForSelector('.job-info');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.field--name-title')[0].innerText;
        }));

        [company, companyErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.field--name-field-company .field__item a')[0].innerText;
        }));

        [city, cityErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.job-info .company-address')[0].innerText;
        }));

        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.job-description')[0].innerText;
        }));

      } else if (craigslist) {
        console.log('Craigslist...')
        await page.waitForSelector('section#postingbody');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('#titletextonly')[0].innerText;
        }));

/*         [company, companyErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.field--name-field-company .field__item a')[0].innerText;
        })); */

        [city, cityErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('meta[name="geo.placename"]')[0].content;
        }));

        [state, stateErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('meta[name="geo.region"]')[0].content.replace("US-", "");
        }));

        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('section#postingbody')[0].innerText.replace('QR Code Link to This Post', '').trim();
        }));

      } else if (gitHub) {
        console.log('GitHub...');
        await page.waitForSelector('#page');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('#page .inner h1')[0].innerText;
        }));
  
        [company, companyErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.logo .inner h2')[0].innerText.replace('\n', '').trim().split("other job ").pop();
        }));
  
        [city, cityErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('#page .inner .supertitle')[0].innerText;
          const locationArr = location.split('/');
          if (locationArr[1].includes(',')){
            // Split between City and State
            const locationSplit = locationArr[1].split(',');
            return locationSplit[0].trim();
          } else {
            return locationArr[1].trim();
          }
        }));

        [state, stateErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('#page .inner .supertitle')[0].innerText;
          const locationArr = location.split('/');
          if (locationArr[1].includes(',')){
            // Split between City and State
            const locationSplit = locationArr[1].split(',');
            return locationSplit[1].trim();
          }
        }));

        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('#page .inner .generic .main')[0].innerText;
        }));
        
      } else if (glassDoor) {
        console.log('GlassDoor...');

        // Determine search or single view
        const singleJob = cleanUrl.includes('glassdoor.com/job/');
        const listingJob = cleanUrl.includes('glassdoor.com/job-listing/');

        if (singleJob){
          // Single View
          await page.waitForSelector('#JobDescriptionContainer');
          
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.empInfo .title')[0].innerText;
          }));

          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.empInfo .employerName')[0].innerHTML.split('<span ')[0];
          }));

          [city, cityErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.empInfo .location')[0].innerText;
            if (location.includes(',')){
              // Split between City and State
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          }));

          [state, stateErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.empInfo .location')[0].innerText;
            if (location.includes(',')){
              // Split between City and State
              const locationArr = location.split(',');
              return locationArr[1];
            } else {
              return;
            }
          }));

          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.jobDescriptionContent')[0].innerText;
          }));
          
        } else if (listingJob) {

          await page.waitForSelector('#JobDescriptionContainer');
        
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q5')[0].innerText;
          }));
  
          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.pb .flex-column .e11nt52q1')[0].innerHTML.split('<span ')[0];
          }));
  
          [city, cityErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q2')[0].innerText;
            if (location.includes(',')){
              // Split between City and State
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          }));
  
          [state, stateErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q2')[0].innerText;
            if (location.includes(',')){
              // Split between City and State
              const locationArr = location.split(',');
              return locationArr[1];
            } else {
              return;
            }
          }));
  
          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('#JobDescriptionContainer div .desc')[0].innerText;
          }));
        }

      } else if (indeed) {
        console.log('Indeed...')
        await page.waitForSelector('#jobDescriptionText');
        
        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.jobsearch-JobInfoHeader-title-container .jobsearch-JobInfoHeader-title')[0].innerText;
        }));

        [company, companyErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.jobsearch-InlineCompanyRating div')[0].innerText;
        }));

        [city, cityErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[2].innerText;
          const locationArr = location.split(',');
          return locationArr[0];
        }));

        [state, stateErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[2].innerText;
          const stateArr = location.split(',');
          return stateArr[1];
        }));
        
        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('#jobDescriptionText')[0].innerText;
        }));

      } else if (linkedIn) {
        console.log('LinkedIn...');

        // Determine search or single view
        const checkView = cleanUrl.includes('linkedin.com/jobs/view/');
       
        if (checkView){
          // Single view URL
          await page.waitForSelector('body');
          
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('h3.sub-nav-cta__header')[0].innerText;
          }));

          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.topcard__flavor a.topcard__org-name-link')[0].innerText;
          }));
 
          [city, cityErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          }));

          [state, stateErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              if (locationArr.length === 2){
                return locationArr[1];
              } 
            } else {
              return;
            }
          }));

          [country, countryErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              if (locationArr.length === 3){
                return locationArr[2];
              } 
            } else {
              return;
            }
          }));
          
          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.show-more-less-html__markup')[0].innerText;
          }));

        } else {

          await page.waitForSelector('section.description');
          
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('h2.topcard__title')[0].innerText;
          }));

          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('h3.topcard__flavor-row span a')[0].innerText;
          }));

          [city, cityErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          }));

          [state, stateErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
            if (location.match(/,/g).length === 1){
              const locationArr = location.split(','); 
              return locationArr[1];
            }
          }));

          [country, countryErr] = await handle(page.evaluate(() => {
            const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
            const locationArr = location.split(','); 
            if (location.match(/,/g).length === 2){
              return locationArr[2];
            }
          }));
          
          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.show-more-less-html__markup')[0].innerText;
          }));

        }
        
      } else if (simplyHired) {
        console.log('SimplyHired...');

        // Single job view
        await page.waitForSelector('.viewjob-content');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('h2.viewjob-jobTitle')[0].innerText;
        }));

        [company, companyErr] = await handle(page.evaluate(() => {
          const companyEl = document.querySelectorAll('.viewjob-labelWithIcon')[0].innerText;
          const dashCheck = companyEl.charAt(companyEl.length-5); // Dash betwen company and rating
          const dotCheck = companyEl.charAt(companyEl.length-2); // Period in rating number
          let companyOut = companyEl;
          if (dashCheck === '-' && dotCheck === '.'){
            companyOut = companyOut.slice(0, -4);
          }
          if (companyOut.includes(" -")){
            companyOut = companyOut.replace(" -", "");
          }
          return companyOut.trim();
        }));
  
        [city, cityErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('.viewjob-header-companyInfo .viewjob-labelWithIcon')[1].innerText;
          const locationArr = location.split(',');
          return locationArr[0];
        }));

        [state, stateErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('.viewjob-header-companyInfo .viewjob-labelWithIcon')[1].innerText;
          const stateArr = location.split(',');
          return stateArr[1];
        }));

        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.viewjob-jobDescription .p')[0].innerText;
        }));

        [salary, salaryErr] = await handle(page.evaluate(() => {
          const salaryRaw = document.querySelectorAll('.viewjob-salary')[0].innerText;
          const salaryCleaned = salaryRaw.replace('Estimated: ','');
          return salaryCleaned;
        }));

      } else if (startupJobs) {
        console.log('StartupJobs...')
        await page.waitForSelector('.trix-content');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('h1.visualHeader__title')[0].innerText;
        }));

        [company, companyErr] = await handle(page.evaluate(() => {
          var companyName = document.querySelectorAll('h2.visualHeader__subtitle')[0].innerText;
          var companyCleaned = companyName.replace(" is hiring a", "");
          return companyCleaned;
        }));

        [city, cityErr] = await handle(page.evaluate(() => {
          var location = document.querySelectorAll('.jobListing__main__meta__location')[0].innerText;
          const locationArr = location.split(',');
          return locationArr[0];
        }));
/* 
        [remote, remoteErr] = await handle(page.evaluate(() => {
          var remoteValue = document.querySelectorAll('.jobListing__main__meta__remote')[0].innerText;
          var remoteBool = false;
          if (remoteValue === "Remote"){
            remoteBool = true;
          }
          return remoteBool;
        })); 
*/
        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.trix-content')[0].innerText;
        })); 

      } else if (zipRecruiter) {
        console.log('ZipRecruiter...');

        // Determine search or single view
        const checkView = cleanUrl.includes('ziprecruiter.com/jobs/');

        if (checkView){
          // Jobs View
          await page.waitForSelector('.jobDescriptionSection');
          
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('h1.job_title')[0].innerText;
          }));

          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.job_details_link')[0].innerText;
          }));

          [city, cityErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.location_text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          }));

          [state, stateErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.location_text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[1];
            }
          }));

          [country, countryErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.location_text')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              if (locationArr.length === 3){
                return locationArr[2];
              }
            }
          }));

          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.jobDescriptionSection')[0].innerText;
          })); 
        } else {
          // Company view
          await page.waitForSelector('#job_desc');
          
          [position, positionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('h1.job_title')[0].innerText;
          }));

          [company, companyErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('.job_location_name')[0].innerText;
          }));

          [city, cityErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.job_location_city')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[0].trim();
            } else {
              return location.trim();
            }
          }));

          [state, stateErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.job_location_city')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[1];
            }
          }));

          [country, countryErr] = await handle(page.evaluate(() => {
            var location = document.querySelectorAll('.job_location_city')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              if (locationArr.length === 3){
                return locationArr[2];
              }
            }
          }));

          [description, descriptionErr] = await handle(page.evaluate(() => {
            return document.querySelectorAll('#job_desc div')[0].innerText;
          }));
        }
        
      }

      // Error checks and pageObject value assignments
      if(companyErr){
        throw new Error('Could not fetch Company');
      } else {
        if (company){ 
          pageObject.company = company;
        }
      }

      if(positionErr){
        throw new Error('Could not fetch Position');
      } else {
        pageObject.position = position;
      }
      
      if(cityErr){
        throw new Error('Could not fetch City');
      } else {
        if (city){ 
          pageObject.city = city;
        }
      }

      if(stateErr){
        throw new Error('Could not fetch State');
      } else {
        if (state){ 
          pageObject.state = state;
        }
      }

      if(countryErr){
        throw new Error('Could not fetch State');
      } else {
        if (country){ 
          pageObject.country = country;
        }
      }

      if(remoteErr){
        throw new Error('Could not fetch Remote');
      } else {
        if (remote){
          pageObject.remote = remote;
        }
      }

      if(descriptionErr){
        throw new Error('Could not fetch Description');
      } else {
        pageObject.description = description;
      }

      if(salaryErr){
        throw new Error('Could not fetch Salary');
      } else {
        pageObject.salary = salary;
      }
      
      // Return data object as string
      res.end(JSON.stringify(pageObject));

      // Close connection
      await browser.close();

      const t1 = performance.now();
      console.log("Proxy call took " + (t1 - t0) + " milliseconds.");

    })
    .on("error", async (err) => {
      //await page.close();
      console.log(err);
    })
    .listen(puppeteer_port, function() {
      console.log(`Puppeteer running on port ${puppeteer_port}`);
    });
  // proxy End
}

module.exports = puppeteerProxy;
