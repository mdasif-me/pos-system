import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders POS system', () => {
  render(<App />);
  const logoElement = screen.getByText(/POS System/i);
  expect(logoElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const cloudDBLink = screen.getByText(/Cloud DB/i);
  const stockLink = screen.getByText(/Stock/i);
  
  expect(cloudDBLink).toBeInTheDocument();
  expect(stockLink).toBeInTheDocument();
});