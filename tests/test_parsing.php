<?php
require __DIR__ . '/../api/parsing.php';

function assertEquals($esperado, $atual, string $mensagem): void
{
    if ($esperado !== $atual) {
        fwrite(STDERR, "FALHOU: {$mensagem}\n  esperado: " . var_export($esperado, true) . "\n  obtido:   " . var_export($atual, true) . "\n");
        exit(1);
    }
    echo "OK: {$mensagem}\n";
}

$nomes = ['Lucas Silva', 'Mariana Costa', 'Pedro Henrique', 'Beatriz Lima'];

assertEquals('Lucas Silva', extrairNomeAluno('Qual o risco do aluno Lucas Silva abandonar o curso?', $nomes), 'reconhece nome exato');
assertEquals('Lucas Silva', extrairNomeAluno('qual o risco do lucas silva', $nomes), 'reconhece nome sem acento e minusculo');
assertEquals('Lucas Silva', extrairNomeAluno('QUAL O RISCO DO LUCAS SILVA', $nomes), 'reconhece nome em caixa alta');
assertEquals(null, extrairNomeAluno('qual o risco do aluno Joao Ninguem', $nomes), 'nome inexistente retorna null');

assertEquals('risco', detectarIntencao('Qual o risco do aluno Lucas Silva abandonar o curso?'), 'detecta intencao de risco');
assertEquals('risco', detectarIntencao('Existe chance de evasao da Beatriz Lima?'), 'detecta intencao de risco por sinonimo evasao');
assertEquals('frequencia', detectarIntencao('Quais alunos tiveram queda de frequência na última semana?'), 'detecta intencao de frequencia');
assertEquals(null, detectarIntencao('Me fale sobre o Lucas Silva'), 'sem intencao reconhecida retorna null');

echo "\nTodos os testes de parsing passaram.\n";
