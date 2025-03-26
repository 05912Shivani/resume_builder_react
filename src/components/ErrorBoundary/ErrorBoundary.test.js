import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Mock console.error to suppress error messages in test output
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

const ProblematicComponent = () => {
  throw new Error('Test Error');
};

test('renders error message when a child component crashes', () => {
  render(
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );

  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  expect(screen.getByText(/please try refreshing the page/i)).toBeInTheDocument();
});
