import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"

function AddJob() {
  const [post, setPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    url: ""
  });

  // Hitting the Post endpoint
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log(post);
      
      let newJob = await addJob(post)
      console.log(newJob)
    }
    catch (error){
      console.log(error)
    }
  }

  const onPostInput = event => {
    const { target: { name, value }} = event;

    setPost({ ...post, [name]: value})
    console.log(post)
  }

  useEffect(() => {
    // handleAdd();
    // Paste Job URL
    // const paste = document.getElementById('paste');
    // paste.addEventListener('click', () => {
    //   if (!paste.value) {
    //     // Attempt to read clipboard text
    //     navigator.clipboard
    //       .readText()
    //       .then(text => {
    //         const pasteText = text.trim();
    //         // Check that the clipboard holds a link
    //         const checkUrl = pasteText.startsWith('http');
    //         if (checkUrl) {
    //           setPost({...post, url: pasteText })
    //           // paste.value = pasteText;
    //         }
    //       })
    //       .catch(err => {
    //         console.log('Something went wrong', err);
    //       });
    //   }
    // });
  });

  return (
    <div>
      <NavBar />
      <div>
        <ul className="menuNav">
          <li>
            <input placeholder="Company Name" name="companyName" onChange={onPostInput}></input>
          </li>
          <li>
            <input placeholder="Position" name="position" onChange={onPostInput}></input>
          </li>
          <li>
            <input placeholder="City" name="city" onChange={onPostInput}></input>
          </li>
          <li>
            <input placeholder="State" name="state" onChange={onPostInput}></input>
          </li>
          <li className="btn-home-login">Job Post URL</li>
          <li>
            <input
              className="menu-url-input-field"
              id="paste"
              name="url"
              placeholder="https://"
              onChange={onPostInput}
              value={post.url}
            ></input>
          </li>
          <li>
            <a href="/jobs/add" className="button btn-job-add" onClick={handleAdd}>
              Save Job
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AddJob;
