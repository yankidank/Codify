import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../../../layout/components/navbar';

function MenuLogin() {
  const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost:3001' : '';
  return (
    <div>
      <Helmet>
        <title>Login Menu</title>
      </Helmet>
      <NavBar />
      <div>
        <ul className="menuNav">
          <li>
            <a href="/" className="button btn-home-login">
              Home
            </a>
          </li>
          <li>
            <a href={`${domain}/auth/github`} className="button btn-github">
              <div className="btn-logo">
                <img src="/assets/img/icon-github.png" alt="GitHub" />
              </div>
              <div className="btn-title">Login with GitHub</div>
            </a>
          </li>
          <li>
            <a href={`${domain}/auth/linkedin`} className="button btn-linkedin">
              <div className="btn-logo">
                <img src="/assets/img/icon-linkedin.png" alt="LinkedIn" />
              </div>
              <div className="btn-title">Login with LinkedIn</div>
            </a>
          </li>
          <li>
            <a href={`${domain}/auth/google`} className="button btn-google">
              <div className="btn-logo">
                <img src="/assets/img/icon-google.png" alt="Google" />
              </div>
              <div className="btn-title">Login with Google</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MenuLogin;
