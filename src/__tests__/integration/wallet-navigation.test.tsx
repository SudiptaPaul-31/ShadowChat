import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/ui/Navbar'
import WalletModal from '@/components/WalletModal'
import Authentication from '@/app/authentication/page'

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock the wallet context
jest.mock('@starknet-react/core', () => ({
  useAccount: () => ({
    isConnected: true,
    address: '0x1234567890abcdef1234567890abcdef12345678',
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
  useConnect: () => ({
    connect: jest.fn(),
    isSuccess: false,
    error: null,
  }),
}))

jest.mock('@/context/WalletContext', () => ({
  useWalletContext: () => ({
    isConnected: true,
    address: '0x1234567890abcdef1234567890abcdef12345678',
    connectorName: 'Argent',
    setWalletConnected: jest.fn(),
    persistConnection: jest.fn(),
    clearPersistedConnection: jest.fn(),
  }),
}))

// Mock other dependencies
jest.mock('@/components/ui/toast', () => ({
  useToast: () => ({
    toast: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }),
}))

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    setTheme: jest.fn(),
  }),
}))

describe('Wallet Address Click Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Navbar Component', () => {
    it('redirects to anonymous profile when wallet address is clicked', () => {
      render(<Navbar />)
      
      const walletAddress = screen.getByText('0x1234...5678')
      fireEvent.click(walletAddress)
      
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
    })

    it('has proper hover styling for wallet address', () => {
      render(<Navbar />)
      
      const walletAddress = screen.getByText('0x1234...5678')
      expect(walletAddress).toHaveClass('hover:text-purple-600')
    })
  })

  describe('WalletModal Component', () => {
    const mockOnOpenChange = jest.fn()

    it('redirects to anonymous profile and closes modal when wallet address is clicked', () => {
      render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
      
      const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      fireEvent.click(walletAddress)
      
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
      expect(mockOnOpenChange).toHaveBeenCalledWith(false)
    })

    it('has proper hover styling for wallet address', () => {
      render(<WalletModal isOpen={true} onOpenChange={mockOnOpenChange} />)
      
      const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      expect(walletAddress).toHaveClass('hover:text-green-800')
    })
  })

  describe('Authentication Page', () => {
    it('redirects to anonymous profile when wallet address is clicked', () => {
      render(<Authentication />)
      
      const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      fireEvent.click(walletAddress)
      
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
    })

    it('has proper hover styling for wallet address', () => {
      render(<Authentication />)
      
      const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      expect(walletAddress).toHaveClass('hover:text-purple-600')
    })

    it('has proper tooltip for wallet address', () => {
      render(<Authentication />)
      
      const walletAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      expect(walletAddress).toHaveAttribute('title', 'Click to view your anonymous profile')
    })
  })

  describe('Cross-Component Consistency', () => {
    it('all wallet addresses redirect to the same route', () => {
      // Test Navbar
      const { unmount: unmountNavbar } = render(<Navbar />)
      const navbarAddress = screen.getByText('0x1234...5678')
      fireEvent.click(navbarAddress)
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
      unmountNavbar()

      // Test Authentication
      const { unmount: unmountAuth } = render(<Authentication />)
      const authAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      fireEvent.click(authAddress)
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
      unmountAuth()

      // Test WalletModal
      render(<WalletModal isOpen={true} onOpenChange={jest.fn()} />)
      const modalAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      fireEvent.click(modalAddress)
      expect(mockPush).toHaveBeenCalledWith('/anonymous-profile')
    })

    it('all wallet addresses have consistent clickable styling', () => {
      // Test Navbar
      const { unmount: unmountNavbar } = render(<Navbar />)
      const navbarAddress = screen.getByText('0x1234...5678')
      expect(navbarAddress).toHaveClass('cursor-pointer')
      unmountNavbar()

      // Test Authentication
      const { unmount: unmountAuth } = render(<Authentication />)
      const authAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      expect(authAddress).toHaveClass('cursor-pointer')
      unmountAuth()

      // Test WalletModal
      render(<WalletModal isOpen={true} onOpenChange={jest.fn()} />)
      const modalAddress = screen.getByText('0x1234567890abcdef1234567890abcdef12345678')
      expect(modalAddress).toHaveClass('cursor-pointer')
    })
  })
}) 