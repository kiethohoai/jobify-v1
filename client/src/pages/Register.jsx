import Wrapper from '../assets/wrappers/RegisterPage';
import { useEffect, useState } from 'react';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,
    // registerUser,
    // loginUser,
    user,
    setupUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // handle input change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handle form submit
  const onSubmit = (e) => {
    e.preventDefault();

    // check empty fields
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    // prepare data
    const currentUser = {
      name,
      email,
      password,
    };

    // invoke register/login with api
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      });
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {/* name field */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="name"
          />
        )}

        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="email"
        />

        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="password"
        />

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
