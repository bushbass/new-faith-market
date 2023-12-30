import { BusinessesContext } from '../context/BusinessContext';
import { useContext } from 'react';

export const useBusinessesContext = () => {
  const context = useContext(BusinessesContext);

  if (!context) {
    throw Error(
      'useBusinessesContext must be used inside an BusinessesContextProvider'
    );
  }

  return context;
};
