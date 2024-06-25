import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
} from "@mui/material";

const reviews = [
  {
    name: "User 1",
    review:
      "This application has completely changed the way I manage my buisness finances. Highly recommend it!",
    date: "June 20, 2024",
  },
  {
    name: "User 2 ",
    review:
      "A fantastic app with an intuitive interface. It has helped me stay organized and pinpoint what improvments to make.",
    date: "May 15, 2024",
  },
  {
    name: "User 3",
    review:
      "Great features to better understand the financial aspects of a small company. It's a must-have tool for anyone in a Start Up.",
    date: "April 10, 2024",
  },
];

const AppDemo = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" gutterBottom align="center">
          Why Sign Up for Our Application?
        </Typography>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Customer Reviews
          </Typography>
          <Grid container spacing={4}>
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <a
                      href="https://youtu.be/pOYc6DBdZGY?si=KzGIO54TEJQsjLbO"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CardMedia
                        component="img"
                        image="https://i.ytimg.com/vi/pOYc6DBdZGY/maxresdefault.jpg" // Replace with the thumbnail URL of your YouTube video
                        title="How to use the application"
                        style={{ cursor: "pointer" }}
                      />
                    </a>
                    <Box mt={2} display="flex" justifyContent="center">
                      <Button
                        variant="contained"
                        color="primary"
                        href="https://youtu.be/pOYc6DBdZGY?si=KzGIO54TEJQsjLbO"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch on YouTube
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            How to Use the Application
          </Typography>
          <Card>
            <CardContent>
              <a
                href="https://youtu.be/pOYc6DBdZGY?si=KzGIO54TEJQsjLbO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  image="" 
                  title="Example video"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <Box mt={2} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  href="https://youtu.be/pOYc6DBdZGY?si=KzGIO54TEJQsjLbO"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default AppDemo;
