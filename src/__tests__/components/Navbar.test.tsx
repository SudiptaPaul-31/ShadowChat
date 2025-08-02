import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '@/components/ui/Navbar'

// Mock the wallet context
jest.mock('@starknet-react/core', () => ({
  useAccount: () => ({
    isConnected: true,
    address: '0x1234567890abcdef1234567890abcdef12345678',
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
}))

// Mock the toast hook
jest.mock('@/components/ui/toast', () => ({
  useToast: () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }),
}))

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Navbar />)
    expect(screen.getByText('ShadowChat')).toBeInTheDocument()
  })

  it('displays truncated wallet address when connected', () => {
    render(<Navbar />)
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
  })

  it('shows connect wallet link when not connected', () => {
    // Mock disconnected state
    jest.doMock('@starknet-react/core', () => ({
      useAccount: () => ({
        isConnected: false,
        address: null,
      }),
      useDisconnect: () => ({
        disconnect: jest.fn(),
      }),
    }))

    render(<Navbar />)
    expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument()
  })

  it('has wallet address clickable with proper styling', () => {
    render(<Navbar />)
    const walletAddress = screen.getByText('0x1234...5678')
    
    expect(walletAddress).toHaveClass('cursor-pointer')
    expect(walletAddress).toHaveClass('hover:text-purple-600')
  })

  it('includes theme toggle switch', () => {
    render(<Navbar />)
    const themeSwitch = screen.getByRole('switch', { name: /toggle theme/i })
    expect(themeSwitch).toBeInTheDocument()
  })

  it('includes navigation buttons', () => {
    render(<Navbar />)
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Navbar />)
    const themeSwitch = screen.getByRole('switch', { name: /toggle theme/i })
    expect(themeSwitch).toHaveAttribute('aria-label', 'Toggle theme')
  })
}) 