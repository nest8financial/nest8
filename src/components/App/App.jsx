import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import {Theme} from '../Nav/NavTheme'
import MenuBar from '../MenuBar/MenuBar'
import './App.css';
import InputHeader from '../InputHeader/InputHeader';
import FinancialInputsAddEdit from '../FinancialInputsAddEdit/financialInputsAddEdit'
import MyData from '../MyData/MyData';


// import ProductPage from '../ProductPage'; 
// import FeaturesPage from '../FeaturesPage'; 
// import PricingPage from '../PricingPage'; 
// import FAQPage from './FAQPage'; 
// import ContactUsPage from '../ContactUsPage'; 
// import OurStoryPage from '../OurStoryPage'; 
// import MissionPage from '../MissionPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme}>
    <Router>
      <div>
        <Nav />
        <MenuBar/>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          <ProtectedRoute
            // logged in shows InputHeader page, else shows LoginPage
            exact
            path="/input_header"
          >
            <InputHeader />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InputHeader page, else shows LoginPage
            exact
            path="/inputs_add_edit/:month/:year"
          >
            <FinancialInputsAddEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InputHeader page, else shows LoginPage
            exact
            path="/MyData"
          >
            <MyData/>
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
