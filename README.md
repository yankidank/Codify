![Website](https://img.shields.io/badge/website-up-red) ![Lint Rules](https://img.shields.io/badge/codestyle-airbnb-brightgreen) ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) 

# Cōdify

Job application tracking and data analysis. 

Add job post URLs then schedule interviews, create contacts, and track job offers. 

## Installation

```npm install```

### OAuth configuration
Create a `.env` file in your root directory. Add the following lines, adding the appropriate API keys within the quotes:

```
GOOGLE_CLIENT_ID = ".apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = ""
GITHUB_CLIENT_ID = ""
GITHUB_CLIENT_SECRET = ""
LINKEDIN_CLIENT_ID = ""
LINKEDIN_CLIENT_SECRET = ""
COOKIE_KEY = ""
```
## Run 

`npm start` to run on port 3000

### Production
`npm run build` to build a production version of the application.
