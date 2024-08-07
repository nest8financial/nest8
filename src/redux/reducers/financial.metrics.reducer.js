import { combineReducers } from "redux";

/**
 * The financialMetrics Reducer sets up state in the
 *      store relating to the six computed financial metrics
 *      and the corresponding variances from industry standards
 */

/**
 * Gets a single month's computed metrics and variances
 *  along with metric texts and corresponding recommendation texts
 */
const singleMonthMetrics = (state = [], action) => {
  if (action.type === "SET_SINGLE_MONTH_METRICS") {
    if (action.payload.length === 0) {
      return [];
    }
    return action.payload;
  }
  return state;
};

/**
 * Gets all computed metrics and variances
 *  along with metric texts and corresponding recommendation texts
 */
const monthlyMetrics = (state = [], action) => {
  if (action.type === "SET_MONTHLY_METRICS") {
    return action.payload;
  }
  return state;
};

/**
 * Gets all computed variances and industry variances for graph component
 *  along with metric texts and corresponding recommendation texts
 */
const graphData = (state = {}, action) => {
  if (action.type === "SET_GRAPH_DATA") {
    if (Object.keys(action.payload).length !== 0) {
      return action.payload;
    } else {
      return {};
    }
  }
  return state;
};

/**
 * Gets a single month's  variances
 */
const singleMonthVariances = (state = [], action) => {
  if (action.type === "SET_SINGLE_MONTH_VARIANCES") {
    if (action.payload.length === 0) {
      return [];
    }
    return action.payload;
  }
  return state;
};

export default combineReducers({
  singleMonthMetrics,
  monthlyMetrics,
  singleMonthVariances,
  graphData,
});
