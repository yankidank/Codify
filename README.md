![Website](https://img.shields.io/badge/website-up-red) ![Lint Rules](https://img.shields.io/badge/codestyle-airbnb-brightgreen) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) 

# Cōdify

For many software engineers, the job hunting process can become overwhelming. Between low success rates, complicated interview processes, and employers that may not even respond, it is difficult to keep track of valuable data. We built Cōdify to solve this problem. 

Cōdify is a PWA created to organize and analyze the job application process for software developers. It provides a centralized location to save job post URLs, contact information, job offers, application status, and much more. 

# Normal Usage
You can visit our deployed site [here](). 


# To set up a local version
### Installation 
`npm install`

### Usage
`npm start` to run on port 3000

### OAuth configuration
Create a `.env` file in your root directory. Add the following lines, adding the appropriate API keys within the quotes:

Note: you can get these from google, github, and linkedin

```
GOOGLE_CLIENT_ID = ".apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = ""
GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = ""
LINKEDIN_CLIENT_ID = ""
LINKEDIN_CLIENT_SECRET = ""
COOKIE_KEY = ""
```

### Production
`npm run build` to build a production version of the application.
