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

const MCP_API_URL = 'https://mintcream-lion-144816.hostingersite.com/consulta.php';

async function consultarMCP(pergunta) {
    const responseBox = document.getElementById('mcp-response');
    const textElement = document.getElementById('mcp-text');

    if (!responseBox || !textElement) return;

    responseBox.style.display = 'block';
    textElement.innerHTML = '<em>Consultando base de dados via protocolo MCP...</em>';

    try {
        const resposta = await fetch(MCP_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pergunta }),
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            textElement.innerHTML = `<em>${dados.erro ?? 'Não foi possível consultar a base agora.'}</em>`;
            return;
        }

        textElement.innerHTML = dados.resposta.replace(/\n/g, '<br>');
    } catch (erro) {
        textElement.innerHTML = '<em>Não foi possível conectar à base de dados no momento. Tente novamente em instantes.</em>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const inputPergunta = document.getElementById('mcp-pergunta');
    const btnPerguntar = document.getElementById('mcp-perguntar');

    if (!inputPergunta || !btnPerguntar) return;

    const disparar = () => {
        const pergunta = inputPergunta.value.trim();
        if (pergunta === '') return;
        consultarMCP(pergunta);
    };

    btnPerguntar.addEventListener('click', disparar);
    inputPergunta.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') disparar();
    });
});