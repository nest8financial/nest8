import React from "react";
import "./Footer.css";
import { Typography, Container } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Container className="container">
        <Typography sx={{ fontSize: "small", textAlign: "center" }}>
          &copy; Nest 8 all rights reserved
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
