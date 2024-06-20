import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { 
    Container,
    Box, 
    Button } from '@mui/material';

function FinancialProgress() {
    const dispatch = useDispatch();
    const graphData = useSelector(store => store.financialMetrics.monthlyGraphData);

    useEffect(() => {
        dispatch({
            type: 'GET_MONTHLY_GRAPH_DATA',
            payload: { isDefault: true }
        })
    }, [])

    
    const startMonthName = 'June';
    const startYear = 2023;
    const endMonthName = 'June';
    const endYear = 2024;
    const metricName = 'Profit Margin';  // will be from metrics.metric_name
    const numTicks = 7;
  
    const data = {
      labels: ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      // labels: ['JUN', '', 'AUG', '', 'OCT', '', 'DEC', '', 'FEB', '', 'APR', '', 'JUN'],
      datasets: [
        {
          data: [.2, .2, .2, .2, .2, .2, .2, .2, .2, .2, .2, .2, .2], 
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          // fill: true,
        },
        {
          // this will be variance_values for each month for a given metric
          data: [-1.2, -.4, -.6, -.5, -.2, 1, 0, .4, .7, .6, .8, .8, .7],
          borderColor: 'rgba(153,102,255,1)',
          backgroundColor: 'rgba(153,102,255,0.2)',
          // fill: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        x: {
            ticks: {
                maxTicksLimit: numTicks
            }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `${metricName}`,
        },  
      }
    }
  
  
    return <Line data={data} options={options} />;


}

export default FinancialProgress;