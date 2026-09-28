document.addEventListener('DOMContentLoaded', () => {
    const btnAnalyze = document.getElementById('btn-analyze');
    const resultBox = document.getElementById('result-box');
    const resultTitle = document.getElementById('result-title');
    const resultScore = document.getElementById('result-score');
    const resultStatus = document.getElementById('result-status');
    const resultAction = document.getElementById('result-action');
    const studentDisplay = document.getElementById('student-display');

    // Função de Sanitização para prevenir Cross-Site Scripting (XSS)
    function sanitizeInput(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Função de Mascaramento de Nome (LGPD - Privacidade do Estudante)
    function maskStudentName(name) {
        if (!name || name.trim() === '') return 'Aluno Anônimo';
        const cleanName = sanitizeInput(name.trim());
        const parts = cleanName.split(' ');
        if (parts.length === 1) {
            return parts[0].substring(0, 2) + '***';
        }
        return `${parts[0]} ${parts[1].substring(0, 1)}.*** (LGPD Protegido)`;
    }

    btnAnalyze.addEventListener('click', () => {
        const studentInput = document.getElementById('student-name').value;
        const freqValue = parseInt(document.getElementById('freq').value);
        const notesValue = parseInt(document.getElementById('notes').value);

        // Processar mascaramento e sanitização de dados
        const maskedName = maskStudentName(studentInput);

        // Cálculo do Score Composto (0 a 100)
        const score = Math.round((freqValue * 0.6) + (notesValue * 0.4));

        // Atualização da Interface do Usuário (UX)
        studentDisplay.textContent = maskedName;
        resultScore.textContent = `Score Composto de Engajamento: ${score} / 100`;

        resultBox.className = 'result-box'; // Limpa classes anteriores

        if (score >= 76) {
            resultBox.classList.add('bg-green');
            resultTitle.textContent = '🟢 Risco Baixo (Verde)';
            resultStatus.textContent = 'Status: Estudante engajado e adaptado.';
            resultAction.textContent = 'Ação Recomendada: Manter monitoramento padrão e enviar conteúdos de nivelamento avançado.';
        } else if (score >= 51) {
            resultBox.classList.add('bg-yellow');
            resultTitle.textContent = '🟡 Risco Médio (Amarelo)';
            resultStatus.textContent = 'Status: Sinais iniciais de desengajamento acadêmico.';
            resultAction.textContent = 'Ação Recomendada: Enviar pílulas de Microlearning diárias e reforço de trilha personalizada.';
        } else if (score >= 41) {
            resultBox.classList.add('bg-orange');
            resultTitle.textContent = '🟠 Risco Alto (Laranja)';
            resultStatus.textContent = 'Status: Frequência ou notas em queda vertiginosa.';
            resultAction.textContent = 'Ação Recomendada: Notificar o tutor acadêmico para agendamento de mentoria de apoio.';
        } else {
            resultBox.classList.add('bg-red');
            resultTitle.textContent = '🔴 ALERTA CRÍTICO DE EVASÃO (Vermelho)';
            resultStatus.textContent = 'Status: Ausência prolongada e desempenho crítico no AVA.';
            resultAction.textContent = 'Ação Recomendada: Intervenção urgente da coordenação e apoio psicológico/social via canal seguro.';
        }

        resultBox.classList.remove('hidden');
    });
});

function simularMCP(opcao) {
    const responseBox = document.getElementById('mcp-response');
    const textElement = document.getElementById('mcp-text');
    
    if (!responseBox || !textElement) return;

    responseBox.style.display = 'block';
    textElement.innerHTML = '<em>Consultando base de dados via protocolo MCP...</em>';

    setTimeout(() => {
        if (opcao === 1) {
            textElement.innerHTML = `<strong>Risco do aluno Lucas Silva: ALTO (82%)</strong><br>
            • Frequência nos últimos 15 dias: 45% (queda de 30%).<br>
            • Última nota no LMS: 4.2 na disciplina de Algoritmos.<br>
            💡 <em>Ação sugerida: Enviar alerta automático ao coordenador para agendar tutoria.</em>`;
        } else if (opcao === 2) {
            textElement.innerHTML = `<strong>Alunos com alerta de frequência esta semana: 3 encontrados</strong><br>
            1. Mariana Costa — Análise de Sistemas (Faltas consecutivas: 4)<br>
            2. Pedro Henrique — Engenharia (Faltas consecutivas: 3)<br>
            3. Beatriz Lima — Gestão TI (Frequência geral abaixo de 70%)<br>
            💡 <em>Alerta de intervenção preventiva disparado.</em>`;
        }
    }, 600);
}