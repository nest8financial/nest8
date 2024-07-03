import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import { useHistory } from "react-router-dom";

function RegisterForm() {
  const industries = useSelector((store) => store.industries);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  
  const newProductSelected = useSelector(store => store.products.newProductSelected);

  useEffect(() => {
    dispatch({
      type: "FETCH_INDUSTRIES",
    });
  }, []);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: {
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        industry: industry,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      }
    })
      if (newProductSelected && newProductSelected !== 0) {
        history.push('/review_cart');
      } else {
        history.push('/home');
      }
  }; // end registerUser

  return (
    <Container maxWidth="sm">
      {/* Hi {JSON.stringify(industries )} */}
      <form
        onSubmit={registerUser}
        style={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Account registration
        </Typography>

        {errors.registrationMessage && (
          <Typography variant="body2" color="error">
            {errors.registrationMessage}
          </Typography>
        )}
        <img alt="Login Icon" src="favicon.ico" />
        <TextField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Company Name"
          type="text"
          value={companyName}
          onChange={(event) => setCompanyName(event.target.value)}
          fullWidth
        />
        <Select
          labelId="dynamic-select-label"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
          displayEmpty
          label="Industry"
        >
          <MenuItem value="" disabled>
            Select an Industry
          </MenuItem>
          {industries?.map((industry) => (
            <MenuItem key={industry.id} value={industry.id}>
              {industry.name}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create account
        </Button>
      </form>
    </Container>
  );
}

export default RegisterForm;
