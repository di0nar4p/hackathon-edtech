const MCP_API_URL = 'https://mintcream-lion-144816.hostingersite.com/api/consulta.php';

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
    const botoesExemplo = document.querySelectorAll('.demo-exemplo');

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

    botoesExemplo.forEach((botao) => {
        botao.addEventListener('click', () => {
            inputPergunta.value = botao.dataset.pergunta;
            disparar();
        });
    });
});