import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Card, CardContent, Paper } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import farmsImage from '../../Assets/images/farms.png';
import nonprofitsImage from '../../Assets/images/non-profit.png';

function HomePage() {
  const history = useHistory();

  const handleClick = () => {
    history.push();
  };

  return (
    <div>
        
      <Container style={{ paddingTop: '20px' }}>
      <Paper elevation= {10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section id="educate-users">
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
              <ListItemText primary="Empowers your buisness decisions" />
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
           <Typography variant="h4" gutterBottom>
           Explore All Features
          </Typography>
        </section>
        </Paper>
        <section id="free-trial" style={{ marginTop: '40px' }}>
        <Paper elevation= {10} style={{ padding: '20px', marginBottom: '40px' }}>
            <Typography variant="h4" gutterBottom>
                How Nest 8 works for your business type
            </Typography>
            
            <Box sx={{ display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
              <Card sx={{ maxWidth: 300 }}>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={farmsImage} alt="Farms" style={{ width: '100px', height: 'auto' }} />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Farmers: Improve efficiency of your operations, assess your business health, identify growth opportunities.
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
              <Card sx={{ maxWidth: 300 }}>
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img src={nonprofitsImage} alt="Non-profits" style={{ width: '100px', height: 'auto' }} />
                  <CardContent>
                    <Typography variant="body1" gutterBottom>
                      Non-profits: Assess how effective your fundraising efforts are compared to other non-profits.
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Box>

            <Button variant="contained" color="primary" onClick={() => handleClick('/product')}>
                Sign up for free
            </Button>
          </Paper>  
        </section>
        <section id="links" style={{ marginTop: '40px' }}>
        <Paper elevation= {10} style={{ padding: '20px', marginBottom: '40px' }}>
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
          </Paper>
        </section>
      </Container>
    </div>
  );
}

export default HomePage;
