# GitHub Copilot Development Guide - Datas Project

This file provides GitHub Copilot with specific development context and coding patterns for the **Datas** project.

## Quick Reference

### Project Type
- **JavaScript Vanilla** date utilities library
- **No frameworks** - pure ES6+ JavaScript
- **Jest testing** with jsdom environment
- **Portuguese language** interface and documentation
- **Responsive design** with Wildtech branding

### Core Classes and Files
- `DateUtils` - Main utility class with static methods
- `app.js` - UI interaction and DOM manipulation
- `*.test.js` - Jest test suites (54+ tests)
- `index.html` - Main interface
- `styles.css` - Responsive styles

## Code Generation Patterns

### DateUtils Static Methods
When creating new date utilities, follow this pattern:

```javascript
static methodName(parameter) {
    // Input validation
    if (!parameter) {
        throw new Error('Parâmetro obrigatório');
    }
    
    // Date processing
    const date = new Date(parameter);
    
    // Calculation logic
    const result = /* calculation */;
    
    return result;
}
```

### UI Event Handlers
Pattern for UI interaction functions:

```javascript
function handlerName() {
    const input = document.getElementById('inputId').value;
    const resultDiv = document.getElementById('resultId');

    // Validation
    if (!input) {
        resultDiv.textContent = 'Mensagem de erro em português';
        resultDiv.style.borderLeftColor = '#dc3545';
        return;
    }

    // Processing
    const result = DateUtils.method(input);
    
    // Display result
    resultDiv.innerHTML = `<strong>Resultado:</strong> ${result}`;
    resultDiv.style.borderLeftColor = '#28a745';
}
```

### Test Structure Template
For new tests, use this Jest pattern:

```javascript
describe('ClassName', () => {
  describe('methodName', () => {
    test('deve [ação específica]', () => {
      // Arrange
      const input = 'test value';
      
      // Act
      const result = DateUtils.method(input);
      
      // Assert
      expect(result).toBe(expected);
    });

    test('deve tratar caso de erro', () => {
      expect(() => {
        DateUtils.method(null);
      }).toThrow('Mensagem esperada');
    });
  });
});
```

## Specific Domain Knowledge

### Moon Phase Calculations
The project uses astronomical algorithms for lunar phases:

```javascript
// Julian day calculation for date
static julianDay(date) {
    const d = new Date(date);
    const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
    const y = d.getFullYear() + 4800 - a;
    const m = (d.getMonth() + 1) + 12 * a - 3;
    
    return d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// Moon phase from julian day
static getMoonPhase(date) {
    const jd = DateUtils.julianDay(date);
    const newMoonJD = 2451549.5; // Reference new moon
    const synodicMonth = 29.53058867; // Lunar cycle length
    
    const phase = ((jd - newMoonJD) % synodicMonth) / synodicMonth;
    const normalizedPhase = phase < 0 ? phase + 1 : phase;
    
    // Return Portuguese phase names
    if (normalizedPhase < 0.0625 || normalizedPhase >= 0.9375) return 'Nova';
    // ... other phases
}
```

### Portuguese Localization Arrays
Always use these predefined arrays for consistency:

```javascript
const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const weekDays = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
];
```

### Calendar Generation Pattern
For calendar-related features:

```javascript
static generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendar = [];
    const today = new Date();
    
    // Previous month days
    for (let i = 0; i < startingDayOfWeek; i++) {
        const prevMonthDay = new Date(year, month, -(startingDayOfWeek - 1 - i));
        calendar.push({
            day: prevMonthDay.getDate(),
            isCurrentMonth: false,
            isToday: false
        });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        calendar.push({
            day: day,
            isCurrentMonth: true,
            isToday: currentDate.toDateString() === today.toDateString()
        });
    }
    
    return calendar;
}
```

## Common Coding Tasks

### Adding Date Validation
```javascript
// Standard validation pattern
static isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString !== '';
}
```

### Error Handling Pattern
```javascript
// Input validation with Portuguese messages
if (!date || !DateUtils.isValidDate(date)) {
    throw new Error('Data inválida. Use o formato YYYY-MM-DD.');
}
```

### Duration Formatting
```javascript
static formatDuration(days) {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    const parts = [];
    if (years > 0) parts.push(`${years} ano${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} ${months !== 1 ? 'meses' : 'mês'}`);
    if (remainingDays > 0) parts.push(`${remainingDays} dia${remainingDays !== 1 ? 's' : ''}`);

    return parts.join(', ') || '0 dias';
}
```

## Testing Best Practices

### Date Mocking for Deterministic Tests
```javascript
// Mock current date for consistent testing
const mockToday = new Date('2024-01-01');
const OriginalDate = Date;

global.Date = jest.fn((date) => {
    if (date) return new OriginalDate(date);
    return mockToday;
});

// Restore after test
global.Date = OriginalDate;
```

### Testing Moon Phases
```javascript
test('deve calcular fase da lua corretamente', () => {
    // Use known moon phase dates for testing
    const newMoonDate = '2024-01-11'; // Known new moon
    const result = DateUtils.getMoonPhase(newMoonDate);
    expect(result).toBe('Nova');
});
```

## Styling Conventions

### CSS Custom Properties
```css
:root {
    --primary-color: #ff7b00;
    --secondary-color: #8b4513;
    --gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    --success-color: #28a745;
    --error-color: #dc3545;
}
```

### Responsive Design Patterns
```css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
}
```

## Performance Guidelines

- **Avoid Date Mutation**: Always create new Date instances
- **Efficient Calculations**: Use mathematical operations over loops
- **Minimal DOM Updates**: Batch changes when possible
- **Memory Management**: Don't store unnecessary large arrays

## Integration with Existing Code

When adding new features:

1. **Add method to DateUtils** with proper JSDoc
2. **Write comprehensive tests** following existing patterns
3. **Update UI** if user-facing feature
4. **Follow naming conventions** and error handling patterns
5. **Maintain Portuguese language** for all user-facing elements
6. **Ensure responsive design** compliance

This guide ensures GitHub Copilot generates code that integrates seamlessly with the existing Datas project architecture and conventions.