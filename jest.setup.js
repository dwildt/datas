// Jest setup file
// Mock DOM elements that are used in the app
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    clear: jest.fn(() => null),
  },
  writable: true,
});

// Mock document.getElementById for app.js tests
document.getElementById = jest.fn((id) => {
  const mockElement = {
    value: '',
    textContent: '',
    innerHTML: '',
    style: { borderLeftColor: '' },
    addEventListener: jest.fn(),
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
  };
  return mockElement;
});

// Mock document.querySelector for radio button tests
document.querySelector = jest.fn(() => ({
  value: 'main',
}));

// Mock document.querySelectorAll
document.querySelectorAll = jest.fn(() => []);