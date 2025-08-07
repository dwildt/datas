function calculateDifference() {
    const date1 = document.getElementById('date1').value;
    const date2 = document.getElementById('date2').value;
    const resultDiv = document.getElementById('difference-result');

    if (!date1 || !date2) {
        resultDiv.textContent = 'Por favor, selecione ambas as datas.';
        resultDiv.style.borderLeftColor = '#dc3545';
        return;
    }

    const days = DateUtils.daysBetween(date1, date2);
    const duration = DateUtils.formatDuration(days);
    
    resultDiv.innerHTML = `
        <strong>Diferença:</strong> ${days} dias<br>
        <strong>Duração:</strong> ${duration}
    `;
    resultDiv.style.borderLeftColor = '#28a745';
}

function daysSince() {
    const date = document.getElementById('since-date').value;
    const resultDiv = document.getElementById('days-since-result');

    if (!date) {
        resultDiv.textContent = 'Por favor, selecione uma data.';
        resultDiv.style.borderLeftColor = '#dc3545';
        return;
    }

    const days = DateUtils.daysSince(date);
    const duration = DateUtils.formatDuration(Math.abs(days));
    
    if (days >= 0) {
        resultDiv.innerHTML = `
            <strong>Dias decorridos:</strong> ${days} dias<br>
            <strong>Duração:</strong> ${duration}
        `;
    } else {
        resultDiv.innerHTML = `
            <strong>Data futura:</strong> ${Math.abs(days)} dias<br>
            <strong>Faltam:</strong> ${duration}
        `;
    }
    resultDiv.style.borderLeftColor = '#28a745';
}

function generateCalendar() {
    const monthInput = document.getElementById('calendar-month').value;
    const container = document.getElementById('calendar-container');

    if (!monthInput) {
        container.innerHTML = '<p style="text-align: center; color: #dc3545;">Por favor, selecione um mês.</p>';
        return;
    }

    const [year, month] = monthInput.split('-').map(Number);
    const calendar = DateUtils.generateCalendar(year, month - 1);
    
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    let html = `
        <div style="grid-column: 1 / -1; text-align: center; font-size: 1.2rem; font-weight: bold; margin-bottom: 10px; color: #333;">
            ${monthNames[month - 1]} ${year}
        </div>
    `;
    
    weekDays.forEach(day => {
        html += `<div class="calendar-header">${day}</div>`;
    });
    
    calendar.forEach(dayObj => {
        let className = 'calendar-day';
        if (!dayObj.isCurrentMonth) className += ' other-month';
        if (dayObj.isToday) className += ' today';
        
        html += `<div class="${className}">${dayObj.day}</div>`;
    });

    container.innerHTML = html;
}

function calculateAge() {
    const birthDate = document.getElementById('birth-date').value;
    const resultDiv = document.getElementById('age-result');

    if (!birthDate) {
        resultDiv.textContent = 'Por favor, selecione a data de nascimento.';
        resultDiv.style.borderLeftColor = '#dc3545';
        return;
    }

    const age = DateUtils.calculateAge(birthDate);
    const totalDays = DateUtils.daysSince(birthDate);
    
    resultDiv.innerHTML = `
        <strong>Idade:</strong> ${age.years} anos, ${age.months} meses e ${age.days} dias<br>
        <strong>Total de dias vividos:</strong> ${totalDays} dias
    `;
    resultDiv.style.borderLeftColor = '#28a745';
}

function formatDate() {
    const date = document.getElementById('format-date').value;
    const format = document.getElementById('format-type').value;
    const resultDiv = document.getElementById('format-result');

    if (!date) {
        resultDiv.textContent = 'Por favor, selecione uma data.';
        resultDiv.style.borderLeftColor = '#dc3545';
        return;
    }

    const formattedDate = DateUtils.formatDate(date, format);
    const dateObj = new Date(date);
    
    resultDiv.innerHTML = `
        <strong>Data formatada:</strong> ${formattedDate}<br>
        <strong>Informações adicionais:</strong><br>
        • Dia da semana: ${DateUtils.formatDate(date, 'extenso').split(',')[0]}<br>
        • É final de semana: ${DateUtils.isWeekend(date) ? 'Sim' : 'Não'}<br>
        • Semana do ano: ${DateUtils.getWeekNumber(date)}<br>
        • Trimestre: ${DateUtils.getQuarter(date)}º trimestre
    `;
    resultDiv.style.borderLeftColor = '#28a745';
}

function generateMoonPhases() {
    const monthInput = document.getElementById('moon-month').value;
    const container = document.getElementById('moon-phases-container');
    const viewType = document.querySelector('input[name="moon-view"]:checked').value;

    if (!monthInput) {
        container.innerHTML = '<p style="text-align: center; color: #dc3545;">Por favor, selecione um mês.</p>';
        return;
    }

    const [year, month] = monthInput.split('-').map(Number);
    
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    if (viewType === 'main') {
        const mainPhases = DateUtils.getMainMoonPhasesForMonth(year, month - 1);
        
        let html = `
            <div style="text-align: center; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; color: #333;">
                Fases Principais da Lua - ${monthNames[month - 1]} ${year}
            </div>
            <div class="moon-phases-grid">
        `;
        
        mainPhases.forEach(phase => {
            html += `
                <div class="moon-phase-card main-phase">
                    <span class="moon-icon">${phase.icon}</span>
                    <div class="moon-phase-name">${phase.phase}</div>
                    <div class="moon-phase-date">${phase.formattedDate}</div>
                </div>
            `;
        });
        
        html += '</div>';
        
        if (mainPhases.length === 0) {
            html = '<p style="text-align: center; color: #666;">Nenhuma fase principal encontrada neste mês.</p>';
        }
        
        container.innerHTML = html;
    } else {
        const allPhases = DateUtils.getMoonPhasesForMonth(year, month - 1);
        
        let html = `
            <div style="text-align: center; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; color: #333;">
                Fases Diárias da Lua - ${monthNames[month - 1]} ${year}
            </div>
            <div class="moon-phases-list">
        `;
        
        allPhases.forEach(phase => {
            html += `
                <div class="moon-day-item" title="${phase.phase} - ${phase.formattedDate}">
                    <div class="moon-day-number">${phase.day}</div>
                    <span class="moon-day-icon">${phase.icon}</span>
                    <div class="moon-day-phase">${phase.phase}</div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const currentMonth = today.toISOString().slice(0, 7);
    const initialDate = '2024-01-01';
    
    document.getElementById('date1').value = initialDate;
    document.getElementById('date2').value = todayStr;
    document.getElementById('since-date').value = initialDate;
    document.getElementById('calendar-month').value = currentMonth;
    document.getElementById('moon-month').value = currentMonth;
    
    generateCalendar();
    generateMoonPhases();
    
    document.querySelectorAll('input[name="moon-view"]').forEach(radio => {
        radio.addEventListener('change', generateMoonPhases);
    });
});