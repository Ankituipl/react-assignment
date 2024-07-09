import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import App from './App';
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// Logo visible 
test('renders logo on login page', () => {
  const { getByTestId } = render(<App />);
  const logoElement = getByTestId('logo');
  expect(logoElement).toBeInTheDocument();
});


// test('There is a password filed on login page', () => {
//   const { getByTestId } = render(<App />);
//   const logoElement = getByTestId('password');
//   expect(logoElement).toBeInTheDocument();
// });