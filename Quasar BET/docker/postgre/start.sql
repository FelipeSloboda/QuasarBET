SET TIME ZONE 'America/Sao_Paulo';

/* INSTALACAO_TB */
CREATE TABLE IF NOT EXISTS instalacao_tb (
    id        SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    data      TIMESTAMP
);

INSERT INTO instalacao_tb (descricao, data)
VALUES ('INSTALACAO OK', NOW());


/* TESTE_TB */
CREATE TABLE IF NOT EXISTS teste_tb (
    id        SERIAL PRIMARY KEY,
    descricao VARCHAR(255)
);

INSERT INTO teste_tb (descricao)
VALUES ('TESTE 1');


/* USER_TB */
CREATE TABLE IF NOT EXISTS usuario_tb (
    id      SERIAL PRIMARY KEY,
    usuario VARCHAR(255) UNIQUE NOT NULL,
    senha   VARCHAR(255) NOT NULL
);

INSERT INTO usuario_tb (usuario, senha)
VALUES ('admin', '$2a$12$4dRfsC/exd4UT2R9xh4T0uBoYK2EyBEJrwwsH.exX/wbcqX8951yK');