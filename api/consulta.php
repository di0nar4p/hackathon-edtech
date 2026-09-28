<?php

declare(strict_types=1);

require __DIR__ . '/parsing.php';
require __DIR__ . '/config.php';

// Origem exata do site publicado no GitHub Pages.
// Ajustar aqui se o domínio final do Pages for diferente.
const ORIGEM_PERMITIDA = 'https://peruzzo-dot.github.io';

header('Content-Type: application/json; charset=utf-8');

$origemRequisicao = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origemRequisicao === ORIGEM_PERMITIDA) {
    header('Access-Control-Allow-Origin: ' . ORIGEM_PERMITIDA);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Metodo nao permitido.']);
    exit;
}

$corpo = json_decode((string) file_get_contents('php://input'), true);
$pergunta = is_array($corpo) ? ($corpo['pergunta'] ?? null) : null;

if (!is_string($pergunta) || trim($pergunta) === '') {
    http_response_code(400);
    echo json_encode(['erro' => 'Envie um campo "pergunta" com texto.']);
    exit;
}

try {
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', DB_HOST, DB_NAME),
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Nao foi possivel conectar a base de dados.']);
    exit;
}

$nomesConhecidos = $pdo->query('SELECT nome FROM alunos')->fetchAll(PDO::FETCH_COLUMN);

$nomeAluno = extrairNomeAluno($pergunta, $nomesConhecidos);
$intencao = detectarIntencao($pergunta);

if ($intencao === 'risco' && $nomeAluno !== null) {
    $stmt = $pdo->prepare(
        'SELECT nome, score_risco, nivel_risco, frequencia_pct, media_notas
         FROM alunos WHERE nome = :nome LIMIT 1'
    );
    $stmt->execute(['nome' => $nomeAluno]);
    $aluno = $stmt->fetch(PDO::FETCH_ASSOC);

    $resposta = sprintf(
        "Risco do aluno %s: %s (score %d/100).\nFrequência: %.1f%%. Média de notas: %.1f.",
        $aluno['nome'],
        strtoupper($aluno['nivel_risco']),
        $aluno['score_risco'],
        $aluno['frequencia_pct'],
        $aluno['media_notas']
    );
} elseif ($intencao === 'frequencia') {
    $alunos = $pdo->query(
        'SELECT nome, frequencia_pct FROM alunos WHERE queda_frequencia_7d = 1'
    )->fetchAll(PDO::FETCH_ASSOC);

    if (count($alunos) === 0) {
        $resposta = 'Nenhum aluno com queda de frequência registrada na última semana.';
    } else {
        $linhas = array_map(
            static fn(array $a): string => sprintf('%s (frequência atual: %.1f%%)', $a['nome'], $a['frequencia_pct']),
            $alunos
        );
        $resposta = "Alunos com queda de frequência na última semana:\n" . implode("\n", $linhas);
    }
} elseif ($intencao !== null && $nomeAluno === null) {
    $resposta = 'Não encontrei esse aluno na base. Tente citar o nome completo cadastrado.';
} else {
    $resposta = 'Não entendi a pergunta. Tente citar o nome de um aluno e perguntar sobre risco de evasão ou frequência.';
}

echo json_encode(['resposta' => $resposta]);
