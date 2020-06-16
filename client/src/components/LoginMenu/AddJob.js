import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import NavBar from '../NavBar';

function AddJob() {
  const [post, setPost] = useState({});

  // // Hitting the Post endpoint
  // const handleAdd = () => {
  //   axios.post('/api/jobs', { post });
  //   // window.open('/jobs', '_self');
  // };

  const onPostInput = event => {
    const { target: { name, value }} = event;

    setPost({ ...post, [name]: value})
  }

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
      <div className="menuNav">
        <ul>
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
