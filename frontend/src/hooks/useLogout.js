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
    dispatchBusinesses({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
