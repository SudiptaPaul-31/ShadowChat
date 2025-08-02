import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WalletModal from '@/components/WalletModal'

// Mock the wallet context
jest.mock('@starknet-react/core', () => ({
  useConnect: () => ({
    connect: jest.fn(),
    isSuccess: false,
    error: null,
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
  useAccount: () => ({
    address: '0x1234567890abcdef1234567890abcdef12345678',
    connector: {
      id: 'argent',
    },
  }),
}))

// Mock the wallet context
jest.mock('@/context/WalletContext', () => ({
  useWalletContext: () => ({
    isConnected: true,
    setWalletConnected: jest.fn(),
    persistConnection: jest.fn(),
    clearPersistedConnection: jest.fn(),
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

describe('WalletModal Component', () => {
  const mockOnOpenChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing when closed', () => {
    render(<WalletModal isOpen={false} onOpenChange={mockOnOpenChange} />)
    expect(screen.queryByText('Connect Your Wallet')).not.toBeInTheDocument()
  })

  it('renders wallet connection options when open', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    expect(screen.getByText('Connect with Braavos')).toBeInTheDocument()
    expect(screen.getByText('Connect with Argent')).toBeInTheDocument()
  })

  it('displays connected wallet information when wallet is connected', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    expect(screen.getByText('Connected with argent')).toBeInTheDocument()
    expect(screen.getByText('0x1234567890abcdef1234567890abcdef12345678')).toBeInTheDocument()
  })

  it('shows disconnect button when wallet is connected', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    expect(screen.getByText('Disconnect Wallet')).toBeInTheDocument()
  })

  it('has proper wallet logos', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    const braavosLogo = screen.getByAltText('Bravos Logo')
    const argentLogo = screen.getByAltText('Argent Logo')
    
    expect(braavosLogo).toBeInTheDocument()
    expect(argentLogo).toBeInTheDocument()
  })

  it('calls onOpenChange when disconnect button is clicked', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    const disconnectButton = screen.getByText('Disconnect Wallet')
    fireEvent.click(disconnectButton)
    
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it('has proper button styling', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    const braavosButton = screen.getByText('Connect with Braavos')
    const argentButton = screen.getByText('Connect with Argent')
    
    expect(braavosButton).toHaveClass('bg-gradient-to-r')
    expect(argentButton).toHaveClass('bg-gradient-to-r')
  })

  it('displays wallet address with clickable styling', () => {
    render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
    
    const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
    
    expect(walletAddress).toHaveClass('cursor-pointer')
    expect(walletAddress).toHaveClass('hover:text-green-800')
  })
}) 