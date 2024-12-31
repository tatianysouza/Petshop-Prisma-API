# Petshop Prisma API

Projeto de API para gerenciamento de petshops e pets, utilizando Node.js, Express e Prisma ORM.

## Instalação

1. Clone o repositório e entre no diretório:

    ```bash
    git clone https://github.com/tatianysouza/Petshop-Prisma-API.git
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure a string de conexão com o banco de dados no arquivo ```.env```:

    ```bash
    DATABASE_URL="sua-string-de-conexao-aqui"
    ```

4. Execute as migrações para criar as tabelas no banco de dados:

    ```bash
    npx prisma migrate dev --name init
    ```

## Uso

1. Inicie o servidor:

    ```bash
    npm run dev
    ```

2. Acesse o Prisma Studio para gerenciar os dados:

    ```bash
    npx prisma studio
    ```

O servidor estará rodando na porta 3000 do localhost.
