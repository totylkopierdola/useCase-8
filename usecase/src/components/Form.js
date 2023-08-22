import React, { useState } from 'react';
import './Form.css';
import { connect } from 'react-redux';
import { updateField } from '../store/actions';

const Form = ({ firstName, lastName, email, message, updateField }) => {

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    updateField(field, value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!message) newErrors.message = 'Message is required';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid';
    if (message && message.length < 10) newErrors.message = 'Message should be at least 10 characters long';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      updateField('firstName', '');
      updateField('lastName', '');
      updateField('email', '');
      updateField('message', '');
      setIsSubmitted(true)
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };


  return (
    <div className='form-container'>

      <form onSubmit={handleSubmit}>
        <div className='form-item'>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className='form-item'>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className='form-item'>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className='form-item'>
          <textarea placeholder='Message' value={message} onChange={(e) => handleInputChange('message', e.target.value)} />
          {errors.message && <p className="error">{errors.message}</p>}

          <button type="submit">Submit</button>
        </div>
      </form>

      <div className="value-list">
        <h2>Stored Values:</h2>
        <ul>
          <li><span className='bold'>First Name:</span> {firstName}</li>
          <li><span className='bold'>Last Name:</span> {lastName}</li>
          <li><span className='bold'>Email:</span> {email}</li>
          <li><span className='bold'>Message:</span> {message}</li>
        </ul>
      </div>

      <div className="success-message">
        {isSubmitted && (
          <p className="success">Form submitted successfully!</p>
        )}
      </div>


    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    message: state.message,
  };
};

const mapDispatchToProps = {
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
