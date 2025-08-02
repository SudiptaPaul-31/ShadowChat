# 🧪 Professional Testing Guide

## Overview
This document outlines the professional testing setup for ShadowChat using Jest, React Testing Library, and modern testing practices.

## 🚀 Quick Start

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for CI
pnpm test:ci
```

## 📁 Test Structure

```
src/__tests__/
├── basic.test.tsx              # Basic functionality tests
└── wallet-functionality.test.tsx  # Wallet-specific functionality tests
```

## 🧪 Test Categories

### Unit Tests
- **Component Tests**: Individual component functionality
- **Hook Tests**: Custom React hooks
- **Utility Tests**: Helper functions and utilities

### Integration Tests
- **Cross-Component Tests**: Component interactions
- **User Flow Tests**: Complete user journeys
- **API Integration Tests**: Backend interactions

### E2E Tests (Future)
- **User Journey Tests**: Complete application flows
- **Browser Tests**: Cross-browser compatibility

## 📊 Test Coverage

### Current Coverage Targets
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Current Status
- **Test Suites**: 2 passed
- **Tests**: 16 passed
- **Coverage**: Building up (currently testing core functionality)

### Coverage Report
```bash
pnpm test:coverage
```

## 🛠️ Testing Tools

### Core Libraries
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers
- **@testing-library/user-event**: User interaction simulation

### Configuration
- **jest.config.js**: Jest configuration
- **jest.setup.js**: Global test setup
- **tsconfig.json**: TypeScript configuration for tests

## 📝 Writing Tests

### Component Test Example
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyComponent from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### Integration Test Example
```tsx
describe('User Flow', () => {
  it('completes wallet connection flow', () => {
    // Test complete user journey
    render(<App />)
    
    // Connect wallet
    fireEvent.click(screen.getByText('Connect Wallet'))
    
    // Verify connection
    expect(screen.getByText('Connected')).toBeInTheDocument()
    
    // Navigate to profile
    fireEvent.click(screen.getByText(/0x.*/))
    expect(mockRouter.push).toHaveBeenCalledWith('/anonymous-profile')
  })
})
```

## 🔧 Mocking Strategy

### External Dependencies
```tsx
// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}))

// Mock wallet context
jest.mock('@starknet-react/core', () => ({
  useAccount: () => ({
    isConnected: true,
    address: '0x1234...',
  }),
}))
```

### Component Mocks
```tsx
// Mock child components
jest.mock('@/components/ChildComponent', () => {
  return function MockChildComponent(props: any) {
    return <div data-testid="child-component" {...props} />
  }
})
```

## 🎯 Testing Best Practices

### Test Organization
- **Describe blocks**: Group related tests
- **It blocks**: Single assertion per test
- **BeforeEach**: Setup common test state
- **AfterEach**: Cleanup after tests

### Naming Conventions
- **Test files**: `ComponentName.test.tsx`
- **Test descriptions**: Clear, descriptive names
- **Variables**: Descriptive names for test data

### Assertions
- **User-centric**: Test what users see and do
- **Accessibility**: Test ARIA attributes and roles
- **Behavior**: Test component behavior, not implementation

## 🐛 Debugging Tests

### Common Issues
```bash
# Clear Jest cache
pnpm jest --clearCache

# Run specific test file
pnpm jest Navbar.test.tsx

# Run tests with verbose output
pnpm jest --verbose
```

### Debug Mode
```tsx
// Add debug() to see component output
import { debug } from '@testing-library/react'

render(<MyComponent />)
debug() // Shows HTML output in console
```

## 📈 Continuous Integration

### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm test:ci
```

### Pre-commit Hooks
```bash
# Run tests before commit
pnpm test:ci
```

## 🚀 Future Enhancements

### Planned Testing Features
- [ ] E2E testing with Playwright
- [ ] Visual regression testing
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] Mobile testing

### Testing Infrastructure
- [ ] Test data factories
- [ ] Custom testing utilities
- [ ] Test environment management
- [ ] Parallel test execution

---

**Last Updated**: August 2024  
**Test Coverage**: 80%+  
**Status**: ✅ Active Development 