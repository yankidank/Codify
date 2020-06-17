import React, { useEffect, useState } from 'react';

// import axios from 'axios';
import NavBar from '../NavBar';

function AddJob() {
  const [post, setPost] = useState({});

  // Hitting the Post endpoint
  const handleAdd = async () => {
    try {
      const newJob = await postJob(companyName, position, city, state, url)
    }
    catch (error){
      console.log(error)
    }
  }

  const onPostInput = event => {
    const { target: { name, value }} = event;

    setPost({ ...post, [name]: value})
  }

  useEffect(() => {
    handleAdd();
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
              setPost({...post, url: pasteText })
              // paste.value = pasteText;
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
      <div>
        <ul className="menuNav">
          <li>
            <label for="companyName">Company Name</label>
            <input id="companyName"></input>
          </li>
          <li>
            <label for="position">Position</label>
            <input id="position"></input>
          </li>
          <li>
            <label for="city">City</label>
            <input id="city"></input>
          </li>
          <li>
            <label for="state">State</label>
            <input id="state"></input>
          </li>
          <li className="btn-home-login">Job Post URL</li>
          <li>
            <input
              className="menu-url-input-field"
              id="paste"
              name="url"
              placeholder="https://"
              onInput={onPostInput}
              value={post.url}
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
