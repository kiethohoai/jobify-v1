import { createContext, useContext, useReducer, useState } from 'react';
import reducer from './reducer';
import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

// initialStates
const initialStates = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

// App Context
const AppContext = createContext();

// App Provider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert, clearAlert }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('Can not use AppContext outside the AppProvider');
  }

  return context;
};

// Export
export { AppProvider, useAppContext, initialStates };
