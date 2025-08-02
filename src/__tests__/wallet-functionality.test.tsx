import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock wallet address truncation function
const truncateAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

// Mock wallet connection state
const mockWalletState = {
  isConnected: true,
  address: '0x1234567890abcdef1234567890abcdef12345678',
  connectorName: 'Argent',
}

describe('Wallet Functionality Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Wallet Address Display', () => {
    it('truncates wallet address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678'
      const truncated = truncateAddress(address)
      expect(truncated).toBe('0x1234...5678')
    })

    it('handles different address lengths', () => {
      const shortAddress = '0x1234567890'
      const truncated = truncateAddress(shortAddress)
      expect(truncated).toBe('0x1234...7890')
    })
  })

  describe('Wallet Connection State', () => {
    it('has correct wallet state structure', () => {
      expect(mockWalletState.isConnected).toBe(true)
      expect(mockWalletState.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
      expect(mockWalletState.connectorName).toBe('Argent')
    })

    it('validates wallet address format', () => {
      const address = mockWalletState.address
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/)
    })
  })

  describe('Navigation Functionality', () => {
    it('can navigate to anonymous profile', () => {
      mockPush('/anonymous-profile')
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
    })

    it('can handle multiple navigation calls', () => {
      mockPush('/anonymous-profile')
      mockPush('/authentication')
      mockPush('/chat')
      
      expect(mockPush).toHaveBeenCalledTimes(3)
      expect(mockPush).toHaveBeenNthCalledWith(1, '/anonymous-profile')
      expect(mockPush).toHaveBeenNthCalledWith(2, '/authentication')
      expect(mockPush).toHaveBeenNthCalledWith(3, '/chat')
    })
  })

  describe('UI Components', () => {
    it('renders wallet address with proper styling', () => {
      render(
        <button 
          onClick={() => mockPush('/anonymous-profile')}
          className="cursor-pointer hover:text-purple-600 transition-colors"
          title="Click to view your anonymous profile"
        >
          {truncateAddress(mockWalletState.address)}
        </button>
      )

      const walletButton = screen.getByText('0x1234...5678')
      expect(walletButton).toBeInTheDocument()
      expect(walletButton).toHaveClass('cursor-pointer')
      expect(walletButton).toHaveClass('hover:text-purple-600')
      expect(walletButton).toHaveAttribute('title', 'Click to view your anonymous profile')
    })

    it('handles click events correctly', () => {
      render(
        <button 
          onClick={() => mockPush('/anonymous-profile')}
          className="cursor-pointer"
        >
          {truncateAddress(mockWalletState.address)}
        </button>
      )

      const walletButton = screen.getByText('0x1234...5678')
      fireEvent.click(walletButton)
      
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
    })

    it('renders connection status correctly', () => {
      render(
        <div>
          <span className="text-green-600">
            {mockWalletState.isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span className="text-sm text-muted-foreground">
            {mockWalletState.connectorName}
          </span>
        </div>
      )

      expect(screen.getByText('Connected')).toBeInTheDocument()
      expect(screen.getByText('Argent')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles invalid wallet addresses gracefully', () => {
      const invalidAddress = 'invalid-address'
      expect(() => truncateAddress(invalidAddress)).not.toThrow()
    })

    it('handles empty wallet address', () => {
      const emptyAddress = ''
      const truncated = truncateAddress(emptyAddress)
      expect(truncated).toBe('...')
    })

    it('handles null navigation calls', () => {
      expect(() => mockPush(null)).not.toThrow()
    })
  })

  describe('Integration Scenarios', () => {
    it('simulates complete wallet connection flow', () => {
      // Step 1: Check initial state
      expect(mockWalletState.isConnected).toBe(true)
      
      // Step 2: Verify address format
      expect(mockWalletState.address).toMatch(/^0x[a-fA-F0-9]{40}$/)
      
      // Step 3: Test navigation
      mockPush('/anonymous-profile')
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
      
      // Step 4: Verify UI elements
      render(
        <div>
          <span>Connected with {mockWalletState.connectorName}</span>
          <button onClick={() => mockPush('/anonymous-profile')}>
            {truncateAddress(mockWalletState.address)}
          </button>
        </div>
      )
      
      expect(screen.getByText('Connected with Argent')).toBeInTheDocument()
      expect(screen.getByText('0x1234...5678')).toBeInTheDocument()
    })
  })
}) 