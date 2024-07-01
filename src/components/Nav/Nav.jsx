import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import styled from 'styled-components';


const ImageButton = styled('img')({
  width: 150,
  height: 50,
});


export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notifications, setNotifications] = useState(0); 
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const missingInputs =
        useSelector((store) => store.financialInputs.missingMonthlyInputs); 
  const uncompletedRecs = 
  useSelector(store => store.financialInputs.incompleteRecsMonthlyInputs);
  console.log('missinginputs', missingInputs);

  useEffect(() => {
    if (user.id && user.date_joined) {
      dispatch({ type: "GET_MISSING_MONTHLY_INPUTS" });
      dispatch({ type: "GET_INCOMPLETE_RECS_MONTHLY_INPUTS" });
    }
  }, [user]);

  useEffect(() => {
    if (missingInputs && uncompletedRecs) {
      setNotifications(missingInputs.length + uncompletedRecs.length);
    }
  },[missingInputs])

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginButton = (e) => {
    console.log('in handleClick for login button');
    history.push('/login');
  }

  const handleInputButton = (e) => {
    console.log('profile clicked!');
    history.push('/input_header');
  }

  const handleReportButton = (e) => {
    console.log('/financials');
    history.push('/financials');
  }

  const handleDataButton = (e) => {
    console.log('/mydata');
    history.push('/my_data');
  }

  const handleProfileButton = (e) => {
    console.log('profile clicked!');
    handleClose();
    history.push('/profile');
  }
  

  const handleAlertsBell = (e) => {
    console.log('bell clicked!');
    history.push('/my_data');
  }

  const handleLogoutButton = (e) => {
    console.log('logout clicked!');
    handleClose();
    dispatch({ type: 'LOGOUT' });
    dispatch({ type: "FETCH_USER" });
    history.push('/home');
  }

  const handleHomeButton = (e) => {
    console.log('home clicked!')
    history.push('/home');
    handleClose();
  }

  const handleNest8Icon = (e) => {
    console.log('nest 8 clicked!  home page??');
    history.push('/home');
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleNest8Icon}>
            <ImageButton src="/nest8.png"
                         alt="Nest 8 icon"/>
          </IconButton>
          <Box component="div" sx={{ flexGrow: 1 }}>
            { (user.id && user.date_joined) && (
              <>
            <Button color="inherit"onClick={(e) => handleInputButton(e)}>Inputs</Button>
            <Button color="inherit" onClick={(e) => handleReportButton(e)}>Reports</Button>
            <Button color="inherit"onClick={(e) => handleDataButton(e)}>Data</Button>

            </>
            )}
          </Box>


          {!user.id && (
          <Button color="inherit"
          onClick={(e) => handleLoginButton(e)}>Login</Button>
          )}
          <IconButton size="large"
                      color="inherit"
                      onClick={handleAlertsBell}>
            <Badge badgeContent={notifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}>
            <MenuIcon/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={(e) => handleHomeButton(e)}><HomeIcon/><pre> </pre>Home</MenuItem>
            {user.id && <MenuItem onClick={(e) => handleProfileButton(e)}><AccountCircle/><pre> </pre>Profile</MenuItem>}
            {user.id && <MenuItem onClick={(e) => handleLogoutButton(e)}><LogoutIcon /><pre> </pre>Logout</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
