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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
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
  showSidebar: false,

  // Job State Value
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',

  jobLocation: location ? location : '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['pending', 'interview', 'declined'],
  status: 'pending',

  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,

  stats: {},
  monthlyApplications: [],

  // search
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

// App Context
const AppContext = createContext();

// App Provider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  // Axios config
  const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
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
        logoutUser();
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
      dispatch({ type: UPDATE_USER_BEGIN });

      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    try {
      dispatch({ type: CREATE_JOB_BEGIN });
      const { position, company, jobLocation, jobType, status } = state;

      // Call API
      await authFetch.post('/jobs', {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_JOB_ERROR, payload: error.response.data.msg });
    }

    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    try {
      dispatch({ type: GET_JOBS_BEGIN });

      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });

      // eslint-disable-next-line
    } catch (error) {
      logoutUser();
    }

    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    try {
      dispatch({ type: EDIT_JOB_BEGIN });

      // data
      const { position, company, jobLocation, jobType, status } = state;

      // fetching
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      // success
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: EDIT_JOB_ERROR, payload: { msg: error.response.data.msg } });
    }

    // clear all alert
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();

      // eslint-disable-next-line
    } catch (error) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get(`/jobs/stats`);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: { stats: data.defaultStats, monthlyApplications: data.monthlyApplications },
      });

      // eslint-disable-next-line
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page },
    });
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
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilter,
        changePage,
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

// eslint-disable-next-line
export { AppProvider, useAppContext, initialStates };
