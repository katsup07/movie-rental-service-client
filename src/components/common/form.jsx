import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  /* validates the entire form--"username is required" will show if input fields are left empty when clicking Login */
  /* sets error types */
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    const { error } = result;

    if (!error) return null;
    const errors = {};
    for (const item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  /* Validates a single input property--"username is requred" will show if you input text and then remove it */
  // destructure "input" to { name, value }
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (error) console.dir(error.details[0].message);

    if (!error) return null;
    return error ? error.details[0].message : null;
  };

  /* checks for errors, updates state, and submits to imaginary server if none  */
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log('submitting...', 'validating...', errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  /* handles input field changes and... */
  // e.currentTarget = input
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const { name, value } = input;
    const data = { ...this.state.data };
    data[name] = value; // id will be username or password
    this.setState({ data, errors });
    console.log(this.state.data);
  };

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }

  //  genreId', 'Genre', this.state.genres
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
