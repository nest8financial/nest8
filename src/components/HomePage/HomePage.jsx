import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Card, CardContent, Paper } from '@mui/material';
import { Button, Typography, Container, Grid, Link, List, ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material';
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

  return (

      <Container style={{ paddingTop: '20px' }}>
      <Paper elevation= {10} style={{ padding: '20px', marginBottom: '40px' }}>
        <section id="educate-users">
          -- Image of entrepreneur here --
          <Typography>How well is your entrepreneurial business doing?</Typography>
          <Button variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => history.push('/use_case')}>
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
                  onClick={() => history.push('/product_page')}>
           Explore All Features
           </Button>
        </section>
        </Paper>
        <section id="free-trial" style={{ marginTop: '40px' }}>
          <Typography variant="h4" gutterBottom>
            How Nest 8 works for your buisness type
          </Typography>
          --Image of Farmers--
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography>Farmers
            </Typography>
            <Typography>Improve efficiency of your operations, asses your business health, identify growth opportunities. 
            </Typography>
          </Box>
          --Image of Non-Profits--
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography>Non-Profits</Typography>
            <Typography>Assess the effectiveness of your fundraising efforts, compare to other non-profits.</Typography>
          </Box>
          <Button variant="contained" 
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={() => history.push('/product_page')}>
            Sign up for free 
          </Button>
        </section>
        <section>
          <Typography>Try N8 for free, then decide which plan best suits your business</Typography>
          <Box sx={{ border: .1, p: 2, width: .3 }}>
            <Typography>30-day free trial</Typography>
            <Typography>$0</Typography>
            <Typography>Access all N8 features</Typography>
            <Typography>Input your data</Typography>
            <Typography>24/7 online support</Typography>
            <Typography>Cancel anytime</Typography>
          </Box>
          <Button variant="contained" 
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={() => history.push('/product_page')}>Try Nest8 for free (30 day trial)</Button>
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
  );
}

export default HomePage;
