import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, 
                           LinearScale, 
                           PointElement,
                           LineElement,
                           Title, 
                           Tooltip,
                           Legend, 
                           Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function FinancialProgress() {
  const today = new Date();
  const dispatch = useDispatch();
  const graphData = useSelector(store => store.financialMetrics.graphData);
  // Set initial date range for 13 month span ending on today's month
  const [dateRange, setDateRange] = useState({ toMonth: today.getMonth() + 1,
                                               fromMonth: today.getMonth() + 1,
                                               toYear: today.getFullYear(),
                                               fromYear: today.getFullYear() - 1 });
  // These correspond to metrics 1-6 in the metrics table
  //    (default to Profit Margin)
  const [metricSelected, setMetricSelected] = useState(1);
  const [alignment, setAlignment] = useState('left') // State to manage selected value

  useEffect(() => {
      dispatch({
          type: 'GET_GRAPH_DATA',
          payload: { fromMonth: dateRange.fromMonth, 
                     toMonth: dateRange.toMonth,
                     fromYear: dateRange.fromYear,
                     toYear: dateRange.toYear,
                     metricId: metricSelected }
           })
  }, [dispatch, dateRange, metricSelected])

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
        disableTooltip: true
      },
      {
        data: graphData.industryVariances, 
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(251, 80, 74, 0.37)', //red - bad
        fill: 'start'
      },
      {
        // This will be user variance values for each month for a given metric
        data: graphData.userVariances,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        customTooltip: `Your`
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
            // // Default tooltip label
            return `Industry Standard ${graphData.metric_name}: ${context.raw}`;
          },
          labelTextColor: (context) => {
            const dataset = context.dataset;
            if (dataset.disableTooltip) {
              return 'rgba(0,0,0,0)'; // Make text transparent for disabled tooltip
            }
            return context.chart.options.plugins.tooltip.bodyColor || 'black';
          }
        } 
      }
    }
  }

  return (
    <Container>
      <Box>
        {graphData ? (<Line key={graphData.metric_id}
                  data={data} 
                  options={options} />) : null}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
      <ToggleButtonGroup
        value={metricSelected}
        exclusive
        onChange={handleMetricChange}
        aria-label="metric selection"
      >
        <ToggleButton value={1} aria-label="Metric 1">
          Profit Margin
        </ToggleButton>
        <ToggleButton value={2} aria-label="Metric 2">
          Asset Turnover Ratio
        </ToggleButton>
        <ToggleButton value={3} aria-label="Metric 3">
          Financial Leverage Ratio
        </ToggleButton>
        <ToggleButton value={4} aria-label="Metric 4">
          Return on Equity (ROE)
        </ToggleButton>
        <ToggleButton value={5} aria-label="Metric 5">
          Tax Burden
        </ToggleButton>
        <ToggleButton value={6} aria-label="Metric 6">
          Interest Burden
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
    </Container>
  )

}

export default FinancialProgress;