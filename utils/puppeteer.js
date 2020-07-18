// puppeteer.js
// ------------
// The file serves a proxy server for retrieving data, and returns a JSON object
// Supports: BuiltIn[City].com, GitHub.com, Indeed.com, LinkedIn, SimplyHired, Startup.Jobs, and ZipRecruiter  
// Example: localhost:4000/scrape?url=[Supported Website]

const express = require('express'),
      cors = require('cors');

function puppeteerProxy() {

  const proxy = express(),
        puppeteer = require('puppeteer'),
        domainName = process.env.DOMAIN || 'http://localhost',
        domainPortBack = process.env.PORT || '3001',
        domainPortFront = process.env.FRONTEND_PORT || '3000',
        puppeteer_port = process.env.PUPPETEER_PORT || '4000',
        maxTime = 10000; // Timeout max milliseconds
  const whitelist = [domainName, `${domainName}:${domainPortFront}`, `${domainName}:${domainPortBack}`, `${domainName}:${puppeteer_port}` ]
  
  proxy.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(whitelist.indexOf(origin) === -1){
        const message = 'The CORS policy does not allow this origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }));

  const { performance } = require('perf_hooks'); // Performance testing

  // Start puppeteer proxy server
  proxy
    .get('/scrape', async (req, res) => {

      const t0 = performance.now(); // Start performance timer

      let pageObject = {}, // Holds job details for final output
          [ position, company, city, state, zip, country, remote, description, salary ] = '';
      
      // Retrieve the job post URL
      const scrapeUrl = req.originalUrl;
      const jobUrl = scrapeUrl.replace('/scrape?url=', '' );
      const cleanUrl = jobUrl.toLowerCase().replace('://www.', '://').trim();  

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
      page.setDefaultNavigationTimeout(maxTime);

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
      
      try {
        await page.goto(jobUrl , {
          //waitUntil: 'load',
          timeout: maxTime
        });
      } catch (error) {
        console.log(error);
        browser.close();
      }

      //await page.waitFor(20000); // Pause for testing
      
      const angelCo = cleanUrl.includes('://angel.co/'),
            builtIn = cleanUrl.includes('://builtin'),
            craigslist = cleanUrl.includes('craigslist.org/'),
            gitHub = cleanUrl.includes('jobs.github.com/positions/'),
            glassDoor = cleanUrl.includes('glassdoor.com/job'),
            indeed = cleanUrl.includes('indeed.com') && cleanUrl.includes('job'),
            linkedIn = cleanUrl.includes('linkedin.com/jobs'),
            simplyHired = cleanUrl.includes('simplyhired.com/job/') || cleanUrl.includes('simplyhired.com/search?'),
            snagAJob = cleanUrl.includes('snagajob.com/jobs/'),
            stackOverflow = cleanUrl.includes('stackoverflow.com/jobs/'),
            startupJobs = cleanUrl.includes('://startup.jobs/'),
            zipRecruiter = cleanUrl.includes('ziprecruiter.com/jobs/') || cleanUrl.includes('ziprecruiter.com/c/');
      
      if (angelCo && builtIn && craigslist && gitHub && glassDoor && indeed && linkedIn && simplyHired && snagAJob && stackOverflow && startupJobs && zipRecruiter === false){
        // Unsupported URL, exit
        return;
      }

      if (angelCo) {
        console .log('Angel.co...');
        
        try{
          await page.waitForSelector('#main', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('[data-test="JobDetail"] div div div h2')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }
        
        try{
          company = await page.evaluate(() => {
            return document.querySelectorAll('[data-test="Masthead"] div div div div h1 a')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }
        
        try{
          city = await page.evaluate(() => {
            const location = document.querySelectorAll('[class^="sidebar_"] [class^="characteristic_"] dd [class^="component_"] span')[0].innerText;
            if (location.includes('•')){
              const locationArr = location.split('•');
              return locationArr[0].trim();
            } else {
              return location;
            }
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          remote = await page.evaluate(() => {
            const location = document.querySelectorAll('[class^="sidebar_"] [class^="characteristic_"] dd [class^="component_"] span')[0].innerText;
            if (location.includes('•')){
              const locationArr = location.split('•');
              if (locationArr[1].trim() === "Remote"){
                return true;
              }
            }
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            return document.querySelectorAll('[data-test="JobDetail"] [class^="description_"]')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

        try{
          salary = await page.evaluate(() => {
            return document.querySelectorAll('[data-test="JobDetail"] div div div span')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Salary');
          //console.log(error);
        }

      } else if (builtIn) {
        console .log('BuiltIn...');
        
        try{
          await page.waitForSelector('.job-info', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('.field--name-title')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }
        
        try{
          company = await page.evaluate(() => {
            return document.querySelectorAll('.field--name-field-company .field__item a')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }
        
        try{
          city = await page.evaluate(() => {
            return document.querySelectorAll('.job-info .company-address')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            return document.querySelectorAll('.job-description')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

      } else if (craigslist) {
        console.log('Craigslist...')

        try{
          await page.waitForSelector('section#postingbody', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('#titletextonly')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }

        try{
          city = await page.evaluate(() => {
            return document.querySelectorAll('meta[name="geo.placename"]')[0].content;
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          state = await page.evaluate(() => {
            return document.querySelectorAll('meta[name="geo.region"]')[0].content.replace('US-', '');
          });
        } catch (error) {
          console.log(' - Unable to determine State');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            return document.querySelectorAll('section#postingbody')[0].innerText.replace('QR Code Link to This Post', '').trim();
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

      } else if (gitHub) {
        console.log('GitHub...');

        try{
          await page.waitForSelector('#page', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('#page .inner h1')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }

        try{
          company = await page.evaluate(() => {
            const regex = /\n/;
            return document.querySelectorAll('.logo .inner h2')[0].innerText.replace(regex, '').trim().split('other job ').pop();
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }

        try{
          city = await page.evaluate(() => {
            const location = document.querySelectorAll('#page .inner .supertitle')[0].innerText;
            const locationArr = location.split('/');
            if (locationArr[1].includes(',')){
              // Split between City and State
              const locationSplit = locationArr[1].split(',');
              return locationSplit[0].trim();
            } else {
              return locationArr[1].trim();
            }
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          state = await page.evaluate(() => {
            const location = document.querySelectorAll('#page .inner .supertitle')[0].innerText;
            const locationArr = location.split('/');
            if (locationArr[1].includes(',')){
              // Split between City and State
              const locationSplit = locationArr[1].split(',');
              return locationSplit[1].trim();
            }
          });
        } catch (error) {
          console.log(' - Unable to determine State');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            return document.querySelectorAll('#page .inner .generic .main')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

      } else if (stackOverflow) {
        console.log('StackOverflow...');

        try{
          await page.waitForSelector('.job-details--about', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('.fs-headline1 a')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }

        try{
          company = await page.evaluate(() => {
            return document.querySelectorAll('.job-details--header .grid--cell .fs-body3 a')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }
        
        try{
          city = await page.evaluate(() => {
            let location = document.querySelectorAll('.job-details--header .grid--cell .fs-body3 .fc-black-500')[0].innerText;
            location = location.replace('–', '').trim();
            if (location.includes(',')){
              // Split between City and State
              const locationSplit = location.split(',');
              return locationSplit[0].trim();
            } else {
              return location;
            }
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }
  
        try{
          state = await page.evaluate(() => {
            let location = document.querySelectorAll('.job-details--header .grid--cell .fs-body3 .fc-black-500')[0].innerText;
            location = location.replace('–', '').trim();
            if (location.includes(',')){
              // Split between City and State
              const locationSplit = location.split(',');
              return locationSplit[1].trim();
            }
          });
        } catch (error) {
          console.log(' - Unable to determine State');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            let descriptionRaw = document.querySelectorAll('section.fs-body2')[0].innerText;
            descriptionRaw = descriptionRaw.replace('Job description\n', '');
            return descriptionRaw;
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }
        
      } else if (glassDoor) {
        console.log('GlassDoor...');

        try{
          await page.waitForSelector('#JobDescriptionContainer', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        // Determine search or single view
        const singleJob = cleanUrl.includes('glassdoor.com/job/'),
              listingJob = cleanUrl.includes('glassdoor.com/job-listing/');

        if (singleJob){
          // Single View
                    
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('.empInfo .title')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.empInfo .employerName')[0].innerHTML.split('<span ')[0];
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.empInfo .location')[0].innerText;
              if (location.includes(',')){
                // Split between City and State
                const locationArr = location.split(',');
                return locationArr[0];
              } else {
                return location;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.empInfo .location')[0].innerText;
              if (location.includes(',')){
                // Split between City and State
                const locationArr = location.split(',');
                return locationArr[1];
              } else {
                return;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('.jobDescriptionContent')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

        } else if (listingJob) {

          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q5')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.pb .flex-column .e11nt52q1')[0].innerHTML.split('<span ')[0];
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }
          
          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q2')[0].innerText;
              if (location.includes(',')){
                // Split between City and State
                const locationArr = location.split(',');
                return locationArr[0];
              } else {
                return location;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }
  
          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.pb .css-i039yc .flex-column .css-ur1szg .e11nt52q2')[0].innerText;
              if (location.includes(',')){
                // Split between City and State
                const locationArr = location.split(',');
                return locationArr[1];
              } else {
                return;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('#JobDescriptionContainer div .desc')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }
  
        }

      } else if (indeed) {
        console.log('Indeed...')
        
        if (cleanUrl.includes('indeed.com/cmp/')){
          // Indeed Company Job View
          
          try{
            await page.waitForSelector('.cmp-JobDisplay-main', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
        
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('.is-selected .cmp-JobDetail-head .cmp-JobDetailTitle')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              const companyRaw = document.querySelectorAll('.is-selected .cmp-JobDetail-head .cmp-JobDetailSubtitle')[0].innerText;
              const companyArr = companyRaw.split(' - ');
              return companyArr[0];
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.is-selected .cmp-JobDetail-head .cmp-JobDetailSubtitle')[0].innerText;
              const locationDashArr = location.split(' - ');
              if (locationDashArr[1].includes(',')){
                const locationArr = locationDashArr[1].split(',');
                return locationArr[0].trim();
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.is-selected .cmp-JobDetail-head .cmp-JobDetailSubtitle')[0].innerText;
              const locationDashArr = location.split(' - ');
              if (locationDashArr[1].includes(',')){
                const locationArr = locationDashArr[1].split(',');
                return locationArr[1].trim();
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('.is-selected .cmp-JobDetailDescription')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }
          
        } else {
          // Indeed Single or Search View
          
          try{
            await page.waitForSelector('#jobDescriptionText', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
        
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('.jobsearch-JobInfoHeader-title-container .jobsearch-JobInfoHeader-title')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.jobsearch-InlineCompanyRating div')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              let location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[2].innerText;
              if (location.endsWith(' reviews')){
                location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[8].firstChild.textContent;
              }
              const locationClean = location.replace(' - ', '');
              const locationArr = locationClean.split(',');
              return locationArr[0].trim();
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              let location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[2].innerText;
              if (location.endsWith(' reviews')){
                location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[8].firstChild.textContent;
              }
              if (location.includes(',')){
                const locationArr = location.split(',');
                const locationTrim = locationArr[1].trim();
                if (locationTrim.includes(' ')){
                  const zipArr = locationTrim.split(' ');
                  return zipArr[0];
                } else {
                  return locationTrim;
                }
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }
          
          try{
            zip = await page.evaluate(() => {
              let location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[2].innerText;
              if (location.endsWith(' reviews')){
                location = document.querySelectorAll('.jobsearch-InlineCompanyRating div')[8].firstChild.textContent;
              }
              if (location.includes(',')){
                const locationArr = location.split(',');
                const locationTrim = locationArr[1].trim();
                if (locationTrim.includes(' ')){
                  const zipArr = locationTrim.split(' ');
                  return zipArr[1];
                } else {
                  return;
                }
              }
            });
          } catch (error) {
            console.log(' - Unable to determine Zip');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('#jobDescriptionText')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }
        }


      } else if (linkedIn) {
        console.log('LinkedIn...');

        // Determine search or single view
        const checkView = cleanUrl.includes('linkedin.com/jobs/view/');
       
        if (checkView){
          // LinkedIn Single view URL

          try{
            await page.waitForSelector('.jobs-top-card', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
          
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('h3.sub-nav-cta__header')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.topcard__flavor a.topcard__org-name-link')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }
 
          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[0];
              } else {
                return location;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                if (locationArr.length === 2){
                  return locationArr[1];
                } 
              } else {
                return;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            country = await page.evaluate(() => {
              const location = document.querySelectorAll('.sub-nav-cta__sub-text-container .sub-nav-cta__meta-text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                if (locationArr.length === 3){
                  return locationArr[2];
                } 
              } else {
                return;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine Country');
            //console.log(error);
          }
          
          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('.show-more-less-html__markup')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

        } else {
          // LinkedIn Search View

          try{
            await page.waitForSelector('section.description', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
          
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('h2.topcard__title')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('h3.topcard__flavor-row span a')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[0];
              } else {
                return location;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
              if (location.match(/,/g).length === 1){
                const locationArr = location.split(','); 
                return locationArr[1];
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            country = await page.evaluate(() => {
              const location = document.querySelectorAll('h3.topcard__flavor-row span')[1].innerText;
              const locationArr = location.split(','); 
              if (location.match(/,/g).length === 2){
                return locationArr[2];
              }
            });
          } catch (error) {
            console.log(' - Unable to determine Country');
            //console.log(error);
          }
          
          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('.show-more-less-html__markup')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

        }
      } else if (simplyHired) {
        console.log('SimplyHired...');
        
        const viewJob = cleanUrl.includes('simplyhired.com/job/'),
              viewSearch = cleanUrl.includes('simplyhired.com/search?');

        if (viewJob || viewSearch){

          try{
            await page.waitForSelector('.ViewJob', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
/*  
          // Check if SimplyHired requires login and presents an Error
          let errorCheck;
          try{
            errorCheck = await page.evaluate(() => {
              return document.querySelectorAll('h4.modal-title')[0].innerText;
            });
          } catch (error) {
            //console.log(error);
          }
          if (errorCheck === "ERROR"){
            console.log('SimplyHired Error Present');
            await page.close();
            await browser.close();
            return;
          } 
 */
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('.viewjob-jobTitle')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              const companyEl = document.querySelectorAll('.viewjob-header-companyInfo div')[0].innerText;
              const dashCheck = companyEl.charAt(companyEl.length-5); // Dash betwen company and rating
              const dotCheck = companyEl.charAt(companyEl.length-2); // Period in rating number
              let companyOut = companyEl;
              if (dashCheck === '-' && dotCheck === '.'){
                companyOut = companyOut.slice(0, -4);
              }
              if (companyOut.includes(' -')){
                companyOut = companyOut.replace(' -', '');
              }
              return companyOut.trim();
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }
    
          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.viewjob-header-companyInfo .viewjob-labelWithIcon')[1].innerText;
              const locationArr = location.split(',');
              return locationArr[0];
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.viewjob-header-companyInfo .viewjob-labelWithIcon')[1].innerText;
              const stateArr = location.split(',');
              return stateArr[1];
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              let descriptionRaw = document.querySelectorAll('.viewjob-jobDescription .p')[0].innerText;
              descriptionRaw = descriptionRaw.replace('Position Description\n\nPOSITION TITLE: ', '');
              return descriptionRaw.trim();
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

          try{
            salary = await page.evaluate(() => {
              const salaryRaw = document.querySelectorAll('.viewjob-salary')[0].innerText;
              const salaryCleaned = salaryRaw.replace('Estimated: ','');
              return salaryCleaned;
            });
          } catch (error) {
            console.log(' - Unable to determine Salary');
            //console.log(error);
          }

        }
      }  else if (snagAJob) {
        console.log('SnagAJob...');

        try{
          await page.waitForSelector('.job-description', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('.job-row div h2.h1')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }

        try{
          company = await page.evaluate(() => {
            return document.querySelectorAll('#jobDetails a .company-name')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }
  
        try{
          city = await page.evaluate(() => {
            const location = document.querySelectorAll('#jobDetails .ng-star-inserted')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              return locationArr[0];
            } else {
              return location;
            }
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          state = await page.evaluate(() => {
            const location = document.querySelectorAll('#jobDetails .ng-star-inserted')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              const zip = locationArr[1].match(/\d+/)[0];
              const locationOut = locationArr[1].replace(zip, '')
              return locationOut;
            }
          });
        } catch (error) {
          console.log(' - Unable to determine State');
          //console.log(error);
        }

        try{
          zip = await page.evaluate(() => {
            const location = document.querySelectorAll('#jobDetails .ng-star-inserted')[0].innerText;
            if (location.includes(',')){
              const locationArr = location.split(',');
              const zip = locationArr[1].match(/\d+/)[0];
              return zip;
            }
          });
        } catch (error) {
          console.log(' - Unable to determine Zip');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            let getDescription = document.querySelectorAll('.job-description div div')[0].innerText;
            if(getDescription.startsWith('Job Description\n\n')){
              getDescription = getDescription.substr(17);
            }
            return getDescription.trim();
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

      } else if (startupJobs) {
        console.log('StartupJobs...')

        try{
          await page.waitForSelector('.trix-content', { timeout: maxTime });
        } catch (error) {
          console.log('- Selector Timeout')
          //console.log(error);
        }

        try{
          position = await page.evaluate(() => {
            return document.querySelectorAll('h1.visualHeader__title')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Position');
          //console.log(error);
        }

        try{
          company = await page.evaluate(() => {
            const companyName = document.querySelectorAll('h2.visualHeader__subtitle')[0].innerText;
            const companyCleaned = companyName.replace(' is hiring a', '');
            return companyCleaned;
          });
        } catch (error) {
          console.log(' - Unable to determine Company');
          //console.log(error);
        }

        try{
          city = await page.evaluate(() => {
            const location = document.querySelectorAll('.jobListing__main__meta__location')[0].innerText;
            const locationArr = location.split(',');
            return locationArr[0];
          });
        } catch (error) {
          console.log(' - Unable to determine City');
          //console.log(error);
        }

        try{
          country = await page.evaluate(() => {
            const location = document.querySelectorAll('.jobListing__main__meta__location')[0].innerText;
            const locationArr = location.split(',');
            return locationArr[1];
          });
        } catch (error) {
          console.log(' - Unable to determine Country');
          //console.log(error);
        }

        try{
          description = await page.evaluate(() => {
            return document.querySelectorAll('.trix-content')[0].innerText;
          });
        } catch (error) {
          console.log(' - Unable to determine Description');
          //console.log(error);
        }

      } else if (zipRecruiter) {
        console.log('ZipRecruiter...');

        // Determine search or single view
        const checkView = cleanUrl.includes('ziprecruiter.com/jobs/');

        if (checkView){
          // Jobs View

          try{
            await page.waitForSelector('.jobDescriptionSection', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
          
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('h1.job_title')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.job_details_link')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.location_text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[0];
              } else {
                return location;
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.location_text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[1];
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            country = await page.evaluate(() => {
              const location = document.querySelectorAll('.location_text')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                if (locationArr.length === 3){
                  return locationArr[2];
                }
              }
            });
          } catch (error) {
            console.log(' - Unable to determine Country');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('.jobDescriptionSection')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

        } else {
          // Company view

          try{
            await page.waitForSelector('#job_desc', { timeout: maxTime });
          } catch (error) {
            console.log('- Selector Timeout')
            //console.log(error);
          }
          
          try{
            position = await page.evaluate(() => {
              return document.querySelectorAll('h1.job_title')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Position');
            //console.log(error);
          }

          try{
            company = await page.evaluate(() => {
              return document.querySelectorAll('.job_location_name')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Company');
            //console.log(error);
          }

          try{
            city = await page.evaluate(() => {
              const location = document.querySelectorAll('.job_location_city')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[0].trim();
              } else {
                return location.trim();
              }
            });
          } catch (error) {
            console.log(' - Unable to determine City');
            //console.log(error);
          }

          try{
            state = await page.evaluate(() => {
              const location = document.querySelectorAll('.job_location_city')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                return locationArr[1];
              }
            });
          } catch (error) {
            console.log(' - Unable to determine State');
            //console.log(error);
          }

          try{
            country = await page.evaluate(() => {
              const location = document.querySelectorAll('.job_location_city')[0].innerText;
              if (location.includes(',')){
                const locationArr = location.split(',');
                if (locationArr.length === 3){
                  return locationArr[2];
                }
              }
            });
          } catch (error) {
            console.log(' - Unable to determine Country');
            //console.log(error);
          }

          try{
            description = await page.evaluate(() => {
              return document.querySelectorAll('#job_desc div')[0].innerText;
            });
          } catch (error) {
            console.log(' - Unable to determine Description');
            //console.log(error);
          }

        }
      }
      // End scrape value assignments

      // pageObject value assignments
      if (company){ 
        pageObject.company = company;
      }
      if(position){
        pageObject.position = position;
      }
      if (city){ 
        pageObject.city = city;
      }
      if (state){ 
        pageObject.state = state;
      }
      if (zip){ 
        pageObject.zip = zip;
      }
      if (country){ 
        pageObject.country = country;
      }
      if (remote){
        pageObject.remote = remote;
      }
      if(description){
        pageObject.description = description;
      }
      if(salary){
        pageObject.salary = salary;
      }

      // Return data object as JSON string
      const jsonString = JSON.stringify(pageObject);
      // ASCII-safe conversion
      const jsonASCII = jsonString.replace(/[\u007F-\uFFFF]/g, function(chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
      });
      res.end(jsonASCII);

      // Close connection
      await browser.close();

      const t1 = performance.now();
      console.log('Proxy call took ' + (t1 - t0) + ' milliseconds.');

    })
    .on('error', async (error) => {
      //await page.close();
      console.log(error);
    })
    .listen(puppeteer_port, function() {
      console.log(`Puppeteer running on port ${puppeteer_port}`);
    });
  // proxy End
}

module.exports = puppeteerProxy;
