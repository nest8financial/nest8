import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button, Typography, Container, Grid, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Card, CardContent, Paper, Divider } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FacebookIcon from '@mui/icons-material/Facebook';
import farmsImage from '../../Assets/images/farms.png';
import nonprofitsImage from '../../Assets/images/non-profit.png';
import entrepreneurImage from '../../Assets/images/entrepreneur.png';
import Banner from '../Banner/Banner';

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'SET_NEW_PRODUCT_SELECTED',
      payload: 0
    });
  }, [dispatch]);

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <Container style={{ paddingTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Box style={{ flexGrow: 1 }}></Box>
      <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
        <section id="educate-users">
          <Banner />
          <Button variant="contained" sx={{ textTransform: "none", mt: '-15%', width: '80%', color: 'black' }} onClick={() => handleClick('/use_case')}>
            Learn what Nest 8 can do
          </Button>
          <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <List>
              <ListItem sx={{ my: -1 }}>
                <ListItemIcon>
                  <CheckBoxIcon color="black" />
                </ListItemIcon>
                <ListItemText primary="All-in-one tracker" />
              </ListItem>
              <ListItem sx={{ my: -1 }}>
                <ListItemIcon>
                  <CheckBoxIcon color="black" />
                </ListItemIcon>
                <ListItemText primary="Smart data and insights" />
              </ListItem>
              <ListItem sx={{ my: -1 }}>
                <ListItemIcon>
                  <CheckBoxIcon color="black" />
                </ListItemIcon>
                <ListItemText primary="Empowers your business decisions" />
              </ListItem>
              <ListItem sx={{ my: -1 }}>
                <ListItemIcon>
                  <CheckBoxIcon color="black" />
                </ListItemIcon>
                <ListItemText primary="Entrepreneur's best companion" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon color="black" />
                </ListItemIcon>
                <ListItemText primary="Everything you need in your pocket" />
              </ListItem>
            </List>
          </Box>
          <Button variant="contained" sx={{ textTransform: "none", margin: '10px auto', width: '80%' }} onClick={() => handleClick('/product_page')}>
            Explore All Features
          </Button>
        </section>
      </Paper>
      <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
      <section id="free-trial" style={{}}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          How Nest 8 works for <br></br><em>your</em> business type
        </Typography>
        <Typography variant="h6" textAlign="center" sx={{ fontStyle: 'italic' }} gutterBottom>
          Customized solutions for your specialized business
        </Typography>
        <Divider sx={{ mb: 3 }}></Divider>
        <Box sx={{ display: 'flex',
                   gap: '20px', 
                   flexDirection: 'column', 
                   justifyContent: 'center', 
                   alignItems: 'center' }}>
          <Card elevation={10} sx={{ maxWidth: 600}}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' ,
                   m: 2 }}>
              <img src={farmsImage} alt="Farms" style={{ width: '175px', height: 'auto' }} />
              <CardContent>
                <Typography variant="body1" textAlign="center" gutterBottom>
                  Farmers: Improve efficiency of your operations, assess your business health, identify growth opportunities.
                </Typography>
              </CardContent>
            </Box>
          </Card>
          <Card elevation={10} sx={{ maxWidth: 600 }}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center',
                   m: 2 }}>
              <img src={nonprofitsImage} alt="Non-profits" style={{ width: '175px', height: 'auto' }} />
              <CardContent>
                <Typography variant="body1" textAlign="center" gutterBottom>
                  Non-profits: Assess how effective your fundraising efforts are compared to other non-profits.
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant="outlined" sx={{  mt: 5, mr: 2, alignSelf: 'flex-end'}} onClick={() => handleClick('/product_page')}>
            Sign up for free
          </Button>
        </Box>
      </section>
    </Paper>
    <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px', textAlign: 'center', width: '100%', maxWidth: '800px' }}>
        <section>
          <Typography variant="h4" style={{}}>
            Try N8 for free, then decide which plan best suits your business
            </Typography>
          <Box sx={{ border: 0.1, p: 2, width: '60%', my: 3, mx: 'auto' }}>
            <Typography variant="h6">30-day free trial</Typography>
            <Typography variant="h4">$0</Typography>
            <List sx={{ ml: 6, listStyleType: 'disc' }}>
              <ListItem sx={{ display: 'list-item' }}>Access all N8 features
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>Input your data
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>24/7 online support
              </ListItem>
              <ListItem sx={{ display: 'list-item' }}>Cancel anytime
              </ListItem>
           </List>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", marginTop: '20px', width: '80%' }}
            onClick={() => handleClick('/product_page')}
          >
            Try Nest8 for free (30 day trial)
          </Button>
        </section>
      </Paper>
      <Paper elevation={10} style={{ padding: '20px', marginBottom: '40px',  width: '100%', maxWidth: '800px' }}>
        <section id="links">
          <Typography variant="h4" sx={{mb: 3}} gutterBottom>
            Quick Links
          </Typography>
          <Grid container spacing={.1} >
            <Grid item xs={12}>
              <Typography variant="h6" >Nest8 Software</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" 
                      sx={{ textTransform: "none", fontSize: 'large' }}
                      onClick={() => handleClick('/features')}>Features</Button>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{mt: 1}}>|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" 
                      sx={{ textTransform: "none", fontSize: 'large' }}
                      onClick={() => handleClick('/pricing')}>Pricing</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" >Support</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/faq')}>FAQ</Button>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{mt: 1}}>|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" 
                      sx={{ textTransform: "none", fontSize: 'large' }}
                      onClick={() => handleClick('/contact')}>Contact Us</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" >Company</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" 
                      sx={{ textTransform: "none" , fontSize: 'large'}}
                      onClick={() => handleClick('/our_story')}>Our Story</Button>
            </Grid>
            <Grid item>
              <Typography variant="h5" sx={{mt: 1}} >|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" 
                      sx={{ textTransform: "none", fontSize: 'large'}}
                      onClick={() => handleClick('/mission')}>Mission</Button>
            </Grid>
          </Grid>


          <Grid item style={{ marginTop: '70px', marginBottom: '1px'}}>
              <Typography variant="h7" >@ 2024 Nest8. All rights reserved. 'Nest8' is a trademark of Nest8 LLC</Typography>
            </Grid>
         
          <Grid container spacing={2} justifyContent="center" >
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
              
          
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button size="large" color="primary" onClick={() => handleClick('/legal')}>Legal</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6" textAlign='center'>|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/privacy')}>Privacy Notice</Button>
            </Grid>
            <Grid item>
              <Typography variant="h6" textAlign='center'>|</Typography>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={() => handleClick('/accessibility')}>Accessibility</Button>
            </Grid>
          </Grid>
        </section>
      </Paper>
      <Box style={{ flexGrow: 1 }}></Box>
    </Container>
  );
}

export default HomePage;
