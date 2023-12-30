import { createContext, useReducer } from 'react';

export const BusinessesContext = createContext();

export const businessesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        businesses: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        businesses: [action.payload, ...state.businesses],
      };
    case 'DELETE_WORKOUT':
      return {
        businesses: state.businesses.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const BusinessesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(businessesReducer, {
    businesses: null,
  });

  return (
    <BusinessesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BusinessesContext.Provider>
  );
};
