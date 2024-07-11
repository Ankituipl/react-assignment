import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { MemoryRouter } from 'react-router-dom';


beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
});

afterEach(() => {
  console.log.mockRestore();
});
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('LoginForm', () => {
  // Logo visible 
  test('renders logo on login page', () => {
    const { getByTestId } = render(<App />);
    const logoElement = getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  // Invalid email 
  test('displays error message for invalid email', () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);
    const emailInput = getByLabelText(/email/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.click(loginButton);

    expect(getByTestId('error')).toHaveTextContent('Invalid email address');
  });

  // Excludes public provider emails such as Gmail, Outlook,
  test('displays error message for invalid email', () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);
    const emailInput = getByLabelText(/email/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'abc@gmail.com' } });
    fireEvent.click(loginButton);

    expect(getByTestId('error')).toHaveTextContent('Public email addresses are not allowed');
  });

  // Excludes public provider emails such as Gmail, Outlook,
  test('displays error message for invalid email', () => {
    const { getByLabelText, getByText, getByTestId } = render(<App />);
    const emailInput = getByLabelText(/email/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'abc@gmail.com' } });
    fireEvent.click(loginButton);

    expect(getByTestId('error')).toHaveTextContent('Public email addresses are not allowed');
  });

  // Valid email
  test('does not display error message for valid email', () => {
    const { getByLabelText, getByText, queryByTestId } = render(<App />);

    const emailInput = getByLabelText(/email/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.click(loginButton);

    expect(queryByTestId('error')).toBeNull();
  });

  // Valid corporate email
  test('Accepts emails from Noventiq or other corporate domains.', () => {
    const { getByLabelText, getByText, queryByTestId } = render(<App />);
    const emailInput = getByLabelText(/email/i);
    const loginButton = getByText(/login/i);

    fireEvent.change(emailInput, { target: { value: 'eamil@noventiq.com' } });
    fireEvent.click(loginButton);

    expect(queryByTestId('error')).toBeNull();
  });

  // temporarily view the password.
  test('toggles password visibility', () => {
    const { getByTestId } = render(<App />);
    const passwordInput = getByTestId('password');
    const toggleButton = getByTestId('password-visibility');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });


  test('selects different languages', () => {
    const { getByTestId } = render(<App />);
    const selectElement = getByTestId('language-select');
    expect(selectElement.value).toBe('en');
    fireEvent.change(selectElement, { target: { value: 'en' } });
    expect(selectElement.value).toBe('en');
    fireEvent.change(selectElement, { target: { value: 'hi' } });
    expect(selectElement.value).toBe('hi');
    fireEvent.change(selectElement, { target: { value: 'ta' } });
    expect(selectElement.value).toBe('ta');
  });

  // Remember me
  test('toggles the checkbox', () => {
    const { getByTestId } = render(<App />);
    const checkbox = getByTestId('remindme-checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // Forgot password
  test('renders forgot password link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Forgot password?/i);
    expect(linkElement).toHaveAttribute('href', '/forgot-password');
  });

  // form submit
  test('submits the form successfully', () => {
    render(<App />);
    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('****');
    const loginButton = screen.getByTestId('login-button');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(console.log).toHaveBeenCalledWith('Form submitted successfully', {
      email: 'test@example.com',
      password: 'password123',
      language: 'en',
      remindme: false,
    });
  });


  // Remember me checked true
  test('remembers user credentials if remember me is checked', () => {
    const { getByTestId } = render(<App />);

    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('****');
    const rememberMeCheckbox = getByTestId('remindme-checkbox');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(rememberMeCheckbox);

    fireEvent.click(loginButton);
    expect(console.log).toHaveBeenCalledWith('Form submitted successfully', {
      email: 'test@example.com',
      password: 'password123',
      language: 'en',
      remindme: true,
    });

    expect(localStorage.getItem('user')).toBe('test@example.com');
    expect(localStorage.getItem('password')).toBe('password123');
  });


  // Remember me checked false
  test('loads user credentials from localStorage if they exist', () => {
    localStorage.setItem('user', 'saved@example.com');
    localStorage.setItem('password', 'savedpassword');

    const { getByTestId } = render(<App />);

    const emailInput = screen.getByPlaceholderText('email@example.com');
    const passwordInput = screen.getByPlaceholderText('****');
    const rememberMeCheckbox = getByTestId('remindme-checkbox');

    expect(emailInput.value).toBe('saved@example.com');
    expect(passwordInput.value).toBe('savedpassword');
    expect(rememberMeCheckbox.checked).toBe(true);
  });


})