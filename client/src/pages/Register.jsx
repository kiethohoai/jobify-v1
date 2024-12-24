import Wrapper from '../assets/wrappers/RegisterPage';
import { useState } from 'react';
import { Alert, FormRow, Logo } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {values.showAlert && <Alert />}

        {/* name field */}
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          labelText="name"
        />

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
      </form>
    </Wrapper>
  );
};
export default Register;
