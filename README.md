Para iniciar o projeto
yarn install

crie um arquivo .env e inclua
NODE_ENV=development
PORT=3333

DB MySQL
Cria uma base de dados chamada calendar
confirue as Db no ormconfig.json

rodar no terminal:
yarn install
yarn typeorm migration:run
yarn dev:server
