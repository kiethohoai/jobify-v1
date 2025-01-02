import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from './actions';

// Get data from localStorage and set default state
const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
const location = localStorage.getItem('location');

// initialStates
const initialStates = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? user : null,
  token: token ? token : null,
  userLocation: location ? location : '',
  jobLocation: location ? location : '',
  showSidebar: false,
};

// App Context
const AppContext = createContext();

// App Provider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  // Axios config
  const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });

  // Request interceptors
  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptors
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log('AUTH ERROR');
      }

      return Promise.reject(error);
    },
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = (user, location, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };

  const registerUser = async (currentUser) => {
    try {
      dispatch({ type: REGISTER_USER_BEGIN });
      const response = await axios.post('/api/v1/auth/register', currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location, token },
      });

      // save user data to localStorage
      addUserToLocalStorage(user, location, token);

      // Handle Error
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    // Close all alert
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const response = await axios.post('/auth/login', currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location, token },
      });

      // save user data to localStorage
      addUserToLocalStorage(user, location, token);

      // Handle Error
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    // Close all alert
    clearAlert();
  };

  // Setup User
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    try {
      dispatch({ type: SETUP_USER_BEGIN });
      const response = await authFetch.post(`/auth/${endPoint}`, currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, token, alertText },
      });

      // save user data to localStorage
      addUserToLocalStorage(user, location, token);

      // Handle Error
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    // Close all alert
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      console.log(`🚀CHECK > data:`, data);
    } catch (error) {
      console.log(`🚀CHECK > error:`, error.response);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        registerUser,
        loginUser,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
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
