import React, { useEffect } from 'react'
import Array from './Data';
import './Frontpage.css';
import { Link } from 'react-router-dom';
import {BsFlag} from 'react-icons/bs';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { useState } from 'react';

const Frontpage = () => {
  const [selectedStatus, setSelectedStatus] = useState('Draft');
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    console.log(status);
  };
  useEffect(()=>{
    localStorage.clear();
  },[])

  let filteredArray;
  
  if (selectedStatus === 'Draft') {
    filteredArray = Array.filter((item) => item.status !== 'Completed');
  } else {
    filteredArray = Array.filter((item) => item.status === selectedStatus);
  }
 
  return (
    <div className='main'>
      <div className='heading'><h1>DASHBOARD</h1></div>
      <div className='create-btn'>
      <Link to='Request'> <button>Create</button> </Link>
      </div>
    <div className='container'>
      <div className='status-btns'>
        <button className='inprogressbtn' onClick={() => handleStatusFilter('Draft')}><AiOutlineCloseCircle/> Inprogress</button>
        <button className='completebtn' onClick={() => handleStatusFilter('Completed')}>< BsFlag/> Completed </button>
      </div>
      <div className='line'></div>
      <div className='search-bar'>
        <label htmlFor='text' id='search'>Search:</label>
        <input type="text"/>
      </div>
        <table id="contentTable">
            <thead>
    <tr>
        <th>Id</th>
        <th>RequestedOn</th>
        <th>Customername</th>
        <th>Branchcode</th>
        <th>Branchname</th>
        <th>Customeraccountnumber</th>
        <th>Compensation</th>
        <th>Status</th>
    </tr>
    </thead>
    <tbody>
    {filteredArray.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.requestedOn}</td>
                <td>{user.customername}</td>
                <td>{user.branchcode}</td>
                <td>{user.branchname}</td>
                <td>{user.customeraccountnumber}</td>
                <td>{user.compensation}</td>
                <td>{user.status}</td>
              </tr>
        
))}




    </tbody>
    </table>
    </div>
    </div>
  )
}

export default Frontpage