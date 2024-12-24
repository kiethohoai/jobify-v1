import { createContext, useState } from 'react';
import { initialStates } from './initialStates';

// App Context
const AppContext = createContext();

// App Provider
const AppProvider = ({ children }) => {
  const [states, setStates] = useState(initialStates);

  return (
    <AppContext.Provider value={{ ...states }}>{children}</AppContext.Provider>
  );
};

// Export
export { AppProvider, AppContext };
