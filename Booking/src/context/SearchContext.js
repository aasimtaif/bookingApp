import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  city:(localStorage.getItem("city")) || "",
  dates: {
    startDate: localStorage.getItem("startDate") || ""
    , endDate: localStorage.getItem("endDate") || "",
    key: 'selection'
  } || {},
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
      localStorage.setItem("city", JSON.stringify(action.payload.city))
      localStorage.setItem("startDate", action.payload.dates?.startDate)
      localStorage.setItem("endDate", action.payload.dates?.endDate)
      return action.payload;
    case "SET_DATES":
      localStorage.setItem("startDate", action.payload.dates?.startDate)
      localStorage.setItem("endDate", action.payload.dates?.endDate)
      return {
        ...state,
        dates: action.payload.dates,
      };
    case "RESET_SEARCH":
      localStorage.removeItem("city")
      localStorage.removeItem("startDate")
      localStorage.removeItem("endDate")
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  useEffect(() => {
    console.log(state)
  }, [state])
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



















