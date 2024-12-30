import { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useAppContext } from '../../context/appContext';
import { Alert, FormRow } from '../../components';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    // Guard
    e.preventDefault();
    if (!name || !lastName || !email || !location) {
      displayAlert();
      return;
    }

    // Call API
    updateUser({ name, lastName, email, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}

        <div className="form-center">
          {/* name */}
          <FormRow
            type="text"
            name="name"
            labelText="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          {/* lastName */}
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />

          {/* email */}
          <FormRow
            type="email"
            name="email"
            labelText="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          {/* location */}
          <FormRow
            type="text"
            name="location"
            labelText="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />

          {/* submit button */}
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
