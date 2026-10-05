CREATE TABLE IF NOT EXISTS alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    frequencia_pct DECIMAL(5,2) NOT NULL,
    media_notas DECIMAL(4,2) NOT NULL,
    score_risco INT NOT NULL,
    nivel_risco ENUM('verde', 'amarelo', 'laranja', 'vermelho') NOT NULL,
    queda_frequencia_7d TINYINT(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
