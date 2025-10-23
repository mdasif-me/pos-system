import { render, screen, fireEvent } from '@testing-library/react';
import StockManagement from '../pages/StockManagement';

test('renders Stock Management page', () => {
  render(<StockManagement />);
  const titleElement = screen.getByText(/Stock Management/i);
  expect(titleElement).toBeInTheDocument();
});

test('switches between tabs', () => {
  render(<StockManagement />);
  
  const addStockTab = screen.getByText(/Add Stock/i);
  fireEvent.click(addStockTab);
  
  const addStockSection = screen.getByText(/Name: 1/i);
  expect(addStockSection).toBeInTheDocument();
});

test('displays stock statistics', () => {
  render(<StockManagement />);
  
  const totalItems = screen.getByText(/Total Items/i);
  const totalValue = screen.getByText(/Total Value/i);
  const lowStock = screen.getByText(/Low Stock/i);
  
  expect(totalItems).toBeInTheDocument();
  expect(totalValue).toBeInTheDocument();
  expect(lowStock).toBeInTheDocument();
});