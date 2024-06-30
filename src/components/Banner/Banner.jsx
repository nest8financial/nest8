import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import entrepreneurImage from '../../Assets/images/pexels-rdne-8541406_cropped.jpg';

const BannerContainer = styled(Box)({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
});

const BackgroundImage = styled('img')({
  width: '100%',
  height: 'auto',
});

const BannerText = styled(Box)({
  position: 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  paddingTop: '2%',
  paddingBottom: '2%',
  textAlign: 'center',
});

const Banner = () => {
  return (
    <BannerContainer>
      <BackgroundImage src={entrepreneurImage} alt="Background" />
      <BannerText>
        <Typography sx={{ fontStyle: 'italic', alignText: 'center',  typography: { sm: 'h5', xs: 'h6', m:'h4' }}} variant="h4">How well is your entrepreneurial business doing?</Typography>
      </BannerText>
    </BannerContainer>
  );
}

export default Banner;
