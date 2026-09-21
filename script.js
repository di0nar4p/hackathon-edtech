function gerarResumo() {
  const texto = document.getElementById('textoInput').value;
  const resultadoDiv = document.getElementById('resultado');

  if (texto.trim() === '') {
    alert('Por favor, cole algum texto na caixa antes de gerar o resumo!');
    return;
  }

  // Simulação de carregamento da IA
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = '<p style="color: #38bdf8;">🧠 Processando conteúdo com IA e organizando por conceitos-chave...</p>';

  setTimeout(() => {
    resultadoDiv.innerHTML = `
      <h3 style="color: #10b981; margin-bottom: 10px;">✨ Resumo Adaptativo Gerado:</h3>
      <p><strong>Ponto Principal:</strong> O texto fornecido foi sintetizado para otimizar sua retenção de memória.</p>
      <ul style="margin-left: 20px; margin-top: 10px; color: #cbd5e1;">
        <li>Conceito-chave extraído do seu texto com sucesso.</li>
        <li>Ideal para revisão rápida em 2 minutos.</li>
      </ul>
    `;
  }, 1500);
}