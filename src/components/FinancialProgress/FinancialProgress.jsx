import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, 
                           LinearScale, 
                           PointElement,
                           LineElement,
                           Title, 
                           Tooltip,
                           Legend, 
                           Filler } from 'chart.js';
import { getShortMonthName } from "../../utilities/utilities";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function FinancialProgress() {
  const dispatch = useDispatch();
  const graphData = useSelector(store => store.financialMetrics.monthlyGraphData);

  useEffect(() => {
      dispatch({
          type: 'GET_MONTHLY_GRAPH_DATA',
          payload: { fromMonth: 6, 
                     toMonth: 6,
                     fromYear: 2024,
                     toYear: 2024 }
           })
  }, [])

// 1. select a start month/year and an end month/year (default is 13 months or 
//      whatever is availble if less than 13 available)
// 2. get all availble months data from the metric table
// 3. populate a month name array for the table
// 4. populate a variance table for industry (repeated)
// 5. populate a variace table from the metrics.variance_value column
// 6. grab the metric name we are looking at for the table title
// dispatch getGraphData
//   payload: ( fromYear, fromMonth, toYear, toMonth )

  const fromMonth = 6;
  const fromYear =2022;

  const toMonth = 2;
  const toYear = 2024

  // create a month array that starts at mm/yyyy and ends at mm/yyyy
  let monthRangeArray = []; //month numbers to display
  let stopMonth;
  let startMonth;
  for (let i=fromYear; i<=toYear; i++) {
      if (i === toYear) {
        stopMonth = toMonth;
      } else {
        stopMonth = 12;
      }
      if (i !== fromYear) {
        startMonth = 1;
      } else {
        startMonth = fromMonth;
      }
      for(let j=startMonth; j<= stopMonth; j++) {
          // console.log('year:', i, 'month', j);
          // look in our piece of state that contains an array of year/months
          



          // monthRangeArray.push(getShortMonthName(j));
      }
  }
  console.log(monthRangeArray);

// { months: [] , industry_variances = [], user_variances = [] }

//    MM/YYYY to MM/YYYY  // validate input so this is true!!!
//assumption is the first mm/yyyy is an earlier or same month as the second
//  mm/yyyy



    
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
  ``
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