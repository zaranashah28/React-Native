const initialState = {
  darkMode: false,
};

const themeReducer = (prevState, action) => {
  switch (action.type) {
    case "DARKMODE":
      return {
        darkMode: true,
      };
    case "LIGHTMODE":
      return {
        darkMode: false,
      };

    default:
      prevState;
  }
};

export default {
  initialState,
  themeReducer,
};
