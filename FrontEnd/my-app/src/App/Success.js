import React from 'react';
import DoneIcon from '@mui/icons-material/Done';

import { green } from '@mui/material/colors';
import { Button } from '@mui/material';

export default function Success() {
  return (
    <React.Fragment>
        <div style={{paddingLeft:'150px',paddingTop:'50px'}}>
            <DoneIcon sx={{fontSize: 300, paddingLeft:'50px' ,color: green[500]}} />
            <h1>Success! We will be in touch</h1>
            <Button onClick={() => window.location.href='/'}>Click to go to Guest Page</Button> 
        </div>
    </React.Fragment>
  );
};
