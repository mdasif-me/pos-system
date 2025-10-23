import { render, screen, fireEvent } from '@testing-library/react';
import CloudDB from '../pages/CloudDB';

test('renders Cloud DB page', () => {
  render(<CloudDB />);
  const titleElement = screen.getByText(/Cloud DB/i);
  expect(titleElement).toBeInTheDocument();
});

test('search functionality works', () => {
  render(<CloudDB />);
  const searchInput = screen.getByPlaceholderText(/search products/i);
  
  fireEvent.change(searchInput, { target: { value: 'Product 1' } });
  expect(searchInput.value).toBe('Product 1');
});

test('displays product cards', () => {
  render(<CloudDB />);
  const productCards = screen.getAllByText(/Product \d+/);
  expect(productCards.length).toBeGreaterThan(0);
});