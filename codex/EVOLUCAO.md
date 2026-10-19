# Evolução em backend

Guia da mentoria: [Doc.MD](Doc.MD).

Ao final de uma sessão, quando solicitado, adicionar um registro com data, desafio, resultado, avaliação, pontos a melhorar e próximo passo. Avaliar apenas o que foi demonstrado e distinguir revisão de código de testes executados. Consultar IA ou documentação para sintaxe faz parte do aprendizado.

## 2026-10-12 — Prévia de importação de clientes

- **Resultado:** concluído por revisão de código. `POST /imports/preview` recebe clientes, remove espaços nas extremidades, normaliza e-mails para minúsculas e retorna a lista e o total, sem persistência.
- **Aprendizados:** fluxo rota → controller → validação → resposta; retorno de objetos no `map()`; contagem com `length`; normalização antes da validação de e-mail.
- **Investigação:** teste manual relatado retornou `422` para e-mail com espaços; schema ajustado com `trim`. A resposta após o ajuste e os demais casos de aceite não foram apresentados. A API não foi executada pelo mentor nesta avaliação.
- **Nota geral:** 7,5/10, avaliação da sessão. Autonomia: 8; raciocínio: 7; AdonisJS/TypeScript: 7; organização: 8; qualidade: 7; erros/casos de borda: 7; investigação: 8; testes: 6.
- **A melhorar:** diferenciar array vazio de propriedade ausente; remover o `if (!payload.customers)` desnecessário; melhorar a formatação do schema; registrar evidências dos testes de aceite.
- **Próximo desafio:** persistir clientes no SQLite com migration e model Lucid; implementar `POST /customers` e `GET /customers`, validar entrada, impedir e-mails duplicados e verificar persistência após reiniciar a aplicação. Requisitos completos serão definidos na próxima sessão.

## 2026-10-13 — Cadastro e exclusão de clientes

- **Resultado:** migration e model Customer criados; POST e DELETE implementados. Entrega parcial por revisão de código, sem execução da API pelo mentor.
- **Aprendizados:** persistência com Lucid; busca por coluna e valor com `findBy`; verificação de existência antes da exclusão; consulta à documentação e à IA para dúvidas de sintaxe.
- **Correções verificadas:** `trim` no nome e e-mail, cadastro com `201`, cliente inexistente com `404` e variável `createCustomer`.
- **Avaliação:** 8,5/10 em aprendizagem e autonomia, considerando o avanço para persistência e exclusão sem solução pronta. Completude da entrega é avaliada separadamente. Testes não avaliados por falta de evidências; a tentativa de typecheck retornou `tsc: command not found`.
- **Pendências:** normalizar e-mail para minúsculas; garantir unicidade no banco por migration e tratar duplicidade; corrigir DELETE bem-sucedido de `201` para `200` com resposta ou `204` sem corpo; ajustar mensagem de cadastro para cliente. Verificar nome só com espaços, duplicidade com capitalização diferente, exclusão inexistente e persistência após reinício. Se a migration já foi aplicada, apenas editar seu arquivo não atualiza a tabela.
- **Próxima sessão (2026-10-14):** novo enunciado combinando as pendências com atualização de clientes por PUT; até 1 hora. GET permanece no roteiro para uma etapa posterior.

## 2026-10-14 — Atualização do nome do cliente

- **Resultado:** PUT `/customers/:id` implementado com validação e trim do nome, busca do cliente, retorno 404 quando inexistente e `await save()` antes da resposta 200. Fluxo aprovado por revisão de código; testes de aceite não apresentados e API não executada pelo mentor.
- **Aprendizados:** `request.only()` retorna um objeto; atribuir ao model altera a instância em memória; `save()` persiste e `await` aguarda a conclusão antes da resposta. Dúvida de sintaxe resolvida com orientação pontual. Aluno relatou compreender o fluxo e considerar a tarefa fácil.
- **Pendências anteriores resolvidas:** DELETE com status 200 e mensagem de cadastro referindo-se a cliente.
- **Pendências adiadas:** unicidade do e-mail no banco e tratamento de duplicidade, adiados a pedido do aluno. Normalização do e-mail para minúsculas e evidências dos testes anteriores também continuam pendentes. Não tratar o cadastro como totalmente concluído.
- **Próximo desafio:** GET `/customers` com filtro parcial por nome, paginação, ordenação por ID crescente e validação dos parâmetros; consultar os registros persistidos, sem carregar toda a tabela para filtrar em memória. Dedicação de até 1 hora por sessão.

## 2026-10-19 — Consulta paginada, filtros e unicidade

- **Resultado:** GET de listagem com parâmetros dinâmicos, padrões page=1 e limit=10, filtro parcial por nome, ordenação por ID e paginação no banco. Validação de inteiros positivos e limite máximo de 50 implementada com assistência. GET por ID retorna 200 ou 404.
- **Persistência e erros:** migration de alteração adiciona unicidade ao e-mail e o down remove a restrição com dropUnique. Cadastro retorna 409 para SQLITE_CONSTRAINT e relança outros erros com throw.
- **Aprendizados:** query string é entrada e meta é saída; diferença entre objeto vazio e propriedade undefined; padrões com ??; conversão com Number versus verificação com Number.isInteger; referência de objetos; filtro LIKE; papel de model, migration, NOT NULL e UNIQUE; inversão entre up e down.
- **Evidências:** revisão do histórico local e código nos commits 76aa8de, d9c2b71, aaaffcb, 32de493 e 9dce63e. Push informado pelo aluno, sem verificação remota. API, migrations e rollback não executados pelo mentor nesta revisão; sem evidências completas dos testes de aceite.
- **Avaliação qualitativa:** avanço na construção de consultas e evolução de schema. Houve orientação conceitual e exemplos de sintaxe; validação numérica foi fornecida pelo mentor. Manter foco em compreender contratos e avaliar código assistido, sem exigir memorização de sintaxe. Sem nova nota numérica nesta revisão.
- **Pendências:** normalizar e-mails para minúsculas; distinguir violação de unicidade de outras SQLITE_CONSTRAINT; aplicar filtro apenas quando name não estiver vazio (atualmente usa LIKE '%%'); remover verificações redundantes de string vazia após a validação numérica. Confirmar testes de paginação, filtro, duplicidade e rollback preservando registros em banco de teste.
- **Próximo passo:** registrar evidências dos casos principais e definir a próxima história com regras de negócio ou relacionamentos, sem prolongar exercícios mecânicos de paginação.
