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
import { useEffect } from "react";
import { useState } from "react";
import { Select, MenuItem, Icon } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


function Profile()  {
    const industries = useSelector((store) => store.industries);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [industry, setIndustry] = useState("");

    useEffect(() => {
        dispatch({
          type: "FETCH_INDUSTRIES",
        });
      }, []);
    
  
    
      return (
        <Card 
          component="form"
          sx={{
            '& > :not(style)': { m: 3 },
            position: 'relative' // Ensure Card is relative for absolute positioning if needed
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h4" component="div">
              My Profile
            </Typography>
            <IconButton sx={{ ml: 2 }}>
              <EditIcon />
            </IconButton>
          </Box>
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            sx={{ height: '10vh' }}
          >
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="component-simple">First Name</InputLabel>
                <Input id="component-simple" />
              </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="component-helper">Last Name</InputLabel>
                <Input
                  id="component-helper"
                  aria-describedby="component-helper-text"
                />
              </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={4}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="component-simple">Company</InputLabel>
                <Input id="component-simple" />
              </FormControl>
            </Grid>
      
            <Grid item xs={12} sm={6} md={4}>
              <FormControl value="" variant="standard" fullWidth>
                <Select
                  labelId="dynamic-select-label"
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value)}
                  displayEmpty
                  label="Industry"
                  sx={{ mt: 2 }}
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
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <Input id="component-simple" />
              </FormControl>
            </Grid>
          </Grid>
        </Card>
      );
      


}

export default Profile

  