<img width="360" alt="Screen Shot 2020-06-23 at 5 17 51 PM" src="https://user-images.githubusercontent.com/42880531/85480802-78c1f680-b575-11ea-85ac-2b8d0e407ba1.png">

![Website](https://img.shields.io/badge/website-up-red) ![Lint Rules](https://img.shields.io/badge/codestyle-airbnb-brightgreen) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) 

# Overview and Goals 

For many software engineers, the job hunting process can become overwhelming. Between low success rates, complicated interview processes, and employers that may not even respond, it is difficult to keep track of valuable data. We built Cōdify to solve this problem. 

Cōdify is a PWA created to organize and analyze the job application process for software developers. It provides a centralized location to save job post URLs, contact information, job offers, application status, and much more. 


# Deployed Application 

You can visit the deployed demo site at [Codify.works](https://codify.works). 

# Completed MVP

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://media.giphy.com/media/UrbSM1l5LFBq6iQQyO/giphy.gif">

* Users have the option to login into our app using their LinkedIn, GitHub, or Google account.

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://user-images.githubusercontent.com/42880531/85481960-c0e21880-b577-11ea-9517-84d3c1d39f5f.png">

* User can add a job that is saved to the database and will be tracked as the application process evolves.

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://media.giphy.com/media/UQJbj6tyD6T4cHsZYo/giphy.gif">

* Individual jobs can be updated as the application process unfolds. 

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://media.giphy.com/media/kGLfmDk6ZAN0Sxy7ov/giphy.gif">

* Sleek and informative dashboard that gives the user an overview of the status of their applications. It also gives them a list of their most recent applications. 

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://media.giphy.com/media/XDjNPZaf4I2NBBXAF8/giphy.gif">

* User can access a list of all the jobs they have applied to. 

<img width="365" alt="Screen Shot 2020-06-23 at 5 34 08 PM" src="https://media.giphy.com/media/iGplieQ8n92RUEhBdY/giphy.gif">

# Active MVP 

Features currently in production include:

* Dashboard 
    Includes a graphical overview of the users application statuses. 
    Displays the most recent jobs added by the user. 
* Add Job
    Users can track a job position
    Autofill data from 25+ supported job board websites
* Individual job page 
    Gives the user the ability to add notes in regards to the job that they are applying to. The user can add contact information for someone working for the company, interview information, and offer updates. 
* Job List 
    A complete historical list of all of the jobs saved by the user. 
    
# Future Features

* Compare job hunt progress with other users
* Graph offer history on the Dashboard
* Compare commute times and locations
* Save resume version submitted to each application 
* Receive recommendations for interview preparation
* Export interview events to calendar

# Developed by

* Noah Miller - [Portfolio](https://millernj.github.io/portfolio/) | [GitHub](https://github.com/millernj)
* Eric Heikkinen - [Portfolio](https://ericheikkinen.com/) | [GitHub](https://github.com/yankidank)
* Elliot Fouts - [Portfolio](https://elliotfouts.github.io/portfolio-2/) | [GitHub](https://github.com/elliotfouts)
* Ana Valdivia - [Portfolio](http://www.anavaldivia.com/) | [GitHub](https://github.com/anabee)

# How to Use
## Setup 
`npm run install` install node_modules

`npm run seed` seed the database

## Configure

### OAuth
To authenticate users, you will need to create, configure, and set OAuth API keys for GitHub, Google, and LinkedIn. Each service has its own callback URL that needs to be set from the appropriate API settings pages. These URLs can be set as either HTTP or HTTPS. Below are the callback URLs (don't forget to include your domain at the start).

`/auth/github/callback`

`/auth/google/callback`

`/auth/linkedin/callback`

### .env File
The dotenv npm package allows us to store private settings in a `.env` file that sits in the root directory of the application. Create the .env file and add the following lines, inserting your own API keys. Uncomment and edit necessary lines for production use on a domain.

```
// NODE_ENV = "production"
// PROD_START = "true"
// PROD_PORT = "3000"
DOMAIN = "http://localhost"
CALLBACK_DOMAIN = "http://localhost:3001"
// PORT = "3001"
// FRONTEND_PORT = "3000"
PUPPETEER_PORT = "4000"
COOKIE_KEY = ""
MONGODB_URI = "mongodb://localhost/codify"
GOOGLE_CLIENT_ID = ".apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = ""
GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = ""
LINKEDIN_CLIENT_ID = ""
LINKEDIN_CLIENT_SECRET = ""
```

PROD_START defines whether a production server serve the static /build directory on a web server port

## Command Line Options

### Development
`yarn start` starts Web, API, and Pupeteer servers

`yarn test` run included tests

`yarn lint` analyze source code for errors

`yarn fix` attempt to fix lint errors

`yarn seed` seed the database

### Production

`yarn build` generates static files for production in /build

`yarn server` starts the API and Puppeteer server

`yarn deploy` builds and serves server.js using PM2 on port 3000

`yarn heroku-postbuild` create a build after deploying to heroku
