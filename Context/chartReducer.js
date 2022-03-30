const initialState = {
  loading: true,
  chartData: [
    {
      email: "z5@gmail.com",
      quantity: 700,
    },
  ],
};

const chartReducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_CHART_REQUEST":
      return {
        loading: false,
        // chartData: action.data,
      };
    case "FETCH_CHART_SUCCESS":
      return {
        loading: false,
        chartData: action.data,
      };
    case "FETCH_CHART_FAIL":
      return {
        loading: false,
        chartData: action.data,
      };

    default:
      prevState;
  }
};

export default {
  initialState,
  chartReducer,
};
