import React from "react";
import {Container, Typography, Card,CardContent,CardMedia,Grid, Box,Button,} from "@mui/material";
import MyReportsRecommendations from "../MyReportsRecommendations/MyReports/MyReportsRecomendations";
import MembershipPlan from "../MembershipPlan/MembershipPlan";
const reviews = [
  {
    name: "James",
    review:
      "This application has completely changed the way I manage my business finances. Highly recommend it!",
    date: "June 20, 2024",
  },
  {
    name: "Abby",
    review:
      "A fantastic app with an intuitive interface. It has helped me stay organized and pinpoint what improvements to make.",
    date: "May 15, 2024",
  },
  {
    name: "Rae",
    review:
      "Great features to better understand the financial aspects of a small company. It's a must-have tool for anyone in a startup.",
    date: "April 10, 2024",
  },
];

const UseCasePage = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card style={{ marginBottom: "16px", marginTop: "38px" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                How to Use the Application
              </Typography>
              <a
                href="https://youtu.be/pOYc6DBdZGY?si=KzGIO54TEJQsjLbO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  image="https://i.ytimg.com/vi/pOYc6DBdZGY/maxresdefault.jpg"
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
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ marginTop: "32px" }}>
            Customer Reviews
          </Typography>
          {reviews.map((review, index) => (
            <Card key={index} style={{ marginBottom: "16px" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {review.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  "{review.review}"
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {review.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
      <Box my={4}>
        <MembershipPlan />
      </Box>
    </Container>
  );
};

export default UseCasePage;
