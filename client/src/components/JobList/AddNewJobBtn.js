import React from 'react';

const handleAdd = () => {
  window.open('/jobs/add', '_self');
};

function AddNewJobBtn() {
  return (
    <div className="addJobBtn">
      <li>
        <button onClick={handleAdd}>Add New Job</button>
      </li>
    </div>
  );
}

export default AddNewJobBtn;
