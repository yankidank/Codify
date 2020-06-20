import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import {addJob} from "../../utils/API"

function AddJob() {
  const [post, setPost] = useState({
    companyName: "",
    position: "",
    city: "",
    state: "",
    status: "",
    url: ""
  });

  // Hitting the Post endpoint
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      let newJob = await addJob({ ...post, status: post.status || 'saved' })
      if (newJob && newJob.status === 200) {
        const { data: { _id }} = newJob;
        window.open(`/jobs/${_id}`, '_self');
      }
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
      <div className="menuNav container">
        <div className="row card-image">
          <div className="col s12 card-title card-title-add-job">
            Add New Job
          </div>
        </div>
        <div className="card-add-job card card-padded">
          <div className="row">
            <div className="col s12 m12 l6">
              <input className="menu-input-field" placeholder="Company Name" name="companyName" onChange={onPostInput}></input>
            </div>
            <div className="col s12 m12 l6">
              <input className="menu-input-field" placeholder="Position" name="position" onChange={onPostInput}></input>
            </div>
            <div className="col s6 m6 l6">
              <input className="menu-input-field" placeholder="City" name="city" onChange={onPostInput}></input>
            </div>
            <div className="col s6 m6 l6">
              <input className="menu-input-field" placeholder="State" name="state" onChange={onPostInput}></input>
            </div>
            <div className="col s12 m12 l12">
              <input
                className="menu-input-field"
                id="paste"
                name="url"
                placeholder="https://"
                onChange={onPostInput}
                value={post.url}
              ></input>
            </div>
            <div className="col s12">
              <a href="/jobs/add" className="button btn-job-add" onClick={handleAdd}>
                Save Job
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
