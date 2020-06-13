import React, { useEffect } from 'react';
import NavBar from '../NavBar';

function AddJob() {

  useEffect(() => {
    // Paste Job URL
    const paste = document.getElementById('paste');
    paste.addEventListener('click', () => {
      if (!paste.value) {
        // Attempt to read clipboard text
        navigator.clipboard
          .readText()
          .then(text => {
            const pasteText = text.trim();
            // Check that the clipboard holds a link
            const checkUrl = pasteText.startsWith('http');
            if (checkUrl) {
              paste.value = pasteText;
            }
          })
          .catch(err => {
            console.log('Something went wrong', err);
          });
      }
    });
  });

  return (
    <div>
      <NavBar />
      <div className="menuNav">
        <ul>
          <li className="btn-home-login">Job Post URL</li>
          <li>
            <input
              className="menu-url-input-field"
              id="paste"
              placeholder="https://"
            ></input>
          </li>
          <li>
            <a href="/jobs/add" className="button btn-job-add">
              Save Job
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddJob;
