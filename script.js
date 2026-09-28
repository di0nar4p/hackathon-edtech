function analisarRisco() {
    const freq = parseInt(document.getElementById('frequencia').value);
    const notas = parseInt(document.getElementById('notas').value);
    const resultado = document.getElementById('resultado-alerta');
    const titulo = document.getElementById('status-titulo');
    const desc = document.getElementById('status-desc');

    const soma = freq + notas;
    resultado.classList.remove('hidden', 'red', 'green', 'orange');

    if (soma <= 5) {
        resultado.classList.add('red');
        titulo.innerText = "🚨 Alerta Crítico de Evasão!";
        desc.innerText = "Ação Imediata: Aluno sem engajamento no AVA e notas baixas. Tutor notificado via vigiIA.";
    } else if (soma <= 14) {
        resultado.classList.add('orange');
        titulo.innerText = "⚠️ Atenção Preventiva";
        desc.innerText = "Ação Recomendada: Notificar aluno com lembrete de conteúdos em Microlearning.";
    } else {
        resultado.classList.add('green');
        titulo.innerText = "✅ Aluno Engajado";
        desc.innerText = "Monitoramento padrão ativo. Nenhuma intervenção necessária no momento.";
    }
}