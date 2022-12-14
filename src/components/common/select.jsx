/* eslint-disable react/prop-types */
import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <select name={name} id={name} {...rest} className="form-control">
      <option value="select">-- Select a genre --</option>
      {options.map((option) => (
        <option key={option._id} value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default Select;
