SET TIME ZONE 'America/Sao_Paulo';

/* INSTALACAO_TB */
CREATE TABLE IF NOT EXISTS instalacao_tb (
    id        SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    data      TIMESTAMP
);

INSERT INTO instalacao_tb (descricao, data)
VALUES ('INSTALACAO OK', NOW());

/*USUARIOS*/
CREATE TABLE IF NOT EXISTS users (
    id                  BIGSERIAL PRIMARY KEY,
    cpf                 VARCHAR(11) UNIQUE NOT NULL,
    email               VARCHAR(100) UNIQUE NOT NULL,
    referral_code       VARCHAR(8) UNIQUE NOT NULL,
    country_code        VARCHAR(4) NOT NULL,
    area_code           VARCHAR(3) NOT NULL,
    phone               VARCHAR(9) NOT NULL,
    password_hash       VARCHAR(255) NOT NULL,
    first_name          VARCHAR(50) NOT NULL,
    last_name           VARCHAR(150) NOT NULL,
    birth_date          DATE NOT NULL,
    status              VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'active', 'blocked')),
    email_verified      BOOLEAN NOT NULL DEFAULT FALSE,
    phone_verified      BOOLEAN NOT NULL DEFAULT FALSE,
    login_attempts      INT NOT NULL DEFAULT 0,
    login_blocked_until TIMESTAMPTZ DEFAULT NULL,
    last_login_at       TIMESTAMPTZ DEFAULT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users_referrals (
    id                  BIGSERIAL PRIMARY KEY,
    referrer_user_id    BIGINT NOT NULL,
    referred_user_id    BIGINT NOT NULL,
    referral_code_used  VARCHAR(8),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_referrer
        FOREIGN KEY (referrer_user_id)
        REFERENCES users(id),

    CONSTRAINT fk_referred
        FOREIGN KEY (referred_user_id)
        REFERENCES users(id),

    CONSTRAINT uq_referred_user
        UNIQUE (referred_user_id)
);