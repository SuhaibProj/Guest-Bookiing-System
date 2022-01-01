import './App.css';
import React, { useState } from 'react'

import LeftSideMenu from "../Components/LeftSideMenu";
import SiteHeader from '../Components/SiteHeader';
import InPageHeader from '../Components/InPageHeader';

import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import { Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';



export default function App() {
  const initialFormData = ({
    id: 0,
    name: '',
    streetAddress: '',
    postCode: '',
    phoneNumber: '',
    comments: '',
    rating: 0,
  });

  const [InputData, setFormData] = useState(initialFormData);

  const handleChange = (e) => { //event handle for input change
    setFormData({
      ...InputData,
      [e.target.name]: e.target.value,
      [e.target.streetAddress]: e.target.value,
      [e.target.postCode]: e.target.value,
      [e.target.phoneNumber]: e.target.value,
      [e.target.comments]: e.target.value,
      [e.target.rating]: e.target.value,
    });
  };

  const handleSubmit = (e) => { //event handle for button submit
    e.preventDefault();

    const databaseCreate = {
        id: 0,
        name: InputData.name,
        streetAddress: InputData.streetAddress,
        postcode: InputData.postCode,
        phoneNumber: InputData.phoneNumber,
        comments: InputData.comments,
        rating: InputData.rating,
    };
    
    //Register using POST Request.
    return fetch('https://localhost:7077/api/Guests/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(databaseCreate),
    })
    .then((response) => response.json())
    .then((responseJSON) => {
        console.log(responseJSON)
    })
    .catch((error) => {
        console.log(error);
        alert(error);
    });
  };

  return(
      <React.Fragment>
        <LeftSideMenu />
        <div className='app-main'>
          <SiteHeader />

          <InPageHeader title="Contact Page" subtitle="An agent will be in touch with you within 48 hrs.
            Also be sure to let us know how your day was in the Review Section. Thanks." 
            icon = {< ContactPageRoundedIcon fontSize='large'/>} />

          <div style={{width:'1000px', paddingLeft:'300px',paddingTop:'50px'}}>
            <Typography>Full Name:</Typography>
            <TextField value={InputData.name} required label="Required" placeholder='Full Name' type='text' name='name'
               onChange = {handleChange}>
            </TextField><br /><br />
            <Typography>Street Address:</Typography>
            <TextField value={InputData.streetAddress} required label="Required" placeholder='Street Address' type='text' name='streetAddress'
              onChange = {handleChange}>
            </TextField><br /><br />
            <Typography>Post Code:</Typography>
            <TextField value={InputData.postCode} required label="Required" placeholder='Post Code' type='text' name='postCode'
              onChange = {handleChange}>
            </TextField><br /><br />
            <Typography>Phone Number:</Typography>
            <TextField value={InputData.phoneNumber} required label="Required" placeholder='Phone Number' type='text' name='phoneNumber'
              onChange = {handleChange}>
            </TextField><br /><br />
            <Typography>Tell us a little about your day:</Typography>
            <TextField value={InputData.comments} placeholder='Comments' type='text' name='comments'
              onChange = {handleChange}> 
            </TextField><br /><br />
            <Typography>Give us a Rating:</Typography>
            <Rating defaultValue={0} value={InputData.rating} type='text'
              name='rating' max={10} onChange={handleChange}/>

            <br /> <br />
            <Button style={{paddingLeft:'100px', paddingRight:'100px'}}
              variant='contained' onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </React.Fragment> 
    );
  }
