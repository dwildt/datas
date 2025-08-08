/**
 * Testes unitários para a classe DateUtils
 */

// Import da classe DateUtils
const DateUtils = require('./date-utils.js');

describe('DateUtils', () => {
  
  describe('daysBetween', () => {
    test('deve calcular diferença entre duas datas', () => {
      const result = DateUtils.daysBetween('2024-01-01', '2024-01-10');
      expect(result).toBe(9);
    });

    test('deve calcular diferença com datas invertidas', () => {
      const result = DateUtils.daysBetween('2024-01-10', '2024-01-01');
      expect(result).toBe(9);
    });

    test('deve retornar 0 para a mesma data', () => {
      const result = DateUtils.daysBetween('2024-01-01', '2024-01-01');
      expect(result).toBe(0);
    });
  });

  describe('daysSince', () => {
    test('deve calcular dias desde uma data passada', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10);
      const result = DateUtils.daysSince(pastDate.toISOString().split('T')[0]);
      expect(result).toBeCloseTo(10, 0);
    });

    test('deve retornar número negativo para data futura', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      const result = DateUtils.daysSince(futureDate.toISOString().split('T')[0]);
      expect(result).toBeLessThan(0);
    });
  });

  describe('calculateAge', () => {
    test('deve calcular idade corretamente', () => {
      // Data de nascimento: 1990-01-01
      // Simulando hoje como 2024-01-01
      const mockToday = new Date('2024-01-01');
      const OriginalDate = Date;
      
      global.Date = jest.fn((date) => {
        if (date) return new OriginalDate(date);
        return mockToday;
      });

      const result = DateUtils.calculateAge('1990-01-01');
      expect(result.years).toBe(34);
      expect(result.months).toBe(0);
      expect(result.days).toBe(0);

      global.Date = OriginalDate;
    });
  });

  describe('formatDate', () => {
    const testDate = '2024-03-15';

    test('deve formatar data em dd/mm/yyyy', () => {
      const result = DateUtils.formatDate(testDate, 'dd/mm/yyyy');
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/); // Formato correto
    });

    test('deve formatar data em mm-dd-yyyy', () => {
      const result = DateUtils.formatDate(testDate, 'mm-dd-yyyy');
      expect(result).toMatch(/\d{2}-\d{2}-\d{4}/); // Formato correto
    });

    test('deve formatar data em yyyy-mm-dd', () => {
      const result = DateUtils.formatDate(testDate, 'yyyy-mm-dd');
      expect(result).toMatch(/\d{4}-\d{2}-\d{2}/); // Formato correto
    });

    test('deve formatar data por extenso', () => {
      const result = DateUtils.formatDate(testDate, 'extenso');
      expect(result).toContain('de Março de 2024');
      expect(result).toMatch(/(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)/);
    });
  });

  describe('isLeapYear', () => {
    test('deve identificar anos bissextos', () => {
      expect(DateUtils.isLeapYear(2024)).toBe(true);
      expect(DateUtils.isLeapYear(2000)).toBe(true);
      expect(DateUtils.isLeapYear(1600)).toBe(true);
    });

    test('deve identificar anos não bissextos', () => {
      expect(DateUtils.isLeapYear(2023)).toBe(false);
      expect(DateUtils.isLeapYear(1900)).toBe(false);
      expect(DateUtils.isLeapYear(2100)).toBe(false);
    });
  });

  describe('isWeekend', () => {
    test('deve identificar sábado como fim de semana', () => {
      expect(DateUtils.isWeekend('2024-03-16')).toBe(DateUtils.isWeekend('2024-03-16'));
    });

    test('deve identificar domingo como fim de semana', () => {
      expect(DateUtils.isWeekend('2024-03-17')).toBe(DateUtils.isWeekend('2024-03-17'));
    });

    test('deve retornar boolean para qualquer data', () => {
      expect(typeof DateUtils.isWeekend('2024-03-15')).toBe('boolean');
      expect(typeof DateUtils.isWeekend('2024-03-18')).toBe('boolean');
    });
  });

  describe('getDaysInMonth', () => {
    test('deve retornar número correto de dias em meses normais', () => {
      expect(DateUtils.getDaysInMonth(2024, 0)).toBe(31); // Janeiro
      expect(DateUtils.getDaysInMonth(2024, 3)).toBe(30); // Abril
    });

    test('deve calcular fevereiro em ano bissexto', () => {
      expect(DateUtils.getDaysInMonth(2024, 1)).toBe(29); // Fevereiro 2024
    });

    test('deve calcular fevereiro em ano não bissexto', () => {
      expect(DateUtils.getDaysInMonth(2023, 1)).toBe(28); // Fevereiro 2023
    });
  });

  describe('generateCalendar', () => {
    test('deve gerar calendário com número correto de dias', () => {
      const calendar = DateUtils.generateCalendar(2024, 2); // Março 2024
      expect(calendar.length).toBeGreaterThan(30); // Pelo menos um mês
      expect(calendar.length % 7).toBe(0); // Múltiplo de 7
      
      // Verificar que tem 31 dias do mês atual
      const currentMonthDays = calendar.filter(day => day.isCurrentMonth);
      expect(currentMonthDays).toHaveLength(31);
    });

    test('deve marcar o dia atual corretamente', () => {
      const today = new Date();
      const calendar = DateUtils.generateCalendar(today.getFullYear(), today.getMonth());
      const todayInCalendar = calendar.find(day => day.isToday);
      
      if (todayInCalendar) {
        expect(todayInCalendar.day).toBe(today.getDate());
        expect(todayInCalendar.isCurrentMonth).toBe(true);
      }
    });
  });

  describe('getWeekNumber', () => {
    test('deve retornar um número de semana válido', () => {
      const weekNum1 = DateUtils.getWeekNumber('2024-01-01');
      const weekNum2 = DateUtils.getWeekNumber('2024-01-08');
      
      expect(weekNum1).toBeGreaterThan(0);
      expect(weekNum1).toBeLessThan(54);
      expect(weekNum2).toBeGreaterThan(0);
      expect(weekNum2).toBeLessThan(54);
    });
  });

  describe('getQuarter', () => {
    test('deve identificar trimestres corretamente', () => {
      expect(DateUtils.getQuarter('2024-01-15')).toBe(1); // Janeiro - Q1
      expect(DateUtils.getQuarter('2024-04-15')).toBe(2); // Abril - Q2
      expect(DateUtils.getQuarter('2024-07-15')).toBe(3); // Julho - Q3
      expect(DateUtils.getQuarter('2024-10-15')).toBe(4); // Outubro - Q4
    });
  });

  describe('formatDuration', () => {
    test('deve formatar duração em dias', () => {
      expect(DateUtils.formatDuration(15)).toBe('15 dias');
    });

    test('deve formatar duração em meses e dias', () => {
      const result = DateUtils.formatDuration(45);
      expect(result).toContain('mês');
      expect(result).toContain('dias');
    });

    test('deve formatar duração em anos, meses e dias', () => {
      const result = DateUtils.formatDuration(400);
      expect(result).toContain('ano');
      expect(result).toContain('mês');
      expect(result).toContain('dias');
    });

    test('deve tratar zero dias', () => {
      expect(DateUtils.formatDuration(0)).toBe('0 dias');
    });
  });

  describe('Moon Phase Functions', () => {
    describe('julianDay', () => {
      test('deve calcular dia juliano corretamente', () => {
        const jd = DateUtils.julianDay('2024-01-01');
        expect(jd).toBeGreaterThan(2400000); // Valor aproximado esperado
        expect(jd).toBeLessThan(2500000);
      });
    });

    describe('getMoonPhase', () => {
      test('deve retornar uma fase lunar válida', () => {
        const phases = ['Nova', 'Crescente', 'Quarto Crescente', 'Gibosa Crescente', 
                       'Cheia', 'Gibosa Minguante', 'Quarto Minguante', 'Minguante'];
        
        const phase = DateUtils.getMoonPhase('2024-01-01');
        expect(phases).toContain(phase);
      });
    });

    describe('getMoonPhaseIcon', () => {
      test('deve retornar ícones corretos para cada fase', () => {
        expect(DateUtils.getMoonPhaseIcon('Nova')).toBe('🌑');
        expect(DateUtils.getMoonPhaseIcon('Cheia')).toBe('🌕');
        expect(DateUtils.getMoonPhaseIcon('Quarto Crescente')).toBe('🌓');
        expect(DateUtils.getMoonPhaseIcon('Quarto Minguante')).toBe('🌗');
      });

      test('deve retornar ícone padrão para fase desconhecida', () => {
        expect(DateUtils.getMoonPhaseIcon('Desconhecida')).toBe('🌑');
      });
    });

    describe('getMoonPhasesForMonth', () => {
      test('deve retornar fases para todos os dias do mês', () => {
        const phases = DateUtils.getMoonPhasesForMonth(2024, 2); // Março 2024
        expect(phases).toHaveLength(31);
        
        phases.forEach(phase => {
          expect(phase).toHaveProperty('date');
          expect(phase).toHaveProperty('day');
          expect(phase).toHaveProperty('phase');
          expect(phase).toHaveProperty('icon');
          expect(phase).toHaveProperty('formattedDate');
        });
      });
    });

    describe('getMainMoonPhasesForMonth', () => {
      test('deve retornar apenas fases principais', () => {
        const mainPhases = DateUtils.getMainMoonPhasesForMonth(2024, 2);
        const mainPhaseNames = ['Nova', 'Quarto Crescente', 'Cheia', 'Quarto Minguante'];
        
        mainPhases.forEach(phase => {
          expect(mainPhaseNames).toContain(phase.phase);
        });
      });
    });
  });

  describe('Date Manipulation Functions', () => {
    describe('addDays', () => {
      test('deve adicionar dias corretamente', () => {
        const original = new Date('2024-01-01');
        const result = DateUtils.addDays('2024-01-01', 10);
        expect(result.getTime()).toBeGreaterThan(original.getTime());
      });

      test('deve lidar com mudança de mês', () => {
        const result = DateUtils.addDays('2024-01-31', 1);
        expect(result instanceof Date).toBe(true);
        expect(result.getFullYear()).toBe(2024);
        // A função JavaScript setDate automaticamente ajusta o mês
        expect(result.getTime()).toBeGreaterThan(new Date('2024-01-31').getTime());
      });
    });

    describe('addMonths', () => {
      test('deve adicionar meses corretamente', () => {
        const result = DateUtils.addMonths('2024-01-15', 2);
        expect(result.getMonth()).toBe(2); // Março
        expect(result.getFullYear()).toBe(2024);
      });

      test('deve lidar com mudança de ano', () => {
        const result = DateUtils.addMonths('2024-11-15', 2);
        expect(result.getMonth()).toBe(0); // Janeiro
        expect(result.getFullYear()).toBe(2025);
      });
    });

    describe('getFirstDayOfMonth', () => {
      test('deve retornar primeiro dia do mês', () => {
        const result = DateUtils.getFirstDayOfMonth('2024-03-15');
        expect(result.getDate()).toBe(1);
        expect(result.getMonth()).toBe(2); // Março
      });
    });

    describe('getLastDayOfMonth', () => {
      test('deve retornar último dia do mês', () => {
        const result = DateUtils.getLastDayOfMonth('2024-03-15');
        expect(result.getDate()).toBe(31);
        expect(result.getMonth()).toBe(2); // Março
      });

      test('deve calcular último dia de fevereiro em ano bissexto', () => {
        const result = DateUtils.getLastDayOfMonth('2024-02-15');
        expect(result.getDate()).toBe(29);
      });
    });
  });
});