import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders "job hunt" ', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/job hunt/i);
  expect(linkElement).toBeInTheDocument();
});
