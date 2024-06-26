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
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import {Theme} from '../Nav/NavTheme'
import './App.css';
import RecommendationDetail from '../RecommendationDetail/RecommendationDetail';
import InputHeader from '../InputHeader/InputHeader';
import MyData from '../MyData/MyData';
import AddEditInputs from "../AddEditInputs/AddEditInputs";
import MonthlyInputs from "../MonthyInputs/MonthlyInputs";
import MembershipPlan from "../MembershipPlan/MembershipPlan";
import FinancialsPage from "../FinancialsPage/FinancialsPage"
import MyReportsRecommendations from "../MyReportsRecommendations/MyReports/MyReportsRecomendations";
import Profile from "../Profile/Profile";
import ReviewCartPlaceOrder from "../ReviewCartPlaceOrder/ReviewCartPlaceOrder";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";

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
  const newProductSelected = useSelector(store => store.products.newProductSelected);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    
    <ThemeProvider theme={Theme}>
      <Router>
        <div>
          <Nav />

          <Switch>
            {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
            <Redirect exact from="/" to="/home" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
            <Route exact path="/home">
              <HomePage />
            </Route>

            {/* If the user is already logged in and
                a new product HAS been selected
                  - redirect to the review carts screen to finalize their order           
                Else, if a user is already logged in and a new product
                HAS NOT been selected
                  - redirect to the /financials (Reports) page
                Otherwise, if no user logged in
                  - show the login page                         */}
              <Route exact path="/login">
              { user.id ? ( 
                newProductSelected && newProductSelected !== 0 ? (
              <Redirect to="/review_cart" />
              ) : ( 
                newProductSelected === 0 || newProductSelected === 'undefined' ? (
              <Redirect to="/financials" />
              ) : (
                <LoginPage />
              ))) : (
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

            <Route exact path="/review_cart">
                <ReviewCartPlaceOrder />          
            </Route>

            <Route exact path="/order_confirmation">
                <OrderConfirmation />          
            </Route>

            <ProtectedRoute exact path="/input_header">
              <InputHeader />
            </ProtectedRoute>

            <Route exact path="/product_page">
              <MembershipPlan/>
            </Route>

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

            <ProtectedRoute exact path="/my_inputs">
              <MonthlyInputs />
            </ProtectedRoute>

            <ProtectedRoute exact path="/my_data">
              <MyData />
            </ProtectedRoute>

            <ProtectedRoute exact path="/financials">
              <FinancialsPage />
            </ProtectedRoute>

            <ProtectedRoute exact path="/my_reports_recommendations">
              < MyReportsRecommendations />
            </ProtectedRoute>

            <ProtectedRoute exact path="/my_profile">
              <Profile />
            </ProtectedRoute>

          
            {/* <ProtectedRoute path="/financial_recommendation" >
            <FinancialRecommendation />
            </ProtectedRoute> */}
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
