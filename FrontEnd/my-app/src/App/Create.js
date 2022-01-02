import './App.css';
import React, { useState, useEffect } from 'react'

import InPageHeader from '../Components/InPageHeader';

import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import { Button, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

export default function Create() {
  const initialFormData = ({
    id: 0,
    name: '',
    streetAddress: '',
    postCode: '',
    phoneNumber: '',
    comments: '',
    rating: 0,
  });

  const [nameError, setNameError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [postCodeError, setPostCodeError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [fieldError, setFieldError] = useState(false)
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

  useEffect(() => {
    if (InputData.name === '') { 
      setNameError(true); setFieldError(true); } 
    else { 
      setNameError(false); setFieldError(false); } 

    if (InputData.streetAddress === '') { 
      setAddressError(true); setFieldError(true); } 
    else { 
      setAddressError(false); setFieldError(false); }

    if (InputData.postCode === '') { 
      setPostCodeError(true); setFieldError(true); } 
    else { 
      setPostCodeError(false); setFieldError(false); }

    if (InputData.phoneNumber === '') { 
      setPhoneError(true); setFieldError(true); } 
    else { 
      setPhoneError(false); setFieldError(false); }
  });

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
    .then((response) => {
      if (fieldError === true){ alert("Required Information missing"); }
      if (fieldError === false){ response.json(); window.location.href='/Success';}
    })
    .then((responseJSON) => {
        console.log(responseJSON);
    })
    .catch((error) => {
        console.log(error);
        alert(error);
    });
  };

  return(
      <React.Fragment>
        <InPageHeader title="Contact Page" subtitle="An agent will be in touch with you within 48 hrs.
            Also be sure to let us know how your day was in the Review Section. Thanks." 
            icon = {< ContactPageRoundedIcon sx={{fontSize:'75px'}}/>} />

          <div style={{width:'750px', paddingLeft:'100px',  paddingTop:'75px'}}>
            <Typography>Your Details:</Typography><br />

            <TextField required label="Full Name" error={nameError} fullWidth value={InputData.name} type='text' name='name'
               onChange = {handleChange}>
            </TextField><br /><br />
            
            <TextField required label="Street Address" error={addressError} fullWidth value={InputData.streetAddress} type='text' name='streetAddress'
              onChange = {handleChange}> 
            </TextField><br /><br />
            
            <TextField required label="Post Code" error={postCodeError} fullWidth value={InputData.postCode} type='text' name='postCode'
              onChange = {handleChange}>
            </TextField><br /><br />
            
            <TextField required label="Phone Number" error={phoneError} fullWidth value={InputData.phoneNumber} type='number' name='phoneNumber'
              onChange = {handleChange}>
            </TextField><br /><br />
            <br />
            
            <Typography>Your Review is always appreciated:</Typography><br />

            <Rating defaultValue={0} value={InputData.rating} size="large"
              name='rating' max={10} onChange={handleChange}/><br /> <br />

            <TextField fullWidth multiline rows={9} value={InputData.comments} placeholder='Comments' type='text' name='comments'
              onChange = {handleChange}> 
            </TextField><br /><br />

            <Button fullWidth style={{padding:'20px'}}
              variant='contained' endIcon={<SendIcon />} onClick={handleSubmit}>Submit</Button>
          </div>
      </React.Fragment> 
    );
  }
