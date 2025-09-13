/**
 * Classe utilitária para manipulação de datas
 * Contém métodos estáticos para cálculos, formatação e operações com datas
 * @class DateUtils
 */
class DateUtils {
    /**
     * Calcula a diferença em dias entre duas datas
     * @param {string|Date} date1 - Primeira data
     * @param {string|Date} date2 - Segunda data  
     * @returns {number} Número de dias entre as datas (sempre positivo)
     * @example
     * DateUtils.daysBetween('2024-01-01', '2024-01-10'); // retorna 9
     */
    static daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    /**
     * Calcula quantos dias se passaram desde uma data específica
     * @param {string|Date} date - Data de referência
     * @returns {number} Número de dias desde a data (negativo se for data futura)
     * @example
     * DateUtils.daysSince('2024-01-01'); // retorna dias desde 1º de janeiro de 2024
     */
    static daysSince(date) {
        const targetDate = new Date(date);
        const today = new Date();
        const diffTime = today - targetDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    /**
     * Calcula a idade completa em anos, meses e dias
     * @param {string|Date} birthDate - Data de nascimento
     * @returns {{years: number, months: number, days: number}} Objeto com idade completa
     * @example
     * DateUtils.calculateAge('1990-01-01'); // retorna {years: 34, months: 0, days: 0}
     */
    static calculateAge(birthDate) {
        const birth = new Date(birthDate);
        const today = new Date();
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        let days = today.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    /**
     * Formata uma data em diferentes padrões
     * @param {string|Date} date - Data para formatação
     * @param {string} format - Formato desejado ('dd/mm/yyyy', 'mm-dd-yyyy', 'yyyy-mm-dd', 'extenso')
     * @returns {string} Data formatada
     * @example
     * DateUtils.formatDate('2024-01-01', 'dd/mm/yyyy'); // retorna '01/01/2024'
     * DateUtils.formatDate('2024-01-01', 'extenso'); // retorna 'Segunda-feira, 01 de Janeiro de 2024'
     */
    static formatDate(date, format) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        const monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const weekDays = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];

        switch (format) {
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            case 'mm-dd-yyyy':
                return `${month}-${day}-${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            case 'extenso':
                return `${weekDays[d.getDay()]}, ${day} de ${monthNames[d.getMonth()]} de ${year}`;
            default:
                return d.toDateString();
        }
    }

    /**
     * Verifica se um ano é bissexto
     * @param {number} year - Ano a ser verificado
     * @returns {boolean} True se for ano bissexto
     * @example
     * DateUtils.isLeapYear(2024); // retorna true
     * DateUtils.isLeapYear(2023); // retorna false
     */
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * Verifica se uma data é fim de semana (sábado ou domingo)
     * @param {string|Date} date - Data a ser verificada
     * @returns {boolean} True se for fim de semana
     * @example
     * DateUtils.isWeekend('2024-01-06'); // retorna true (sábado)
     */
    static isWeekend(date) {
        const d = new Date(date);
        const day = d.getDay();
        return day === 0 || day === 6;
    }

    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    static addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    static getFirstDayOfMonth(date) {
        const d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }

    static getLastDayOfMonth(date) {
        const d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth() + 1, 0);
    }

    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    static generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const calendar = [];
        const today = new Date();
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            const prevMonthDay = new Date(year, month, -(startingDayOfWeek - 1 - i));
            calendar.push({
                day: prevMonthDay.getDate(),
                isCurrentMonth: false,
                isToday: false
            });
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            calendar.push({
                day: day,
                isCurrentMonth: true,
                isToday: currentDate.toDateString() === today.toDateString()
            });
        }
        
        const totalCells = Math.ceil(calendar.length / 7) * 7;
        let nextMonthDay = 1;
        for (let i = calendar.length; i < totalCells; i++) {
            calendar.push({
                day: nextMonthDay,
                isCurrentMonth: false,
                isToday: false
            });
            nextMonthDay++;
        }
        
        return calendar;
    }

    static getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    static getQuarter(date) {
        const d = new Date(date);
        return Math.ceil((d.getMonth() + 1) / 3);
    }

    static formatDuration(days) {
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;

        const parts = [];
        if (years > 0) parts.push(`${years} ano${years !== 1 ? 's' : ''}`);
        if (months > 0) parts.push(`${months} mês${months !== 1 ? 'es' : ''}`);
        if (remainingDays > 0) parts.push(`${remainingDays} dia${remainingDays !== 1 ? 's' : ''}`);

        return parts.join(', ') || '0 dias';
    }

    /**
     * Converte uma data para dia juliano (usado em cálculos astronômicos)
     * @param {string|Date} date - Data para conversão
     * @returns {number} Número do dia juliano
     * @example
     * DateUtils.julianDay('2024-01-01'); // retorna número do dia juliano
     */
    static julianDay(date) {
        const d = new Date(date);
        const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
        const y = d.getFullYear() + 4800 - a;
        const m = (d.getMonth() + 1) + 12 * a - 3;
        
        return d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    /**
     * Calcula a fase da lua para uma data específica usando algoritmo astronômico
     * @param {string|Date} date - Data para calcular a fase lunar
     * @returns {string} Nome da fase lunar em português
     * @example
     * DateUtils.getMoonPhase('2024-01-11'); // retorna 'Nova'
     */
    static getMoonPhase(date) {
        const jd = DateUtils.julianDay(date);
        const newMoonJD = 2451549.5; // Referência de lua nova (Jan 6, 2000)
        const synodicMonth = 29.53058867; // Duração do ciclo lunar em dias
        
        const phase = ((jd - newMoonJD) % synodicMonth) / synodicMonth;
        const normalizedPhase = phase < 0 ? phase + 1 : phase;
        
        if (normalizedPhase < 0.0625 || normalizedPhase >= 0.9375) return 'Nova';
        if (normalizedPhase >= 0.0625 && normalizedPhase < 0.1875) return 'Crescente';
        if (normalizedPhase >= 0.1875 && normalizedPhase < 0.3125) return 'Quarto Crescente';
        if (normalizedPhase >= 0.3125 && normalizedPhase < 0.4375) return 'Gibosa Crescente';
        if (normalizedPhase >= 0.4375 && normalizedPhase < 0.5625) return 'Cheia';
        if (normalizedPhase >= 0.5625 && normalizedPhase < 0.6875) return 'Gibosa Minguante';
        if (normalizedPhase >= 0.6875 && normalizedPhase < 0.8125) return 'Quarto Minguante';
        if (normalizedPhase >= 0.8125 && normalizedPhase < 0.9375) return 'Minguante';
        
        return 'Nova';
    }

    /**
     * Retorna o emoji correspondente à fase da lua
     * @param {string} phase - Nome da fase lunar
     * @returns {string} Emoji da fase lunar
     * @example
     * DateUtils.getMoonPhaseIcon('Cheia'); // retorna '🌕'
     */
    static getMoonPhaseIcon(phase) {
        const icons = {
            'Nova': '🌑',
            'Crescente': '🌒',
            'Quarto Crescente': '🌓',
            'Gibosa Crescente': '🌔',
            'Cheia': '🌕',
            'Gibosa Minguante': '🌖',
            'Quarto Minguante': '🌗',
            'Minguante': '🌘'
        };
        return icons[phase] || '🌑';
    }

    static getMoonPhasesForMonth(year, month) {
        const phases = [];
        const daysInMonth = DateUtils.getDaysInMonth(year, month);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const phase = DateUtils.getMoonPhase(date);
            const icon = DateUtils.getMoonPhaseIcon(phase);
            
            phases.push({
                date: date,
                day: day,
                phase: phase,
                icon: icon,
                formattedDate: DateUtils.formatDate(date, 'dd/mm/yyyy')
            });
        }
        
        return phases;
    }

    static getMainMoonPhasesForMonth(year, month) {
        const allPhases = DateUtils.getMoonPhasesForMonth(year, month);
        const mainPhases = [];
        let lastMainPhase = '';
        
        for (let i = 0; i < allPhases.length; i++) {
            const current = allPhases[i];
            const isMainPhase = ['Nova', 'Quarto Crescente', 'Cheia', 'Quarto Minguante'].includes(current.phase);
            
            if (isMainPhase && current.phase !== lastMainPhase) {
                mainPhases.push(current);
                lastMainPhase = current.phase;
            }
        }
        
        return mainPhases;
    }
}

// Export para testes Node.js (Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateUtils;
}