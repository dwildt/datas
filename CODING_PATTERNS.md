# Coding Patterns and Standards - Datas Project

This document outlines the specific coding patterns, conventions, and best practices used in the Datas project to ensure consistency and help GitHub Copilot generate appropriate code.

## Code Organization Patterns

### Static Utility Class Pattern
All date utilities are organized as static methods in the `DateUtils` class:

```javascript
class DateUtils {
    /**
     * JSDoc documentation for each method
     * @param {type} parameter - Description
     * @returns {type} Description
     */
    static methodName(parameter) {
        // Implementation
    }
}
```

### Function Naming Conventions

#### Calculation Functions
- `calculate*` - For complex calculations (e.g., `calculateAge`)
- `get*` - For data retrieval (e.g., `getMoonPhase`, `getWeekNumber`)
- `is*` - For boolean checks (e.g., `isLeapYear`, `isWeekend`)
- `format*` - For data formatting (e.g., `formatDate`, `formatDuration`)
- `generate*` - For creating data structures (e.g., `generateCalendar`)
- `add*` - For date arithmetic (e.g., `addDays`, `addMonths`)

#### UI Functions
- Descriptive verb names: `calculateDifference()`, `generateCalendar()`, `daysSince()`
- No prefixes needed for UI handlers

### Input Validation Pattern
Standard validation for all date input functions:

```javascript
static methodName(date) {
    // Basic validation
    if (!date) {
        throw new Error('Parâmetro obrigatório');
    }
    
    // Date object creation and validation
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error('Data inválida');
    }
    
    // Method logic
    return result;
}
```

### Return Value Patterns

#### Simple Values
```javascript
// Numbers for calculations
static daysBetween(date1, date2) {
    // ...
    return diffDays; // number
}

// Strings for formatted output
static formatDate(date, format) {
    // ...
    return formattedString; // string
}

// Booleans for checks
static isLeapYear(year) {
    // ...
    return (condition); // boolean
}
```

#### Complex Objects
```javascript
// Objects for structured data
static calculateAge(birthDate) {
    // ...
    return { years, months, days }; // object
}

// Arrays for collections
static generateCalendar(year, month) {
    // ...
    return calendar; // array of objects
}
```

## UI Interaction Patterns

### Event Handler Structure
```javascript
function handlerFunction() {
    // 1. Get input values
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const resultDiv = document.getElementById('result');

    // 2. Validate inputs
    if (!input1 || !input2) {
        resultDiv.textContent = 'Mensagem de erro em português';
        resultDiv.style.borderLeftColor = '#dc3545'; // red for error
        return;
    }

    // 3. Process with DateUtils
    try {
        const result = DateUtils.methodName(input1, input2);
        
        // 4. Display success result
        resultDiv.innerHTML = `
            <strong>Resultado:</strong> ${result}<br>
            <strong>Detalhes:</strong> ${additionalInfo}
        `;
        resultDiv.style.borderLeftColor = '#28a745'; // green for success
    } catch (error) {
        // 5. Handle errors
        resultDiv.textContent = `Erro: ${error.message}`;
        resultDiv.style.borderLeftColor = '#dc3545';
    }
}
```

### DOM Element Naming
- Use descriptive IDs: `calculateBtn`, `resultDiv`, `date1`, `date2`
- Group related elements: `calendar-month`, `calendar-year`, `calendar-result`
- Result containers: `difference-result`, `days-since-result`, `moon-phases-result`

### Event Listener Registration
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Register all event listeners here
    document.getElementById('calculateBtn').addEventListener('click', calculateDifference);
    document.getElementById('generateBtn').addEventListener('click', generateCalendar);
    // ... other listeners
});
```

## Testing Patterns

### Test File Organization
```javascript
const DateUtils = require('./date-utils.js');

describe('DateUtils', () => {
  describe('methodName', () => {
    test('deve [ação específica com entrada válida]', () => {
      // Arrange
      const input = 'valid input';
      
      // Act
      const result = DateUtils.methodName(input);
      
      // Assert
      expect(result).toBe(expectedValue);
    });

    test('deve tratar entrada inválida', () => {
      expect(() => {
        DateUtils.methodName(null);
      }).toThrow('Mensagem de erro esperada');
    });

    test('deve tratar caso extremo', () => {
      // Test edge cases like leap years, month boundaries, etc.
    });
  });
});
```

### Date Mocking for Tests
```javascript
// For tests that depend on current date
beforeEach(() => {
    const mockDate = new Date('2024-01-01');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
});

afterEach(() => {
    global.Date.mockRestore();
});
```

## Localization Patterns

### Portuguese Text Constants
Always use Portuguese for user-facing text:

```javascript
// Month names array
const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Day names array
const weekDays = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
];

// Error messages
const errorMessages = {
    invalidDate: 'Data inválida',
    missingParameter: 'Parâmetro obrigatório',
    futureDate: 'Data deve ser no passado'
};
```

### Date Format Standards
- **Input format**: `YYYY-MM-DD` (ISO format for calculations)
- **Display format**: `DD/MM/YYYY` (Brazilian standard)
- **Extended format**: `Dia-da-semana, DD de Mês de YYYY`

## Astronomical Calculation Patterns

### Julian Day Calculation
Standard pattern for astronomical calculations:

```javascript
static julianDay(date) {
    const d = new Date(date);
    const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
    const y = d.getFullYear() + 4800 - a;
    const m = (d.getMonth() + 1) + 12 * a - 3;
    
    return d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}
```

### Moon Phase Constants
```javascript
const MOON_CONSTANTS = {
    newMoonJD: 2451549.5,      // Reference new moon (Jan 6, 2000)
    synodicMonth: 29.53058867,  // Lunar cycle length in days
    phases: [
        { name: 'Nova', emoji: '🌑', range: [0, 0.0625] },
        { name: 'Crescente', emoji: '🌒', range: [0.0625, 0.1875] },
        // ... other phases
    ]
};
```

## Performance Patterns

### Date Object Handling
```javascript
// ✅ Good: Create new Date instances
const date1 = new Date(input1);
const date2 = new Date(input2);

// ❌ Avoid: Mutating existing dates
const date = new Date();
date.setDate(date.getDate() + days); // Only if creating a new date first
```

### Mathematical Operations
```javascript
// ✅ Efficient: Use mathematical calculations
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

// ❌ Avoid: Iterative approaches for simple calculations
let days = 0;
while (startDate < endDate) {
    days++;
    startDate.setDate(startDate.getDate() + 1);
}
```

## Error Handling Patterns

### Consistent Error Messages
```javascript
// Standard error patterns
if (!parameter) {
    throw new Error('Parâmetro obrigatório');
}

if (isNaN(date.getTime())) {
    throw new Error('Data inválida. Use o formato YYYY-MM-DD.');
}

if (year < 1) {
    throw new Error('Ano deve ser maior que 0');
}
```

### UI Error Display
```javascript
// Error feedback pattern
try {
    const result = DateUtils.method(input);
    showSuccess(result);
} catch (error) {
    showError(error.message);
}

function showError(message) {
    resultDiv.textContent = message;
    resultDiv.style.borderLeftColor = '#dc3545';
    resultDiv.className = 'result error';
}

function showSuccess(content) {
    resultDiv.innerHTML = content;
    resultDiv.style.borderLeftColor = '#28a745';
    resultDiv.className = 'result success';
}
```

## Documentation Patterns

### JSDoc Standards
```javascript
/**
 * Brief description of what the method does
 * @param {type} paramName - Parameter description
 * @param {type} [optionalParam] - Optional parameter description
 * @returns {type} Return value description
 * @throws {Error} When error conditions occur
 * @example
 * DateUtils.methodName('2024-01-01'); // returns expected result
 * @since 1.0.0
 */
static methodName(paramName, optionalParam) {
    // Implementation
}
```

These patterns ensure consistent, maintainable code that integrates well with GitHub Copilot's code generation capabilities.