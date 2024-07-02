import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styled from "styled-components";
import Nest8icon from "../Nav/logo";

const ImageButton = styled("img")({
  width: 150,
  height: 50,
});

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [notifications, setNotifications] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const missingInputs = useSelector(
    (store) => store.financialInputs.missingMonthlyInputs
  );
  const uncompletedRecs = useSelector(
    (store) => store.financialInputs.incompleteRecsMonthlyInputs
  );

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
  }, [missingInputs]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginButton = (e) => {
    history.push("/login");
  };

  const handleInputButton = (e) => {
    history.push("/input_header");
  };

  const handleReportButton = (e) => {
    history.push("/financials");
  };

  const handleDataButton = (e) => {
    history.push("/my_data");
  };

  const handleProfileButton = (e) => {
    handleClose();
    history.push("/profile");
  };

  const handleAlertsBell = (e) => {
    history.push("/my_data");
  };

  const handleLogoutButton = (e) => {
    handleClose();
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "FETCH_USER" });
    history.push("/home");
  };

  const handleHomeButton = (e) => {
    history.push("/home");
    handleClose();
  };

  const handleNest8Icon = (e) => {
    history.push("/home");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleNest8Icon}>
            <Nest8icon />
          </IconButton>
          <Box component="div" sx={{ flexGrow: 1 }}>
            {user.id && user.date_joined && (
              <>
                <Button color="inherit" onClick={(e) => handleInputButton(e)}>
                  Inputs
                </Button>
                <Button color="inherit" onClick={(e) => handleReportButton(e)}>
                  Reports
                </Button>
                <Button color="inherit" onClick={(e) => handleDataButton(e)}>
                  Data
                </Button>
              </>
            )}
          </Box>

          {!user.id && (
            <Button color="inherit" onClick={(e) => handleLoginButton(e)}>
              Login
            </Button>
          )}
          <IconButton size="large" color="inherit" onClick={handleAlertsBell}>
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
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={(e) => handleHomeButton(e)}>
              <HomeIcon />
              <pre> </pre>Home
            </MenuItem>
            {user.id && (
              <MenuItem onClick={(e) => handleProfileButton(e)}>
                <AccountCircle />
                <pre> </pre>Profile
              </MenuItem>
            )}
            {user.id && (
              <MenuItem onClick={(e) => handleLogoutButton(e)}>
                <LogoutIcon />
                <pre> </pre>Logout
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
