import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Application from '../components/Application';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Application component', () => {
  let navigateMock;
  let locationMock;
  let logoutMock;

  beforeEach(() => {
    navigateMock = jest.fn();
    locationMock = { state: { applicationId: 123 } };
    logoutMock = jest.fn();

    useNavigate.mockReturnValue(navigateMock);
    useLocation.mockReturnValue(locationMock);
    useAuth.mockReturnValue({ logout: logoutMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the navbar and stats components', () => {
    render(<Application />);

    expect(screen.getByText('sourceM')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Control-flow' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Exec-time' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Functions' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'sourceM Logo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Control-flow statistics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Exceptions statistics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Execution time statistics' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Function statistics' })).toBeInTheDocument();
  });

  it('logs out the user when the logout button is clicked', async () => {
    render(<Application />);

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

  it('sets the toggle state when a navbar link is clicked', () => {
    render(<Application />);

    const controlFlowLink = screen.getByRole('link', { name: 'Control-flow' });
    const functionsLink = screen.getByRole('link', { name: 'Functions' });

    expect(controlFlowLink).toHaveClass('bg-transparent');
    expect(functionsLink).toHaveClass('bg-transparent');

    fireEvent.click(controlFlowLink);

    expect(controlFlowLink).toHaveClass('text-blue-700');
    expect(functionsLink).toHaveClass('bg-transparent');
  });
});
