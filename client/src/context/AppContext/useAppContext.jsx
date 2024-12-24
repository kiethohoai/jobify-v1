import { useContext } from 'react';
import { AppContext } from './appContext';

// Custom Hook
const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('Can not use AppContext outside the AppProvider');
  }

  return context;
};

export default useAppContext;
