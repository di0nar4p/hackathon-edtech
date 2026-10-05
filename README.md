# 🛡️ vigIA: Prevenção Ativa da Evasão Universitária

> "A IA cruza os dados dispersos e aciona o alerta; mas é uma equipe de humanos que entra em ação para acolher e resolver o problema de outro ser humano, antes que seja tarde demais."

Plataforma web desenvolvida para o **Hackathon EdTech Ânima 2026**. O vigIA não é um dashboard passivo: é um **modelo de ação humana ativado por inteligência artificial**, que consolida dados já existentes nos sistemas legados da instituição e os transforma em intervenções preventivas conduzidas por pessoas.

> **Escopo desta versão:** o repositório contém a landing page e uma **demonstração funcional** da consulta em linguagem natural (front-end estático + API PHP + MySQL). O modelo operacional completo (integração com ERP/LMS/AVA, Célula de Permanência, perfis de acesso) é a proposta do projeto e está descrito abaixo como visão de solução.

---

## 🎯 O Problema

No Brasil, **1 em cada 4 estudantes abandona o ensino superior no 1º ano**. As instituições só percebem o problema quando o aluno já trancou a matrícula ou parou de pagar: a ação chega tarde.

Os dados para identificar o risco já existem dispersos em ERPs, LMSs, AVAs e sistemas financeiros. O que falta é uma camada que os cruze, interprete e acione as pessoas certas no momento certo.

---

## 💡 A Solução: Modelo de Atuação

```
Dados do Sistema Legado          Motor vigIA              Célula Centralizada
(ERP + LMS + AVA + Financeiro) → (IA + Score Composto) → (Equipe Humana Age)
```

1. **Conexão de dados:** o motor consulta os sistemas acadêmicos existentes via MCP (Model Context Protocol), sem migração nem substituição do legado.
2. **Análise contextual:** a IA calcula o **Score Composto de Engajamento (0 a 100)** cruzando frequência, notas, acesso ao AVA e situação financeira.
3. **Alerta para humanos:** a Célula Centralizada de Gestão de Permanência recebe o alerta e conduz o acolhimento do aluno de forma proativa, de humano para humano.

> Na demonstração atual, o score considera os dados disponíveis na base de exemplo: **frequência e média de notas**. Acesso ao AVA e situação financeira fazem parte da proposta de integração.

---

## 🏢 Célula Centralizada de Gestão de Permanência

Equipe dedicada (interna ou terceirizada) que:

- Recebe os alertas gerados pelo motor vigIA
- Consulta o histórico do aluno em linguagem natural via MCP
- Entra em contato proativamente com o aluno em risco
- Conduz o acolhimento e encaminha para os recursos institucionais adequados (financeiro, pedagógico, psicossocial)
- Registra a resolução e fecha o ciclo

**A IA identifica. O humano resolve. Sempre.**

---

## 📊 Score Composto de Engajamento

| Faixa    | Nível       | Ação                          |
|----------|-------------|-------------------------------|
| 76 a 100 | 🟢 Verde    | Monitoramento padrão          |
| 51 a 75  | 🟡 Amarelo  | Atenção preventiva            |
| 41 a 50  | 🟠 Laranja  | Intervenção recomendada       |
| 0 a 40   | 🔴 Vermelho | Intervenção crítica imediata  |

---

## 🔎 Consulta Inteligente (demo MCP)

A página inclui uma caixa de consulta em linguagem natural. A pergunta é enviada via `fetch` (POST, JSON) para a API PHP hospedada na Hostinger, que identifica a intenção, consulta o MySQL e devolve a resposta em texto estruturado.

Intenções suportadas:

- **risco:** "Qual o risco do aluno Lucas Silva abandonar o curso?"
- **frequencia:** "Quais alunos tiveram queda de frequência na última semana?"

O reconhecimento de intenção e de nome do aluno é feito em `api/parsing.php`, por normalização de texto e correspondência de palavras-chave com os nomes cadastrados na base.

---

## 👥 Equipe Multidisciplinar

Projeto desenvolvido por alunos do ecossistema Ânima, integrando três áreas:

| Área                    | Contribuição                                   |
|-------------------------|------------------------------------------------|
| Tecnologia da Informação | Arquitetura, API e banco de dados             |
| Gestão                  | Modelagem do fluxo operacional, ROI e viabilidade |
| Direito                 | Conformidade LGPD, política de privacidade, governança de dados |

---

## 🔒 Segurança e Conformidade LGPD

O vigIA é concebido com privacidade por design.

**Implementado na demonstração:**

- **CORS estrito:** a API aceita apenas a origem `https://peruzzo-dot.github.io` e ambientes locais (`localhost` / `127.0.0.1`)
- **Consultas parametrizadas:** acesso ao banco via PDO com prepared statements
- **Validação de entrada:** a API rejeita métodos diferentes de POST e corpos sem o campo `pergunta`
- **Credenciais fora do repositório:** `api/config.php` não é versionado

**Diretrizes do modelo completo (proposta, ainda não implementadas na demo):**

- **Zero-Trust:** verificação contínua de qualquer acesso aos dados analíticos
- **Data Masking:** anonimização de nomes e RAs no front-end
- **Consentimento granular:** controle de acesso por perfil (coordenador, tutor, célula)
- **Sanitização de saída no front-end** contra XSS

---

## 💰 Viabilidade e ROI (estimativas do projeto)

- Investimento estimado: ~R$ 15 por aluno/mês
- Potencial de recuperação: 250 matrículas/semestre
- Receita protegida: ~R$ 2 milhões/semestre
- Retorno sobre investimento: ~10x

O vigIA não substitui sistemas existentes: atua sobre o legado já pago pela instituição.

---

## 🗂️ Estrutura do Projeto

```
index.html            Página principal (landing + demo MCP)
script.js             Consulta à API e interação da caixa de busca
style.css             Identidade visual
api/
  consulta.php        Endpoint POST /api/consulta.php (CORS, validação, MySQL)
  parsing.php         Extração de nome e detecção de intenção em PT-BR
  config.example.php  Template de configuração do banco
sql/
  schema.sql          Estrutura da tabela `alunos`
  seed.sql            Dados de exemplo para demonstração
```

---

## ⚙️ Como Rodar

**Front-end:** abra o `index.html` no navegador ou publique no GitHub Pages. Não há dependência de build.

**API (PHP 8 + MySQL):**

1. Execute `sql/schema.sql` e depois `sql/seed.sql` no banco de dados.
2. Copie `api/config.example.php` para `api/config.php` e preencha `DB_HOST`, `DB_NAME`, `DB_USER` e `DB_PASS`.
   > ⚠️ `config.php` não é versionado: nunca suba credenciais reais.
3. Publique a pasta `api/` em um servidor PHP 8+ e ajuste `MCP_API_URL` em `script.js` com a URL publicada.
4. Para usar outro domínio além do GitHub Pages, altere `ORIGEM_PERMITIDA` em `api/consulta.php`.

---

## 🛠️ Stack Tecnológico

| Camada                | Tecnologia                                        |
|-----------------------|---------------------------------------------------|
| Front-end             | HTML5 semântico, CSS3 responsivo, JavaScript ES6+ |
| API                   | PHP 8 (strict types), PDO, REST                   |
| Banco de dados        | MySQL                                             |
| Interpretação da pergunta | Parsing em PT-BR por palavras-chave (`parsing.php`) |
| Protocolo de contexto | MCP (Model Context Protocol), conceito da arquitetura proposta |
| Hospedagem front-end  | GitHub Pages                                      |
| Hospedagem API e DB   | Hostinger                                         |

---

## 🚀 5 Frentes de Intervenção Preventiva

1. **Diagnóstico Cognitivo:** mapeamento de perfil e lacunas na entrada do curso
2. **Trilha Personalizada:** itinerários adaptativos focados nas dificuldades individuais
3. **Microlearning Adaptativo:** doses diárias de aprendizado para alto engajamento
4. **Simulados Inteligentes:** avaliações contínuas de fixação do conhecimento
5. **Vigilância Institucional:** alertas em tempo real para a Célula de Permanência

---

© 2026 vigIA, Hackathon EdTech Ânima | Equipe Multidisciplinar (TI + Gestão + Direito)
