export const initMoviesState = {
  popular: [],
  upComming: [],
  popular2: [],
  celebrities: [],
  userRates: [],
  token: "500cc81d4dbf1d8c0a24c0ee8576f22c",
};

export function moviesReducer(state, { type, payload }) {
  switch (type) {
    case "SET_POPULAR":
      return { ...state, ...payload };
    case "SET_POPULAR2":
      return { ...state, ...payload };
    case "SET_UPCOMMING":
      return { ...state, ...payload };
    case "SET_CELEBRITIES":
      return { ...state, ...payload };
    case "SET_USER_RATES":
      return { ...state, ...payload };
    default:
      return state;
  }
}
