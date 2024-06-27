import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Select, MenuItem, IconButton, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

function Profile() {
  const industries = useSelector((store) => store.industries);
  const user = useSelector((store) => store.editUser);
  const dispatch = useDispatch();
  const[industry, setIndustry] = useState([]);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    dispatch({
      type: 'FETCH_EDIT_USER'
    });
    dispatch ({
        type: 'FETCH_INDUSTRIES'
    })
  }, [dispatch]);

  useEffect(() => {
    console.log('PLS work',user.industry)
setIndustry(user.industry);
  },[user]);

  const handleFirstNameChange = (event) => {
    dispatch({
      type: 'UPDATE_USER_FIRST_NAME',
      payload: event.target.value
    });
  };

  const handleLastNameChange = (event) => {
    dispatch({
      type: 'UPDATE_USER_LAST_NAME',
      payload: event.target.value
    });
  };

  const handleCompanyChange = (event) => {
    dispatch({
      type: 'UPDATE_USER_COMPANY',
      payload: event.target.value
    });
  };

  const handleIndustryChange = (event) => {
    dispatch({
      type: 'UPDATE_USER_INDUSTRY',
      payload: event.target.value
    });
  };

  const handleEmailChange = (event) => {
    dispatch({
      type: 'UPDATE_USER_EMAIL',
      payload: event.target.value
    });
  };

  const handleEditButton = (event) => {
    event.preventDefault();
    setReadOnly(!readOnly);
  };

  const handleSaveButton = (event) => {
    event.preventDefault();
    dispatch({
      type: 'UPDATE_USER',
      payload: user
    });
  };

  return (
    <Card
      component="form"
      sx={{
        '& > :not(style)': { m: 3 },
        position: 'relative', // Ensure Card is relative for absolute positioning if needed
        p: 2
      }}
      noValidate
      autoComplete="off"
    >
      <Typography gutterBottom variant="h4" component="div">
        My Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="standard" fullWidth>
            <Input
              placeholder="First Name"
              value={user.first_name || ''}
              onChange={handleFirstNameChange}
              id="component-simple"
              readOnly={readOnly}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="standard" fullWidth>
            <Input
              placeholder="Last Name"
              value={user.last_name || ''}
              onChange={handleLastNameChange}
              id="component-helper"
              aria-describedby="component-helper-text"
              readOnly={readOnly}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="standard" fullWidth>
            <Input
              placeholder="Company"
              value={user.company || ''}
              onChange={handleCompanyChange}
              id="component-simple"
              readOnly={readOnly}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
            <Select
              labelId="dynamic-select-label"
              value={user.industry_id || ''}
              onChange={handleIndustryChange}
            //   displayEmpty
              disabled={readOnly}
            >
              <MenuItem value="" disabled>
                Industry
              </MenuItem>
              {industries?.map((industry) => (
                <MenuItem key={industry.id} value={industry.id}>
                  {industry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="standard" fullWidth>
            <Input
              placeholder="Email"
              value={user.username || ''}
              onChange={handleEmailChange}
              id="component-simple"
              readOnly={readOnly}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
        <Button onClick={handleSaveButton} variant="contained" color="primary" disabled={readOnly} sx={{ mr: 1 }}>
          Save
        </Button>
        <IconButton onClick={handleEditButton}>
          <EditIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default Profile;

