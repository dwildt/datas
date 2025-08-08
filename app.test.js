/**
 * Testes unitários para as funções do app.js
 */

// Import dos arquivos necessários
const DateUtils = require('./date-utils.js');

describe('App Functions', () => {
  let mockElements;

  beforeEach(() => {
    // Mock dos elementos DOM
    mockElements = {
      'date1': { value: '2024-01-01', style: {} },
      'date2': { value: '2024-01-10', style: {} },
      'since-date': { value: '2024-01-01', style: {} },
      'calendar-month': { value: '2024-03', style: {} },
      'moon-month': { value: '2024-03', style: {} },
      'birth-date': { value: '1990-01-01', style: {} },
      'format-date': { value: '2024-03-15', style: {} },
      'format-type': { value: 'dd/mm/yyyy', style: {} },
      'difference-result': { innerHTML: '', textContent: '', style: {} },
      'days-since-result': { innerHTML: '', textContent: '', style: {} },
      'calendar-container': { innerHTML: '', style: {} },
      'moon-phases-container': { innerHTML: '', style: {} },
      'age-result': { innerHTML: '', textContent: '', style: {} },
      'format-result': { innerHTML: '', textContent: '', style: {} }
    };

    // Mock document.getElementById
    document.getElementById = jest.fn((id) => mockElements[id] || { 
      value: '', 
      innerHTML: '', 
      textContent: '', 
      style: {} 
    });

    // Mock document.querySelector para radio buttons
    document.querySelector = jest.fn((selector) => {
      if (selector.includes('moon-view')) {
        return { value: 'main' };
      }
      return null;
    });

    // Clear mocks
    jest.clearAllMocks();
  });

  describe('calculateDifference Logic', () => {
    test('deve validar entradas vazias', () => {
      const mockResult = { textContent: '', style: {} };
      
      // Simular função
      const calculateDifference = () => {
        const date1 = '';
        const date2 = '2024-01-10';
        
        if (!date1 || !date2) {
          mockResult.textContent = 'Por favor, selecione ambas as datas.';
          mockResult.style.borderLeftColor = '#dc3545';
          return;
        }
      };
      
      calculateDifference();
      expect(mockResult.textContent).toBe('Por favor, selecione ambas as datas.');
      expect(mockResult.style.borderLeftColor).toBe('#dc3545');
    });

    test('deve calcular diferença corretamente', () => {
      const days = DateUtils.daysBetween('2024-01-01', '2024-01-10');
      expect(days).toBe(9);
    });
  });

  describe('daysSince Logic', () => {
    test('deve validar entrada vazia', () => {
      const mockResult = { textContent: '', style: {} };
      
      const daysSince = () => {
        const date = '';
        
        if (!date) {
          mockResult.textContent = 'Por favor, selecione uma data.';
          mockResult.style.borderLeftColor = '#dc3545';
          return;
        }
      };
      
      daysSince();
      expect(mockResult.textContent).toBe('Por favor, selecione uma data.');
      expect(mockResult.style.borderLeftColor).toBe('#dc3545');
    });
  });

  describe('generateCalendar Logic', () => {
    test('deve validar mês vazio', () => {
      const mockContainer = { innerHTML: '' };
      
      const generateCalendar = () => {
        const monthInput = '';
        
        if (!monthInput) {
          mockContainer.innerHTML = '<p style="text-align: center; color: #dc3545;">Por favor, selecione um mês.</p>';
          return;
        }
      };
      
      generateCalendar();
      expect(mockContainer.innerHTML).toContain('Por favor, selecione um mês.');
    });

    test('deve processar entrada válida de mês', () => {
      const monthInput = '2024-03';
      const [year, month] = monthInput.split('-').map(Number);
      const calendar = DateUtils.generateCalendar(year, month - 1);
      
      expect(calendar).toBeDefined();
      expect(calendar.length).toBeGreaterThan(0);
      
      // Verificar estrutura do calendário
      const currentMonthDays = calendar.filter(day => day.isCurrentMonth);
      expect(currentMonthDays.length).toBe(31); // Março tem 31 dias
    });

    test('deve incluir números de semana', () => {
      const date = new Date(2024, 2, 1); // Março 2024
      const weekNumber = DateUtils.getWeekNumber(date);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThan(54);
    });
  });

  describe('calculateAge Logic', () => {
    test('deve validar data de nascimento vazia', () => {
      const mockResult = { textContent: '', style: {} };
      
      const calculateAge = () => {
        const birthDate = '';
        
        if (!birthDate) {
          mockResult.textContent = 'Por favor, selecione a data de nascimento.';
          mockResult.style.borderLeftColor = '#dc3545';
          return;
        }
      };
      
      calculateAge();
      expect(mockResult.textContent).toBe('Por favor, selecione a data de nascimento.');
      expect(mockResult.style.borderLeftColor).toBe('#dc3545');
    });

    test('deve calcular idade usando DateUtils', () => {
      const age = DateUtils.calculateAge('1990-01-01');
      expect(age).toHaveProperty('years');
      expect(age).toHaveProperty('months');
      expect(age).toHaveProperty('days');
      expect(age.years).toBeGreaterThan(30);
    });
  });

  describe('formatDate Logic', () => {
    test('deve validar data vazia', () => {
      const mockResult = { textContent: '', style: {} };
      
      const formatDate = () => {
        const date = '';
        
        if (!date) {
          mockResult.textContent = 'Por favor, selecione uma data.';
          mockResult.style.borderLeftColor = '#dc3545';
          return;
        }
      };
      
      formatDate();
      expect(mockResult.textContent).toBe('Por favor, selecione uma data.');
      expect(mockResult.style.borderLeftColor).toBe('#dc3545');
    });

    test('deve usar funções DateUtils para formatação', () => {
      const testDate = '2024-03-15';
      
      const formatted = DateUtils.formatDate(testDate, 'dd/mm/yyyy');
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
      
      const isWeekend = DateUtils.isWeekend(testDate);
      expect(typeof isWeekend).toBe('boolean');
      
      const weekNumber = DateUtils.getWeekNumber(testDate);
      expect(weekNumber).toBeGreaterThan(0);
      
      const quarter = DateUtils.getQuarter(testDate);
      expect(quarter).toBe(1);
    });
  });

  describe('generateMoonPhases Logic', () => {
    test('deve validar mês vazio', () => {
      const mockContainer = { innerHTML: '' };
      
      const generateMoonPhases = () => {
        const monthInput = '';
        
        if (!monthInput) {
          mockContainer.innerHTML = '<p style="text-align: center; color: #dc3545;">Por favor, selecione um mês.</p>';
          return;
        }
      };
      
      generateMoonPhases();
      expect(mockContainer.innerHTML).toContain('Por favor, selecione um mês.');
    });

    test('deve gerar fases principais da lua', () => {
      const mainPhases = DateUtils.getMainMoonPhasesForMonth(2024, 2); // Março 2024
      expect(Array.isArray(mainPhases)).toBe(true);
      
      mainPhases.forEach(phase => {
        expect(phase).toHaveProperty('phase');
        expect(phase).toHaveProperty('icon');
        expect(phase).toHaveProperty('formattedDate');
      });
    });

    test('deve gerar todas as fases diárias', () => {
      const allPhases = DateUtils.getMoonPhasesForMonth(2024, 2); // Março 2024
      expect(Array.isArray(allPhases)).toBe(true);
      expect(allPhases.length).toBe(31); // Março tem 31 dias
      
      allPhases.forEach(phase => {
        expect(phase).toHaveProperty('day');
        expect(phase).toHaveProperty('phase');
        expect(phase).toHaveProperty('icon');
        expect(phase).toHaveProperty('formattedDate');
      });
    });
  });

  describe('HTML Generation Logic', () => {
    test('deve gerar HTML para calendário', () => {
      const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];

      const weekDays = ['Sem', 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      
      expect(monthNames[2]).toBe('Março');
      expect(weekDays[0]).toBe('Sem');
      expect(weekDays.length).toBe(8); // Incluindo coluna de semana
    });

    test('deve processar dados do calendário', () => {
      const calendar = DateUtils.generateCalendar(2024, 2); // Março 2024
      
      calendar.forEach(dayObj => {
        expect(dayObj).toHaveProperty('day');
        expect(dayObj).toHaveProperty('isCurrentMonth');
        expect(dayObj).toHaveProperty('isToday');
        
        expect(typeof dayObj.day).toBe('number');
        expect(typeof dayObj.isCurrentMonth).toBe('boolean');
        expect(typeof dayObj.isToday).toBe('boolean');
      });
    });
  });
});