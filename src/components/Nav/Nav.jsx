import React from 'react';
import { useEffect } from 'react';
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

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState(3); // Example number of notifications
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  // useEffect(() => {
  //   dispatch({ type: "FETCH_USER" });
  // }, [user]);

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
    // history.push('/profile');
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
    console.log('nest 8 clicked!  home page??')
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" 
                      component="div" 
                      sx={{ flexGrow: 1 }}>
            Nest8
          </Typography>
          
          <Box component="div" sx={{ flexGrow: 1 }}>
            {user.id && (
            <Button color="inherit"
            onClick={(e) => handleInputButton(e)}>Inputs</Button>
            )}
            {user.id && (
            <Button color="inherit"
            onClick={(e) => handleReportButton(e)}>Reports</Button>
            )}
            {user.id && (
            <Button color="inherit"
            onClick={(e) => handleDataButton(e)}>Data</Button>
            )}
          </Box>


          {!user.id && (
          <Button color="inherit"
          onClick={(e) => handleLoginButton(e)}>Login</Button>
          )}
          <IconButton size="large"
                      color="inherit"
                      onClick={() => {(e) => {handleAlertsBell(e)}}}>
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
