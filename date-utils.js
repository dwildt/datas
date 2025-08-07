class DateUtils {
    static daysBetween(date1, date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    static daysSince(date) {
        const targetDate = new Date(date);
        const today = new Date();
        const diffTime = today - targetDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

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

    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

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
        for (let i = calendar.length; i < totalCells; i++) {
            const nextMonthDay = i - calendar.length + 1;
            calendar.push({
                day: nextMonthDay,
                isCurrentMonth: false,
                isToday: false
            });
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

    static julianDay(date) {
        const d = new Date(date);
        const a = Math.floor((14 - (d.getMonth() + 1)) / 12);
        const y = d.getFullYear() + 4800 - a;
        const m = (d.getMonth() + 1) + 12 * a - 3;
        
        return d.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
               Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    }

    static getMoonPhase(date) {
        const jd = DateUtils.julianDay(date);
        const newMoonJD = 2451549.5;
        const synodicMonth = 29.53058867;
        
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