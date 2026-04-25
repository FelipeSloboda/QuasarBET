SET TIME ZONE 'America/Sao_Paulo';

/* INSTALACAO_TB */
CREATE TABLE IF NOT EXISTS instalacao_tb (
    id        SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    data      TIMESTAMP
);

INSERT INTO instalacao_tb (descricao, data)
VALUES ('INSTALACAO OK', NOW());


/* USUARIOS */
CREATE TABLE IF NOT EXISTS usuarios_tb (
    id                   SERIAL PRIMARY KEY,
    cpf                  CHAR(11) UNIQUE NOT NULL,
    email                VARCHAR(254) UNIQUE NOT NULL,
    senha                TEXT NOT NULL,
    nome                 VARCHAR(100) NOT NULL,
    sobrenomes           VARCHAR(150) NOT NULL,
    data_nascimento      DATE NOT NULL,
    status               VARCHAR(20) NOT NULL DEFAULT 'pendente',
    email_verificado     BOOLEAN NOT NULL DEFAULT FALSE,
    telefone_verificado  BOOLEAN NOT NULL DEFAULT FALSE,
    ultimo_login         TIMESTAMPTZ,
    tentativas_login     INT NOT NULL DEFAULT 0,
    bloqueio_login_ate   TIMESTAMPTZ,
    data_cadastro        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_atualizacao     TIMESTAMPTZ
);

/* TELEFONES */
CREATE TABLE IF NOT EXISTS telefones_tb (
    id                   SERIAL PRIMARY KEY,
    usuario_id           INT NOT NULL,
    codigo_pais          SMALLINT NOT NULL,
    ddd                  SMALLINT NOT NULL,
    telefone             VARCHAR(15) UNIQUE NOT NULL,
    data_cadastro        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,      
    data_atualizacao     TIMESTAMPTZ,
    CONSTRAINT fk_telefones_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE
);

/* ENDERECOS */
CREATE TABLE IF NOT EXISTS enderecos_tb (
    id                   SERIAL PRIMARY KEY,
    usuario_id           INT NOT NULL,
    cep                  VARCHAR(8) NULL,
    endereco             VARCHAR(150) NULL,
    complemento          VARCHAR(50) NULL,
    num                  VARCHAR(10) NULL,
    bairro               VARCHAR(50) NULL,
    cidade               VARCHAR(50) NULL,
    estado               VARCHAR(50) NULL,
    pais                 VARCHAR(50) NULL,
    data_cadastro        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_atualizacao     TIMESTAMPTZ,
    CONSTRAINT fk_enderecos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE
);

/* CARTEIRAS */
CREATE TABLE IF NOT EXISTS carteiras_tb (
    id                   SERIAL PRIMARY KEY,
    usuario_id           INT NOT NULL,
    saldo                NUMERIC(15,2) NOT NULL DEFAULT 0.00,
    data_cadastro        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_atualizacao     TIMESTAMPTZ,
    CONSTRAINT fk_carteiras_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE
);

/* INDICACOES */
CREATE TABLE IF NOT EXISTS indicacoes_tb (
    id                   SERIAL PRIMARY KEY,
    usuario_id           INT NOT NULL,
    codigo_indicacao     VARCHAR(50) NOT NULL,
    usuario_id_indicador INT NULL,
    data_cadastro        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_atualizacao     TIMESTAMPTZ,
    CONSTRAINT fk_indicacoes_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_indicacoes_usuario_indicador
        FOREIGN KEY (usuario_id_indicador)
        REFERENCES usuarios_tb(id)
        ON DELETE SET NULL
);

/* SESSOES */
CREATE TABLE IF NOT EXISTS sessoes_tb (
    id                  SERIAL PRIMARY KEY,
    usuario_id          INT NOT NULL,
    token               VARCHAR(254) NOT NULL,
    ip                  VARCHAR(39) NOT NULL,   
    dados_requisicao    TEXT NOT NULL,
    data_cadastro       TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    data_expiracao      TIMESTAMPTZ ,
    expirado            BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_sessoes_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE
);

/* HISTORICOS_LOGIN */
CREATE TABLE IF NOT EXISTS historicos_login_tb (
    id                  SERIAL PRIMARY KEY,
    usuario_id          INT NOT NULL,
    ip                  VARCHAR(39) NOT NULL,   
    dados_requisicao    TEXT NOT NULL,
    status              VARCHAR(10) NOT NULL,
    data                TIMESTAMPTZ,
    CONSTRAINT fk_historicos_login_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios_tb(id)
        ON DELETE CASCADE
);