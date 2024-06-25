import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function HomePage() {
  const history = useHistory();

  const handleClick = () => {
    history.push();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        height: '100vh',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        // '& > *': {
        //   scrollSnapAlign: 'start',
        //   height: '100vh',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   padding: '20px',
        //   border: '1px solid #e0e0e0',
        // }
      }}
    >

      <Container sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', border: '1px solid #e0e0e0', scrollSnapAlign: 'start', boxSizing: 'border-box', }}> 
        <section id="educate-users" sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Learn what Nest 8 can do
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="All-in-one tracker" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Smart data and insights" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Empowers your business decisions" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Entrepreneurs best companion" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckBoxIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Everything you need in your pocket" />
            </ListItem>
           </List>
           <Typography variant="h5" gutterBottom>
           Explore All Features
          </Typography>
        </section>
        </Container>

      <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', border: '1px solid #e0e0e0', scrollSnapAlign: 'center', boxSizing: 'border-box',  }}>
        <section id="free-trial" sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom>
            How Nest 8 works for your buisness type
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleClick('/product')}>
            Sign up for free 
          </Button>
        </section>
      </Container>

      <Container sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', border: '1px solid #e0e0e0', scrollSnapAlign: 'end', boxSizing: 'border-box',  }}>
        <section id="links" sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
            Quick Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/features')}>Features</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/pricing')}>Pricing</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/faq')}>FAQ</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/contact')}>Contact Us</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/our-story')}>Our Story</Button>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/mission')}>Mission</Button>
            </Grid>
          </Grid>
          <Typography variant="h4" gutterBottom>
            Connect with Us
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <IconButton color="primary" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" href="https://youtube.com">
                <YouTubeIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Typography variant="body2" style={{ marginTop: '20px' }}>
            &copy; {new Date().getFullYear()} Nest 8. All rights reserved.
          </Typography>
          <Link href="/legal">Legal</Link> | <Link href="/privacy">Privacy Notice</Link> | <Link href="/accessibility">Accessibility</Link>
        </section>
      </Container>
    </Box>
  );
}

export default HomePage;
