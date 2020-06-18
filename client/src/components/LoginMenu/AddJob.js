import React, { useEffect, useState } from 'react';
import {addJob, addInterview, updateInterview} from '../../utils/API';

// import axios from 'axios';
import NavBar from '../NavBar';

function AddJob() {
  const [post, setPost] = useState({});

  // // Hitting the Post endpoint
  const handleAdd = async () => {
    try {
      // example of a job post 
      let newJob = await addJob({companyName: "apple", position: "backend intern", state: "CA", city: "Los Angeles", url: "www.apple.com"})
      // let newInterview = await addInterview({location: {remote: true, street: "1234 main st.", city: "Los Angeles", state: "CA"}, notes: "dress professional" }, newJob.data._id);

      // let updatedInterview = await updateInterview({location: {remote: true, street: "1234 main st.", city: "Los Angeles", state: "CA"}, notes: "dress casual" }, newJob.data._id, newInterview._id);

    } catch (err) {
      console.log(err);
    }
  };

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
