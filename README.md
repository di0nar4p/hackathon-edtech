# 🛡️ vigIA — Sistema Inteligente de Prevenção à Evasão Universitária

Plataforma Web Front-End desenvolvida para o **Hackathon EdTech**. O **vigiIA** atua como um radar preditivo silencioso no ensino superior, identificando sinais de desengajamento acadêmico e gerando intervenções preventivas automáticas antes que o aluno abandone o curso.

---

## 🎯 O Problema
No Brasil, **1 em cada 4 estudantes abandona o ensino superior**. A retenção é um desafio crítico para a sustentabilidade e qualidade das instituições de ensino.

---

## 🚀 A Solução (Plataforma Modular)
O **vigiIA** integra dados de LMS, ERP e AVA para atuar em 5 frentes estratégicas:

1. **Diagnóstico Cognitivo:** Mapeamento do perfil de aprendizagem na chegada do aluno.
2. **Trilha Personalizada:** Itinerários adaptativos direcionados às lacunas individuais.
3. **Microlearning Adaptativo:** Conteúdos em pequenas doses diárias de engajamento.
4. **Simulados Inteligentes:** Avaliações contínuas de fixação do conhecimento.
5. **Vigilância Institucional (⚡ Radar em Tempo Real):** Alertas preventivos automáticos para docentes e tutores sem sobrecarregar o estudante.

---

## 📊 Régua de Score Composto
O sistema calcula o risco acadêmico em 4 níveis:
- **Verde (76–100):** Monitoramento padrão.
- **Amarelo (51–75):** Atenção preventiva.
- **Laranja (41–50):** Intervenção recomendada.
- **Vermelho (0–40):** Intervenção crítica imediata.

---

## 🔎 Consulta à Base (MCP)
A página traz uma caixa de consulta em linguagem livre. A pergunta é enviada por `fetch` (POST, JSON) para a API PHP hospedada na Hostinger, que consulta a base MySQL e devolve a resposta em texto.

Exemplos de pergunta: "Qual o risco do aluno X?" ou "Quem teve queda de frequência nos últimos 7 dias?".

---

## 🗂️ Estrutura do Projeto
```
index.html        Página principal
script.js         Consulta à API e interação da caixa de busca
style.css         Identidade visual
api/consulta.php  Endpoint POST /api/consulta.php (CORS, validação, consulta ao MySQL)
api/parsing.php   Extração do nome do aluno e detecção da intenção da pergunta
sql/schema.sql    Tabela `alunos`
sql/seed.sql      Dados de exemplo
```

---

## ⚙️ Como Rodar
**Front-end:** abra o `index.html` no navegador ou publique no GitHub Pages.

**API (PHP 8 + MySQL):**
1. Crie a base e execute `sql/schema.sql` e `sql/seed.sql`.
2. Crie `api/config.php` com as constantes `DB_HOST`, `DB_NAME`, `DB_USER` e `DB_PASS`. Esse arquivo não é versionado.
3. Publique a pasta `api/` em um servidor PHP e ajuste `MCP_API_URL` no `script.js` para a URL publicada.
4. O CORS aceita a origem do GitHub Pages e `localhost`. Para outro domínio, altere `ORIGEM_PERMITIDA` em `api/consulta.php`.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5:** Estruturação semântica da plataforma web.
- **CSS3:** Design responsivo com identidade visual dark/neon educacional.
- **JavaScript (ES6):** Interação da página e consumo da API.
- **PHP 8 + MySQL (PDO):** API de consulta à base de alunos.
- **GitHub Pages:** Hospedagem do front-end.
- **Hostinger:** Hospedagem da API e da base de dados.

---

© 2026 Projeto vigiIA — Equipe Hackathon EdTech
