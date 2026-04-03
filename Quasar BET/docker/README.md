[DOWNLOAD]
DOCKER
PROJETO

[INSTALACAO]
Configurar:
./docker/.env

[BUILD]
docker compose -f docker-compose.yml build

[EXECUÇÃO]
docker compose -f docker-compose.yml up -d 
docker compose -f docker-compose.yml down

[ACESSAR-CONTAINERS]
docker exec -it mysql bash
mysql -u root -p (senha do .env)

[VERSOES]
POSTGRE 18.1
JAVA 21
SPRING BOOT 3.5.11
SPRING DOC 2.7.0
JPA
JWS

DOCKER DESKTOP 4.67.0
WSL 2.6.20
VS CODE 1.111.0
HEIDISQL 12.15.0.7171
POSTMAN 12.4.5