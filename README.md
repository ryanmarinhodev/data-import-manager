# Data Import Manager

Laboratorio pessoal para estudar backend com Node.js, TypeScript, AdonisJS 5, Lucid, SQL e integracao com Vue 3 usando dados ficticios.

## Estrutura

- `apps/api`: API backend em AdonisJS 5.
- `apps/web`: frontend Vue 3 com Vite.
- `docs`: registros curtos de estudo e historias do laboratorio.

## Rodando localmente

Use Node `20.19.0` ou superior dentro da faixa definida em `package.json`.

```bash
npm install
npm run dev
```

Endpoints e portas iniciais:

- API: `http://localhost:3333`
- Health check: `http://localhost:3333/health`
- Web: `http://localhost:5174`

## Proxima historia sugerida

Como desenvolvedor, quero entender o fluxo de uma requisicao `GET /health`, passando por rota, controller implicito e resposta JSON, para conseguir explicar request/response antes de criar CRUDs.
