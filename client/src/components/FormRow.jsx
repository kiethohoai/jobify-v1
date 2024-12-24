const FormRow = ({ type, name, value, labelText, handleChange }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor="name">
        {labelText || name}
      </label>
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;
