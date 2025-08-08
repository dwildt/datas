// Jest setup file

// Import DateUtils para disponibilizar globalmente
const DateUtils = require('./date-utils.js');
global.DateUtils = DateUtils;

// Mock DOM elements that are used in the app
global.document = {
  getElementById: jest.fn(),
  querySelector: jest.fn(() => ({ value: 'main' })),
  querySelectorAll: jest.fn(() => []),
  addEventListener: jest.fn(),
  dispatchEvent: jest.fn()
};

// Mock window object
global.window = {
  localStorage: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    removeItem: jest.fn(() => null),
    clear: jest.fn(() => null),
  }
};