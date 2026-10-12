# Data Import Manager

Monorepo com API AdonisJS e frontend Vue 3.

- `apps/api`: base inicial baseada no roleplay-api, com AdonisJS 5.9.0, Lucid 18.3.0 e SQLite.
- `apps/web`: frontend Vue 3 com Vite.

## Desenvolvimento

Use Node 20.19 ou superior, dentro da faixa definida no package.json da raiz.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cd apps/api
node ace generate:key
cd ../..
npm run dev
```

Se ja existir um `.env` local, preserve sua APP_KEY e ajuste as variaveis conforme `.env.example`.

A API responde em `http://localhost:3333/` com `{ "hello": "world" }`.
O frontend roda em `http://localhost:5174`.

SQLite usa `DB_CONNECTION=sqlite` e `SQLITE_DB_PATH=tmp/db.sqlite3` (relativo a apps/api em desenvolvimento). A pasta `tmp` e criada durante a inicializacao. A API nao inclui models, migrations, seeders ou controllers de negocio. As antigas rotas `/health`, `/posts` e `/summary` foram removidas; telas que dependem delas precisam de novas implementacoes.

```bash
npm run typecheck --workspace @data-import-manager/api
npm run lint --workspace @data-import-manager/api
npm test --workspace @data-import-manager/api
npm run build --workspace @data-import-manager/api
```

Para executar o build, configure as variaveis de ambiente e execute `node apps/api/build/server.js`.
