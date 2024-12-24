import Wrapper from '../assets/wrappers/RegisterPage';
import { useState } from 'react';
import { Logo } from '../components';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
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

        {/* name field */}
        <div className="form-row">
          <label className="form-label" htmlFor="name">
            name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-block" type="submit">
          submit
        </button>
      </form>
    </Wrapper>
  );
};
export default Register;
