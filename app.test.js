/**
 * Testes unitários para as funções do app.js
 */

// Import dos arquivos necessários
require('./date-utils.js');
require('./app.js');

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

  describe('calculateDifference', () => {
    test('deve calcular diferença entre datas válidas', () => {
      mockElements['date1'].value = '2024-01-01';
      mockElements['date2'].value = '2024-01-10';
      
      calculateDifference();
      
      expect(mockElements['difference-result'].innerHTML).toContain('9 dias');
      expect(mockElements['difference-result'].style.borderLeftColor).toBe('#28a745');
    });

    test('deve mostrar erro quando date1 está vazia', () => {
      mockElements['date1'].value = '';
      mockElements['date2'].value = '2024-01-10';
      
      calculateDifference();
      
      expect(mockElements['difference-result'].textContent).toBe('Por favor, selecione ambas as datas.');
      expect(mockElements['difference-result'].style.borderLeftColor).toBe('#dc3545');
    });

    test('deve mostrar erro quando date2 está vazia', () => {
      mockElements['date1'].value = '2024-01-01';
      mockElements['date2'].value = '';
      
      calculateDifference();
      
      expect(mockElements['difference-result'].textContent).toBe('Por favor, selecione ambas as datas.');
      expect(mockElements['difference-result'].style.borderLeftColor).toBe('#dc3545');
    });

    test('deve mostrar erro quando ambas as datas estão vazias', () => {
      mockElements['date1'].value = '';
      mockElements['date2'].value = '';
      
      calculateDifference();
      
      expect(mockElements['difference-result'].textContent).toBe('Por favor, selecione ambas as datas.');
      expect(mockElements['difference-result'].style.borderLeftColor).toBe('#dc3545');
    });
  });

  describe('daysSince', () => {
    test('deve calcular dias desde uma data passada', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 10);
      mockElements['since-date'].value = pastDate.toISOString().split('T')[0];
      
      daysSince();
      
      expect(mockElements['days-since-result'].innerHTML).toContain('Dias decorridos:');
      expect(mockElements['days-since-result'].innerHTML).toContain('10');
      expect(mockElements['days-since-result'].style.borderLeftColor).toBe('#28a745');
    });

    test('deve calcular dias para uma data futura', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      mockElements['since-date'].value = futureDate.toISOString().split('T')[0];
      
      daysSince();
      
      expect(mockElements['days-since-result'].innerHTML).toContain('Data futura:');
      expect(mockElements['days-since-result'].innerHTML).toContain('5');
      expect(mockElements['days-since-result'].style.borderLeftColor).toBe('#28a745');
    });

    test('deve mostrar erro quando data não é fornecida', () => {
      mockElements['since-date'].value = '';
      
      daysSince();
      
      expect(mockElements['days-since-result'].textContent).toBe('Por favor, selecione uma data.');
      expect(mockElements['days-since-result'].style.borderLeftColor).toBe('#dc3545');
    });
  });

  describe('generateCalendar', () => {
    test('deve gerar calendário para mês válido', () => {
      mockElements['calendar-month'].value = '2024-03';
      
      generateCalendar();
      
      expect(mockElements['calendar-container'].innerHTML).toContain('Março 2024');
      expect(mockElements['calendar-container'].innerHTML).toContain('calendar-header');
      expect(mockElements['calendar-container'].innerHTML).toContain('calendar-day');
      expect(mockElements['calendar-container'].innerHTML).toContain('calendar-week-number');
    });

    test('deve mostrar erro quando mês não é fornecido', () => {
      mockElements['calendar-month'].value = '';
      
      generateCalendar();
      
      expect(mockElements['calendar-container'].innerHTML).toContain('Por favor, selecione um mês.');
    });

    test('deve incluir cabeçalho com dias da semana e número da semana', () => {
      mockElements['calendar-month'].value = '2024-03';
      
      generateCalendar();
      
      const html = mockElements['calendar-container'].innerHTML;
      expect(html).toContain('Sem'); // Cabeçalho da semana
      expect(html).toContain('Dom');
      expect(html).toContain('Seg');
      expect(html).toContain('Ter');
      expect(html).toContain('Qua');
      expect(html).toContain('Qui');
      expect(html).toContain('Sex');
      expect(html).toContain('Sáb');
    });
  });

  describe('calculateAge', () => {
    test('deve calcular idade corretamente', () => {
      mockElements['birth-date'].value = '1990-01-01';
      
      // Mock da função calculateAge do DateUtils
      jest.spyOn(DateUtils, 'calculateAge').mockReturnValue({
        years: 34,
        months: 0,
        days: 0
      });
      
      jest.spyOn(DateUtils, 'daysSince').mockReturnValue(12418);
      
      calculateAge();
      
      expect(mockElements['age-result'].innerHTML).toContain('34 anos, 0 meses e 0 dias');
      expect(mockElements['age-result'].innerHTML).toContain('12418 dias');
      expect(mockElements['age-result'].style.borderLeftColor).toBe('#28a745');
    });

    test('deve mostrar erro quando data de nascimento não é fornecida', () => {
      mockElements['birth-date'].value = '';
      
      calculateAge();
      
      expect(mockElements['age-result'].textContent).toBe('Por favor, selecione a data de nascimento.');
      expect(mockElements['age-result'].style.borderLeftColor).toBe('#dc3545');
    });
  });

  describe('formatDate', () => {
    beforeEach(() => {
      // Mock das funções DateUtils usadas na formatação
      jest.spyOn(DateUtils, 'formatDate').mockImplementation((date, format) => {
        if (format === 'dd/mm/yyyy') return '15/03/2024';
        if (format === 'extenso') return 'Sexta-feira, 15 de Março de 2024';
        return '15/03/2024';
      });
      
      jest.spyOn(DateUtils, 'isWeekend').mockReturnValue(false);
      jest.spyOn(DateUtils, 'getWeekNumber').mockReturnValue(11);
      jest.spyOn(DateUtils, 'getQuarter').mockReturnValue(1);
    });

    test('deve formatar data corretamente', () => {
      mockElements['format-date'].value = '2024-03-15';
      mockElements['format-type'].value = 'dd/mm/yyyy';
      
      formatDate();
      
      expect(mockElements['format-result'].innerHTML).toContain('15/03/2024');
      expect(mockElements['format-result'].innerHTML).toContain('Sexta-feira');
      expect(mockElements['format-result'].innerHTML).toContain('É final de semana: Não');
      expect(mockElements['format-result'].innerHTML).toContain('Semana do ano: 11');
      expect(mockElements['format-result'].innerHTML).toContain('1º trimestre');
      expect(mockElements['format-result'].style.borderLeftColor).toBe('#28a745');
    });

    test('deve mostrar erro quando data não é fornecida', () => {
      mockElements['format-date'].value = '';
      
      formatDate();
      
      expect(mockElements['format-result'].textContent).toBe('Por favor, selecione uma data.');
      expect(mockElements['format-result'].style.borderLeftColor).toBe('#dc3545');
    });
  });

  describe('generateMoonPhases', () => {
    beforeEach(() => {
      // Mock das funções de fase lunar
      jest.spyOn(DateUtils, 'getMainMoonPhasesForMonth').mockReturnValue([
        {
          phase: 'Nova',
          icon: '🌑',
          formattedDate: '01/03/2024'
        },
        {
          phase: 'Cheia', 
          icon: '🌕',
          formattedDate: '15/03/2024'
        }
      ]);

      jest.spyOn(DateUtils, 'getMoonPhasesForMonth').mockReturnValue([
        {
          day: 1,
          phase: 'Nova',
          icon: '🌑',
          formattedDate: '01/03/2024'
        },
        {
          day: 2,
          phase: 'Crescente',
          icon: '🌒',
          formattedDate: '02/03/2024'
        }
      ]);
    });

    test('deve gerar fases principais da lua', () => {
      mockElements['moon-month'].value = '2024-03';
      
      document.querySelector = jest.fn(() => ({ value: 'main' }));
      
      generateMoonPhases();
      
      const html = mockElements['moon-phases-container'].innerHTML;
      expect(html).toContain('Fases Principais da Lua - Março 2024');
      expect(html).toContain('Nova');
      expect(html).toContain('Cheia');
      expect(html).toContain('🌑');
      expect(html).toContain('🌕');
    });

    test('deve gerar todas as fases diárias', () => {
      mockElements['moon-month'].value = '2024-03';
      
      document.querySelector = jest.fn(() => ({ value: 'all' }));
      
      generateMoonPhases();
      
      const html = mockElements['moon-phases-container'].innerHTML;
      expect(html).toContain('Fases Diárias da Lua - Março 2024');
      expect(html).toContain('moon-day-item');
    });

    test('deve mostrar erro quando mês não é fornecido', () => {
      mockElements['moon-month'].value = '';
      
      generateMoonPhases();
      
      expect(mockElements['moon-phases-container'].innerHTML).toContain('Por favor, selecione um mês.');
    });

    test('deve mostrar mensagem quando não há fases principais', () => {
      mockElements['moon-month'].value = '2024-03';
      document.querySelector = jest.fn(() => ({ value: 'main' }));
      
      DateUtils.getMainMoonPhasesForMonth.mockReturnValue([]);
      
      generateMoonPhases();
      
      expect(mockElements['moon-phases-container'].innerHTML)
        .toContain('Nenhuma fase principal encontrada neste mês.');
    });
  });

  describe('DOM Event Handlers', () => {
    test('deve configurar valores iniciais no DOMContentLoaded', () => {
      // Mock Date para ter um valor consistente
      const mockDate = new Date('2024-03-15T10:00:00');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

      // Mock das funções do app
      const generateCalendarSpy = jest.fn();
      const generateMoonPhasesSpy = jest.fn();
      
      global.generateCalendar = generateCalendarSpy;
      global.generateMoonPhases = generateMoonPhasesSpy;

      // Mock addEventListener
      const addEventListenerSpy = jest.fn();
      document.querySelectorAll = jest.fn(() => [
        { addEventListener: addEventListenerSpy }
      ]);

      // Simular o evento DOMContentLoaded
      const event = new Event('DOMContentLoaded');
      document.dispatchEvent(event);

      // Verificar se os valores iniciais foram definidos
      expect(mockElements['date1'].value).toBe('2024-01-01');
      expect(mockElements['date2'].value).toBe('2024-03-15');
      expect(mockElements['since-date'].value).toBe('2024-01-01');
      expect(mockElements['calendar-month'].value).toBe('2024-03');
      expect(mockElements['moon-month'].value).toBe('2024-03');

      global.Date.mockRestore();
    });
  });
});