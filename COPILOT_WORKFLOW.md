# GitHub Copilot Development Workflow - Datas Project

This guide provides specific workflows and prompts for using GitHub Copilot effectively with the Datas project.

## Quick Setup for Copilot

### Project Context Prompts
Use these prompts to give Copilot context when starting a session:

```
// Working on Datas project - JavaScript vanilla date utilities
// Main class: DateUtils with static methods
// Testing: Jest with 54+ tests
// Language: Portuguese for UI, English for code
// Patterns: See .copilot-instructions.md and CODING_PATTERNS.md
```

### Key Files Overview
```javascript
// Core utility class
// date-utils.js - DateUtils class with static methods for date manipulation

// UI interaction layer  
// app.js - DOM manipulation and event handlers

// Test coverage
// *.test.js - Jest tests following AAA pattern (Arrange, Act, Assert)

// Configuration
// package.json - Jest configuration and npm scripts
// jest.setup.js - Test environment setup
```

## Common Development Workflows

### 1. Adding New Date Utility Method

**Prompt Pattern:**
```
Add new static method to DateUtils class:
- Method name: [methodName]
- Purpose: [brief description]
- Parameters: [parameter details]
- Return: [return type and format]
- Follow existing patterns with JSDoc, validation, and Portuguese error messages
```

**Example:**
```javascript
// Copilot prompt: Add method to calculate business days between dates
// excluding weekends, with Portuguese error messages

/**
 * Calcula dias úteis entre duas datas (excluindo fins de semana)
 * @param {string|Date} startDate - Data inicial
 * @param {string|Date} endDate - Data final
 * @returns {number} Número de dias úteis
 * @throws {Error} Se as datas forem inválidas
 */
static businessDaysBetween(startDate, endDate) {
    if (!startDate || !endDate) {
        throw new Error('Ambas as datas são obrigatórias');
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Datas inválidas');
    }
    
    // Implementation logic here
}
```

### 2. Adding UI Feature

**Prompt Pattern:**
```
Add UI feature for [feature name]:
- HTML: Add form elements with semantic IDs
- JavaScript: Add event handler following existing pattern
- Validation: Portuguese error messages with visual feedback
- Success: Display formatted result with green border
```

**Example Workflow:**
1. Add HTML elements with descriptive IDs
2. Create event handler function
3. Follow validation → processing → display pattern
4. Add visual feedback with border colors

### 3. Writing Tests

**Prompt Pattern:**
```
Write Jest tests for DateUtils.[methodName]:
- Happy path cases
- Edge cases (leap years, month boundaries, etc.)
- Error cases with Portuguese error messages
- Follow existing test structure in project
```

**Test Template:**
```javascript
describe('DateUtils', () => {
  describe('methodName', () => {
    test('deve calcular resultado para entrada válida', () => {
      // Arrange
      const input = 'valid input';
      
      // Act
      const result = DateUtils.methodName(input);
      
      // Assert
      expect(result).toBe(expectedValue);
    });

    test('deve lançar erro para entrada inválida', () => {
      expect(() => {
        DateUtils.methodName(null);
      }).toThrow('Mensagem de erro em português');
    });
  });
});
```

## Specific Domain Workflows

### Working with Moon Phases
When adding moon phase related features:

```javascript
// Context: Moon phases use astronomical algorithms
// Base: Julian day calculation with reference new moon
// Cycle: 29.53058867 days synodic month
// Phases: 8 distinct phases with Portuguese names and emoji icons

// Example: Add method to get next full moon date
static getNextFullMoon(fromDate) {
    // Use existing julianDay and moon phase calculation patterns
    // Return date object for next full moon occurrence
}
```

### Working with Calendar Features
For calendar-related functionality:

```javascript
// Context: Calendar generation uses Date object manipulation
// Pattern: Generate array of objects with day, isCurrentMonth, isToday properties
// Weeks: Start on Sunday (day 0), fill previous/next month as needed

// Example: Add method to highlight specific dates in calendar
static generateCalendarWithEvents(year, month, eventDates) {
    // Extend existing generateCalendar method
    // Add isEvent property for highlighted dates
}
```

### Working with Age Calculations
For age and duration calculations:

```javascript
// Context: Age calculation handles month/day overflow carefully
// Pattern: Work backwards from current date, adjust months/days as needed
// Format: Return structured objects with years, months, days

// Example: Add method to calculate retirement date
static calculateRetirementDate(birthDate, retirementAge) {
    // Use age calculation patterns
    // Add years to birth date considering leap years
}
```

## Copilot Prompt Templates

### For New Features
```
// Datas project context: JavaScript vanilla date utilities
// Add [feature description] following project patterns:
// - DateUtils static method with JSDoc
// - Input validation with Portuguese errors  
// - Jest tests with edge cases
// - UI integration if user-facing
```

### For Bug Fixes
```
// Debug issue in DateUtils.[methodName]
// Current behavior: [describe current behavior]
// Expected behavior: [describe expected behavior]
// Test cases: [mention failing tests]
// Maintain compatibility with existing tests
```

### For Refactoring
```
// Refactor [component/method] in Datas project
// Goals: [performance/readability/maintainability]
// Constraints: Keep all 54 tests passing
// Patterns: Follow existing code style and JSDoc
```

## Testing with Copilot

### Test-Driven Development
1. **Write test first** describing desired behavior
2. **Use Copilot** to generate implementation
3. **Verify** implementation passes tests
4. **Refactor** if needed while keeping tests green

### Test Prompts
```javascript
// Generate comprehensive tests for DateUtils.[method]
// Include: valid inputs, edge cases, error conditions
// Follow project pattern: describe/test structure
// Use Portuguese error message assertions
```

## Code Review Prompts

### For Self-Review
```
// Review this code for Datas project compliance:
// - Follows established patterns?
// - Portuguese user messages?
// - Proper JSDoc documentation?
// - Handles edge cases?
// - Maintains test coverage?
```

### Performance Review
```
// Analyze performance of this date calculation:
// - Efficient algorithms?
// - Avoid date mutation?
// - Mathematical vs iterative approach?
// - Memory usage optimization?
```

## Common Gotchas and Fixes

### Date Object Pitfalls
```javascript
// ❌ Avoid mutating dates
const date = new Date(input);
date.setDate(date.getDate() + 1); // mutates original

// ✅ Create new instances
const newDate = new Date(date);
newDate.setDate(newDate.getDate() + 1);
```

### Month Index Confusion
```javascript
// ❌ Forget JavaScript months are 0-indexed
new Date(2024, 1, 1); // February 1st, not January 1st

// ✅ Use proper month values
new Date(2024, 0, 1); // January 1st
```

### Timezone Issues
```javascript
// ❌ Timezone-sensitive calculations
const date = new Date('2024-01-01'); // May shift based on timezone

// ✅ Use UTC or be explicit about timezone
const date = new Date('2024-01-01T00:00:00');
```

This workflow guide helps GitHub Copilot understand the specific development patterns and requirements for the Datas project, enabling more accurate and consistent code generation.