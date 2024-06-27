import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button, Typography, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Card, CardContent, Paper } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FacebookIcon from '@mui/icons-material/Facebook';
import farmsImage from '../../Assets/images/farms.png';
import nonprofitsImage from '../../Assets/images/non-profit.png';
import entrepreneurImage from '../../Assets/images/entrepreneur.png';


function HomePage() {

  const history = useHistory();
  const dispatch = useDispatch();

  // reset the product selection if user goes to the home page or 
  //      the logout page
  useEffect(() => {
    dispatch({ 
      type: 'SET_NEW_PRODUCT_SELECTED',
      payload: 0
    })
  })
  const handleClick = (route) => {
    history.push(route);
  };


  return (

      <Container style={{ paddingTop: '20px' }}>
      <Paper elevation= {10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section id="educate-users">
        <img src={entrepreneurImage} 
              alt="Entrepreneur" 
              style={{ 
                width: '250px', 
                height: 'auto', 
                border: '2px solid #000',
                borderRadius: '8px' }}
                 />
          <Typography>How well is your entrepreneurial business doing?</Typography>
          <Button variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleClick('/use_case')}>
            Learn what Nest 8 can do
          </Button>
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
           <Button variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleClick('/product_page')}>
           Explore All Features
           </Button>
        </section>
        </Paper>
        <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section id="free-trial" style={{ marginTop: '40px' }}>
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
          <Button variant="contained" color="primary" onClick={() => handleClick('/product_page')}>
            Sign up for free
          </Button>
        </section>
      </Paper>
      <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section>
          <Typography>Try N8 for free, then decide which plan best suits your business</Typography>
          <Box sx={{ border: 0.1, p: 2, width: 0.3 }}>
            <Typography>30-day free trial</Typography>
            <Typography>$0</Typography>
            <Typography>Access all N8 features</Typography>
            <Typography>Input your data</Typography>
            <Typography>24/7 online support</Typography>
            <Typography>Cancel anytime</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={() => handleClick('/product_page')}
          >
            Try Nest8 for free (30 day trial)
          </Button>
        </section>
      </Paper>
      <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section id="links" style={{ marginTop: '40px' }}>
          <Typography variant="h4" gutterBottom>
            Quick Links 
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">Nest8 Software</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/features')}>Features</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/pricing')}>Pricing</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Support</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/faq')}>FAQ</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/contact')}>Contact Us</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Company</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/our_story')}>Our Story</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6">|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/mission')}>Mission</Button>
            </Grid>
          </Grid>
          <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
            
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
            &copy; {new Date().getFullYear()} Nest 8. All rights reserved. Nest8 is a trademark of Nest8 LLC
          </Typography>
          <Link href="/legal">Legal</Link> | <Link href="/privacy">Privacy Notice</Link> | <Link href="/accessibility">Accessibility</Link>
        </section>
      </Paper>
      </Container>
  );
}

export default HomePage;
