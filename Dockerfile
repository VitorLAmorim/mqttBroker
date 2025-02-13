# Usa uma imagem base do Docker que tenha Docker e Docker Compose
FROM docker:latest

# Instala o Docker Compose
RUN apk add --no-cache docker-compose

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . .

# Exibe os serviços definidos no docker-compose.yml
RUN cat docker-compose.yml

# Comando para rodar o docker-compose
CMD ["docker-compose", "up"]
