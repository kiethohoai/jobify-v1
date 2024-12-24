import Wrapper from '../assets/wrappers/RegisterPage';
import { useState } from 'react';
import { Alert, FormRow, Logo } from '../components';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { showAlert, displayAlert, clearAlert } = useAppContext();

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

    // everything is OK
    console.log(`🚀CHECK > values:`, values);
    clearAlert();
  };

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

        <button className="btn btn-block" type="submit">
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
