import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box,
         ToggleButtonGroup, 
         ToggleButton, 
         Typography,
         Paper,
         Divider } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, 
                           LinearScale, 
                           PointElement,
                           LineElement,
                           Title, 
                           Tooltip,
                           Legend, 
                           Filler } from 'chart.js';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers'
import { getLastYearsDate } from "../../utilities/utilities";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function FinancialProgress({company}) {

  const today = new Date();
  const dispatch = useDispatch();
  const graphData = useSelector(store => store.financialMetrics.graphData);

  // const [dateRange, setDateRange] = useState({ toMonth: today.getMonth() + 1,
  //                                              fromMonth: today.getMonth() + 1,
  //                                              toYear: today.getFullYear(),
  //                                              fromYear: today.getFullYear() - 1 });
  // Set initial date range for 13 month span ending on today's month
  const [fromDateSelected, setFromDateSelected] = useState(dayjs().subtract(1, 'year')); 
  const [toDateSelected, setToDateSelected] = useState(dayjs()); 
  const [errorMessage, setErrorMsg] = useState('');
                                             
  // These correspond to metrics 1-6 in the metrics table
  //    (default to Profit Margin)
  const [metricSelected, setMetricSelected] = useState(1);

  useEffect(() => {
      dispatch({
          type: 'GET_GRAPH_DATA',
          payload: { fromMonth: fromDateSelected.format('MM'), 
                     toMonth: toDateSelected.format('MM'),
                     fromYear: fromDateSelected.format('YYYY'),
                     toYear: toDateSelected.format('YYYY'),
                     metricId: metricSelected }
           })
  }, [dispatch, fromDateSelected, toDateSelected, metricSelected])

// First MM/YYYY in selection is less than or equal to second MM/YYYY selection

// useEffect(() => {
//   console.log('graph data updated!')
//   console.log(graphData);
// },[graphData])

  const handleMetricChange = (event, newMetric) => {
    if (newMetric !== null) {
      setMetricSelected(newMetric);
    }
  }

  const handleDateRangeChange = (value, mode) => {
    const newSelectedDate = value;
    if (mode = 'from') {
      if (newSelectedDate <= toDateSelected) {
        setFromDateSelected(newSelectedDate);
        setErrorMsg('');
      } else {
        setErrorMsg('From date is less than to date, please re-select range to see graphs');
      }
    } else {
      if (fromDateSelected <= newSelectedDate) {
        setToDateSelected(newSelectedDate);
        setErrorMsg('');
      } else {
        setErrorMsg('From date is less than to date, please re-select range to see graphs');
      }
    }
  }

   
  const numTicks = 7;
  const data = {
    labels: (graphData.shortMonthNameArray),
    datasets: [
      {
        // NOTE: There are two industry data graphs so we can show green 
        //       and red fill zones above and below industry standards
        data: graphData.industryVariances,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)', // green - good
        fill: 'end',
        disableTooltip: true,
        pointStyle: 'rect',
        pointRadius: 6
      },
      {
        data: graphData.industryVariances, 
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(251, 80, 74, 0.37)', //red - bad
        fill: 'start',
        pointStyle: 'rect',
        pointRadius: 6
      },
      {
        // This will be user variance values for each month for a given metric
        data: graphData.userVariances,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        customTooltip: `Your`,
        pointStyle: 'circle',
        pointRadius: 7
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
          // Sets the maximum number of ticks on the x-axis
          ticks: {
              maxTicksLimit: numTicks
          }
      },
      y: {
        beginAtZero: false,
        // These provide space above and below the lines:
        //    set the minimum y-axis tick to the minimum graph value 
        //        minus 30% the range of y-axis values
        //    set the maximum y-axis tick to the maximum graph value 
        //        minus 30% the range of y-axis values
        // min: ((graphData.userVariances && graphData.industryVariances) && Math.min(...graphData.userVariances)),
        min: ((graphData.userVariances && graphData.industryVariances) && 
          (Math.min(...graphData.userVariances , ...graphData.industryVariances)) - 
          (0.30 *(Math.max(...graphData.userVariances , ...graphData.industryVariances) - Math.min(...graphData.userVariances, ...graphData.industryVariances))) ), 
        max: ((graphData.userVariances && graphData.industryVariances) && 
          (Math.max(...graphData.userVariances , ...graphData.industryVariances)) + 
          (0.30 *(Math.max(...graphData.userVariances , ...graphData.industryVariances) - Math.min(...graphData.userVariances, ...graphData.industryVariances))) )
      },
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        // pull the graph title based on the metric selected
        text: (graphData.metric_name && graphData.metric_name)
      }, 
      // disable tooltips for the industry standards
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            // Check if the dataset has the disableTooltip property
            const dataset = context.dataset;
            if (dataset.customTooltip) {
              return `${dataset.customTooltip} ${graphData.metric_name}: ${context.raw}`
            } else if (dataset.disableTooltip) {
              return null; // Return null to disable the tooltip for this dataset
            }
            // Default tooltip label
            return `Industry Standard ${graphData.metric_name}: ${context.raw}`;
          },
          labelTextColor: (context) => {
            const dataset = context.dataset;
            if (dataset.disableTooltip) {
              return 'rgba(0,0,0,0)'; // Make text transparent for disabled tooltip
            }
            return context.chart.options.plugins.tooltip.bodyColor || 'black';
          },          
        } 
      }
    }
  }

  return (
    <Box>
      <Divider sx={{ my: 2 }} textAlign="left" >FINANCIAL PROGRESS </Divider>{/* Add margin top and bottom */}
      <br></br>
      <Paper elevation={10}>
        <br></br><br></br>
        <Typography variant="h4" align="center">
          {(graphData.metric_name && graphData.metric_name)} for {company} </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Date range picker: From date  */}
            <Box align='center'
                 sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Box sx={{ ml: 2 }} textAlign="left">
                  <DatePicker label="From Month / Year"
                              value={fromDateSelected}
                              onChange={(value) => {handleDateRangeChange(value, 'from')}}
                              views={['month', 'year']}
                              maxDate={dayjs()}>            
                  </DatePicker>
              </Box>
              {/* Date range picker: To date */}
              <Box sx={{ ml: 2 }} textAlign="left">
                  <DatePicker label="To Month / Year"
                              value={toDateSelected}
                              onChange={(value) => {handleDateRangeChange(value, 'from')}}
                              views={['month', 'year']}
                              maxDate={dayjs()}>            
                  </DatePicker>
              </Box>
            </Box>
        </LocalizationProvider>
          <br></br>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
          <Box
            sx={{
              width: 10,
              height: 10,
              backgroundColor: 'rgba(111, 189, 191, 1)',
              marginRight: 1, // Add margin for spacing between box and text
            }}
          />
          <Box sx={{ display: 'inline' }}>Industry Standard</Box>
        </Box>
          <Box sx={{ display: 'flex', justifyContent: "center"}}>
            {graphData ? (<Line key={graphData.metric_id}
                      data={data} 
                      options={options} />) : null}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, flexWrap: 'wrap', gap: 1, }}>
          <ToggleButtonGroup value={metricSelected}
                            size="small" // Set the size of the buttons
                            exclusive
                            onChange={handleMetricChange}
                            aria-label="financial metric selection">
            <ToggleButton value={1} aria-label="Profit Margin">
              Profit Margin
            </ToggleButton>
            <ToggleButton value={2} aria-label="Asset Turnover Ratio">
              Asset Turnover Ratio
            </ToggleButton>
            <ToggleButton value={3} aria-label="Financial Leverage Ratio">
              Financial Leverage Ratio
            </ToggleButton>
            <ToggleButton value={4} aria-label="Return on Equity (ROE)">
              Return on Equity (ROE)
            </ToggleButton>
            <ToggleButton value={5} aria-label="Tax Burden">
              Tax Burden
            </ToggleButton>
            <ToggleButton value={6} aria-label="Interest Burden">
              Interest Burden
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>
    </Box>
  )

}

export default FinancialProgress;