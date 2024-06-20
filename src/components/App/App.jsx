import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

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
import RecommendationDetail from '../RecommendationDetail/RecommendationDetail';
import InputHeader from '../InputHeader/InputHeader';
import MyData from '../MyData/MyData';
import FinancialSummary from "../FinancialSummary/FinancialSummary";
import AddEditInputs from "../AddEditInputs/AddEditInputs";
import MonthlyInputs from "../MonthyInputs/MonthlyInputs";

// import ProductPage from '../ProductPage';
// import FeaturesPage from '../FeaturesPage';
// import PricingPage from '../PricingPage';
// import FAQPage from './FAQPage';
// import ContactUsPage from '../ContactUsPage';
// import OurStoryPage from '../OurStoryPage';
// import MissionPage from '../MissionPage';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <div>
          <Nav />
          <MenuBar />
          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect exact from="/" to="/login" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
            <Route exact path="/home">
              <HomePage />
            </Route>

            {/* <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute> */}

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /My Reports page 
                // right now redirect to summary until My Reports is done
                <Redirect to="/home" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/home" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
                <Redirect to="/home" />          
            </Route>

            <ProtectedRoute exact path="/input_header">
              <InputHeader />
            </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InputHeader page, else shows LoginPage
            exact
            path="/inputs_add_edit/:month/:year"
          >
            <AddEditInputs />
          </ProtectedRoute>

            {/* Recommendation Detail Component- shows all recommendations for a 
            year/month and allows user to add notes and checkoff action items
            by recommendation. */}
            <ProtectedRoute exact path="/rec_detail/:month/:year">
              <RecommendationDetail />
            </ProtectedRoute>

            <ProtectedRoute exact path="/my_inputs/:month/:year">
              <MonthlyInputs />
            </ProtectedRoute>

            <ProtectedRoute exact path="/mydata">
              <MyData />
            </ProtectedRoute>

            <ProtectedRoute exact path="/my_summary">
              <FinancialSummary />
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
