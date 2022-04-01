const initialState = {
  loading: true,
  modal: true,
  chartData: [
    {
      email: "z5@gmail.com",
      quantity: 120,
      date: "18/03/2021",
      time: "17:30",
    },
  ],
  reminderData:[]
};

const quantityReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QTY_SUCCESS":
      return {
        loading: false,
        data: action.data,
        modal: false,
      };
    case "ADD_QTY_FAIL":
      return {
        loading: false,
        data: action.data,
      };
  
  }
};

export default {
  initialState,
  quantityReducer,
};
