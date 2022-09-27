/* eslint-disable react/prop-types */
import React, { Component } from 'react';

const Input = ({ name, label, error, type, onChange, value /* ...rest */ }) => (
  <div className="form-group">
    {/* "htmlFor" is used, since "for" is a reserved keyword in html */}
    <label htmlFor={name} />
    {label}
    <input
      value={value}
      onChange={onChange}
      type={type}
      id={name}
      name={name}
      className="form-control"
    />
    {error && <div className="alert alert-danger">{error}</div>}
  </div>
);

export default Input;

// ? Note about rest!
//  const Input = ({ name, label, error /* ...rest */ }) => (...
//  {...rest}
// value={value} !!! Can pass these greyed out attributes with rest operator
//  onChange={onChange}
//  type={type}
