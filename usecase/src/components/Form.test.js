import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Form from './Form';
import { updateField } from '../store/actions';

const mockStore = configureStore([]);

describe('Form Component', () => {
  // Previous test

  it('updates state correctly when input values change', () => {
    const initialState = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });

    const actions = store.getActions();
    expect(actions).toContainEqual(updateField('firstName', 'John'));
    expect(actions).toContainEqual(updateField('lastName', 'Doe'));
  });


  it('displays validation errors for invalid email', () => {
    const initialState = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalidemail',
      message: 'Hello',
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Email address is invalid')).toBeInTheDocument();
  });

  it('displays validation error for short message', () => {
    const initialState = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      message: 'Short',
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Message should be at least 10 characters long')).toBeInTheDocument();
  });

  it('displays validation errors for all inputs when all are empty', () => {
    const initialState = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Message is required')).toBeInTheDocument();
  });


  // Add more tests for other scenarios, e.g., valid submission, success message, etc.
});
