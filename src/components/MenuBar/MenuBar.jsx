import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useHistory} from "react-router"
import MyData from '../MyData/MyData'
import InputHeader from '../InputHeader/InputHeader'




function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    const history = useHistory()
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function MenuBar() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Inputs" {...a11yProps(0)} />
            <Tab label="Reports" {...a11yProps(1)} />
            <Tab  label="My Data" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <InputHeader />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
         
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
        <MyData/>
        </CustomTabPanel>
      </Box>
    );
  }