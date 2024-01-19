import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city: JSON.parse(localStorage.getItem("city")) || "",
  dates: [{
    startDate: localStorage.getItem("startDate")
    , endDate: localStorage.getItem("endDate"),
    key: 'selection'
  }] || [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":

      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("startDate", state.dates[0]?.startDate)
    localStorage.setItem("endDate", state.dates[0]?.endDate)

    localStorage.setItem("city", JSON.stringify(state.city))
  }
    , [state]);
  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};



















