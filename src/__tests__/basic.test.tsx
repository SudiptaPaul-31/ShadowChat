import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Basic Test', () => {
  it('renders a simple component', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('can perform basic math', () => {
    expect(2 + 2).toBe(4)
  })

  it('can check string operations', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678'
    const truncated = address.slice(0, 6) + '...' + address.slice(-4)
    expect(truncated).toBe('0x1234...5678')
  })
}) 