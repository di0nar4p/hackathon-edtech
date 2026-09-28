<?php

declare(strict_types=1);

function normalizarTexto(string $texto): string
{
    $texto = mb_strtolower(trim($texto), 'UTF-8');
    $mapa = [
        'á' => 'a', 'à' => 'a', 'ã' => 'a', 'â' => 'a', 'ä' => 'a',
        'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e',
        'í' => 'i', 'ì' => 'i', 'î' => 'i', 'ï' => 'i',
        'ó' => 'o', 'ò' => 'o', 'õ' => 'o', 'ô' => 'o', 'ö' => 'o',
        'ú' => 'u', 'ù' => 'u', 'û' => 'u', 'ü' => 'u',
        'ç' => 'c',
    ];
    return strtr($texto, $mapa);
}

function extrairNomeAluno(string $pergunta, array $nomesConhecidos): ?string
{
    $perguntaNormalizada = normalizarTexto($pergunta);
    foreach ($nomesConhecidos as $nome) {
        if (str_contains($perguntaNormalizada, normalizarTexto($nome))) {
            return $nome;
        }
    }
    return null;
}

function detectarIntencao(string $pergunta): ?string
{
    $perguntaNormalizada = normalizarTexto($pergunta);

    $termosRisco = ['risco', 'abandonar', 'abandono', 'evasao', 'evadir'];
    foreach ($termosRisco as $termo) {
        if (str_contains($perguntaNormalizada, $termo)) {
            return 'risco';
        }
    }

    $termosFrequencia = ['frequencia', 'queda', 'faltas', 'falta', 'semana'];
    foreach ($termosFrequencia as $termo) {
        if (str_contains($perguntaNormalizada, $termo)) {
            return 'frequencia';
        }
    }

    return null;
}
