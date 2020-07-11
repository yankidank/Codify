// puppeteer.js
// ------------
// The file serves a proxy server for retrieving data, and returns a JSON object
// Supports: BuiltIn[City].com, Indeed.com, LinkedIn, SimplyHired, Startup.Jobs, and ZipRecruiter  
// Example: localhost:4000/scrape?url=[Supported Website]

require('dotenv').config();
const express = require('express');

function puppeteerProxy() {

  // Puppeteer proxy server for web scraping
  const puppeteer = require('puppeteer');
  const puppeteer_port = process.env.PUPPETEER_PORT || 4000;
  const proxy = express();
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

      const builtIn = req.query.url.startsWith('https://www.builtin');
      const startupJobs = req.query.url.startsWith('https://startup.jobs/');
      const zipRecruiter = req.query.url.startsWith('https://www.ziprecruiter.com/');
      const indeed = req.query.url.startsWith('https://www.indeed.com/');
      const linkedIn = req.query.url.startsWith('https://www.linkedin.com/');
      const simplyHired = req.query.url.startsWith('https://www.simplyhired.com/');
      
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

      } else if (startupJobs) {
        console.log('StartupJobs...')
        await page.waitForSelector('.trix-content');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('h1.visualHeader__title')[0].innerText;
        }));

        [company, companyErr] = await handle(page.evaluate(() => {
          var companyName = document.querySelectorAll('h2.visualHeader__subtitle')[0].innerText;
          var companyCleaned = companyName.replace(" IS HIRING A", "");
          return companyCleaned;
        }));

        [city, cityErr] = await handle(page.evaluate(() => {
          var location = document.querySelectorAll('.jobListing__main__meta__location')[0].innerText;
          const locationArr = location.split(',');
          return locationArr[0];
        }));

        [remote, remoteErr] = await handle(page.evaluate(() => {
          var remoteValue = document.querySelectorAll('.jobListing__main__meta__remote')[0].innerText;
          var remoteBool = false;
          if (remoteValue === "Remote"){
            remoteBool = true;
          }
          return remoteBool;
        })); 

        [description, descriptionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.trix-content')[0].innerText;
        })); 

      } else if (zipRecruiter) {
        console.log('ZipRecruiter...');
        await page.waitForSelector('article#job_desc');
  /* 
        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.job_title')[0].innerText;
        }));
  */      
        // Grab data from the URL
        const positionStartId = '/Job/';
        const positionEndId = '/-in-';
        const positionRegex = jobUrl.match(new RegExp(positionStartId + "(.*)" + positionEndId));
        position = capitalizeWords(positionRegex[1].split("-").join(" "));
  /*    
        [company, companyErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.job_location .job_location_name')[0].innerText;
        }));
  */      
        const companyStartId = 'ziprecruiter.com/c/';
        const companyEndId = '/Job/';
        const companyRegex = jobUrl.match(new RegExp(companyStartId + "(.*)" + companyEndId));
        company = companyRegex[1].split("-").join(" ");
  /*    
        [city, cityErr] = await handle(page.evaluate(() => {
          const location = document.querySelectorAll('.job_location .job_location_city')[0].innerText;
          const locationArr = location.split(',');
          console.log('locationArr 0:'+locationArr[0])
          return capitalizeWords(locationArr[0]);
        })); 
  */
        const cityStartId = '/-in-';
        const cityEndId = ',';
        const cityRegex = jobUrl.match(new RegExp(cityStartId + "(.*)" + cityEndId));
        city = capitalizeWords(cityRegex[1].split("-").join(" "));
  /* 
        [state, stateErr] = await handle(page.evaluate(() => {
          var location = document.querySelectorAll('.job_location .job_location_city')[0].innerText;
          if (location){ 
            var stateArr = location.split(',').toUpperCase();
            return stateArr[1];
          } else {
            throw new Error('Unable to get state');
          }
        })); 
  */  
        const stateStartId = cityRegex[0];
        const stateEndId = 'jid=';
        const stateRegex = jobUrl.match(new RegExp(stateStartId + "(.*)" + stateEndId));
        state = stateRegex[1].split("-").join(" ").slice(0, -1).toUpperCase();
    
        [description, descriptionErr] = await handle(page.evaluate(() => {
          const proxyDescription = document.querySelectorAll('article#job_desc')[0].innerText;
          const finalDescription = proxyDescription.split("\nDescription:\n").pop(); // Remove extra text at the start of the string
          return finalDescription;
        })); 

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

        [salary, salaryErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('.jobsearch-JobMetadataHeader-item span')[0].innerText;
        }));

      } else if (linkedIn) {
        console.log('LinkedIn...');
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
        
      } else if (simplyHired) {
        console.log('SimplyHired');
        await page.waitForSelector('.viewjob-content');

        [position, positionErr] = await handle(page.evaluate(() => {
          return document.querySelectorAll('h2.viewjob-jobTitle')[0].innerText;
        }));
  
        [company, companyErr] = await handle(page.evaluate(() => {
          const companyName = document.querySelectorAll('.viewjob-labelWithIcon')[0].innerText.replace(' -','');
          return companyName;
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
          return document.querySelectorAll('.viewjob-jobDescription p')[0].innerText;
        }));

        [salary, salaryErr] = await handle(page.evaluate(() => {
          const salaryRaw = document.querySelectorAll('.viewjob-salary')[0].innerText;
          const salaryCleaned = salaryRaw.replace('Estimated: ','');
          console.log(salaryCleaned)
          return salaryCleaned;
        }));

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
