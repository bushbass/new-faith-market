import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { useBusinessesContext } from './useBusinessesContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchBusinesses } = useBusinessesContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchBusinesses({ type: 'SET_BUSINESSES', payload: null });
  };
  useNavigate('/login');

  return { logout };
};
