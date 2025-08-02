import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Authentication from '@/app/authentication/page'

// Mock the wallet context
jest.mock('@/context/WalletContext', () => ({
  useWalletContext: () => ({
    isConnected: true,
    address: '0x1234567890abcdef1234567890abcdef12345678',
    connectorName: 'Argent',
  }),
}))

// Mock the wallet modal
jest.mock('@/components/WalletModal', () => {
  return function MockWalletModal({ isOpen, onOpenChange }: any) {
    if (!isOpen) return null
    return (
      <div data-testid="wallet-modal">
        <button onClick={() => onOpenChange(false)}>Close Modal</button>
      </div>
    )
  }
})

describe('Authentication Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Authentication />)
    expect(screen.getByText('Wallet Connected')).toBeInTheDocument()
  })

  it('displays wallet connection status when connected', () => {
    render(<Authentication />)
    
    expect(screen.getByText('Wallet Connected')).toBeInTheDocument()
    expect(screen.getByText('Successfully connected with Argent')).toBeInTheDocument()
  })

  it('displays wallet address when connected', () => {
    render(<Authentication />)
    
    const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
    expect(walletAddress).toBeInTheDocument()
  })

  it('has clickable wallet address with proper styling', () => {
    render(<Authentication />)
    
    const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
    
    expect(walletAddress).toHaveClass('cursor-pointer')
    expect(walletAddress).toHaveClass('hover:text-purple-600')
    expect(walletAddress).toHaveClass('underline')
  })

  it('shows manage wallet button when connected', () => {
    render(<Authentication />)
    
    const manageButton = screen.getByText('Manage Wallet')
    expect(manageButton).toBeInTheDocument()
  })

  it('opens wallet modal when manage wallet button is clicked', () => {
    render(<Authentication />)
    
    const manageButton = screen.getByText('Manage Wallet')
    fireEvent.click(manageButton)
    
    expect(screen.getByTestId('wallet-modal')).toBeInTheDocument()
  })

  it('displays security information', () => {
    render(<Authentication />)
    
    expect(screen.getByText(/Your connection is secured with zero-knowledge authentication/)).toBeInTheDocument()
  })

  it('has proper heading structure', () => {
    render(<Authentication />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Wallet Connected')
  })

  it('has proper accessibility attributes', () => {
    render(<Authentication />)
    
    const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
    expect(walletAddress).toHaveAttribute('title', 'Click to view your anonymous profile')
  })
}) 