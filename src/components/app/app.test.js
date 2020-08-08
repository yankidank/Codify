import React from 'react';
import { render } from '@testing-library/react';
import App from './app';

test('renders "job hunt" ', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Company Name/i);
  expect(linkElement).toBeInTheDocument();
});
