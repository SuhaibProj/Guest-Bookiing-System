import { Card, Paper, Typography } from '@mui/material';
import React from 'react';


export default function InPageHeader(props){
    const {title, subtitle, icon} = props;
    return (
        <Paper elevation={1} className='in-page-header-color' square>
            <div className='in-page-header-position'>
                <Card className='in-page-header-icon'>
                    {icon}
                </Card>
                <div className='in-page-header-title'>
                    <Typography component="div" variant="h5">{title}</Typography>
                    <Typography component="div" variant="subtitle1">{subtitle}</Typography>
                </div>
            </div>
        </Paper>
    );
}