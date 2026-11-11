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


## 2026-10-27 — Pedidos de clientes e integridade referencial

- **Resultado:** entrega integrada no histórico local pelo merge do PR #7 (`6d236d4`), com implementação em `99d5d87`. POST vincula o pedido ao cliente da URL, verifica sua existência, exige preço inteiro positivo, fixa status `pendente` e retorna 201 com campos selecionados. Relacionamentos hasMany/belongsTo, ativação das FKs no pool SQLite e migration de RESTRICT implementados; DELETE trata violação de FK com 409.
- **Aprendizados:** FK no banco versus relacionamento no model; CASCADE versus RESTRICT; fiscalização por conexão no SQLite; diagnóstico por PRAGMA; up/down; operadores ??, || e &&; create já persiste; seleção dos campos da resposta. Sintaxe e parte das validações foram orientadas pelo mentor.
- **Avaliação de evolução:** 8/10. Autonomia 8 (implementação com orientação pontual); raciocínio 8 (vínculo e proteção de exclusão); AdonisJS/TypeScript 8 (models, migrations e controllers integrados); organização 8 (camadas separadas); qualidade 7 (catch redundante e comentários antigos); erros/casos de borda 7 (preço corrigido, descrição só com espaços e rollback ainda pendentes); investigação 9 (evidências via PRAGMA para diagnosticar FK desativada). Testes funcionais: não avaliados por falta de evidências completas.
- **Verificação:** typecheck passou na revisão final. API, migrations e rollback não executados pelo mentor. O histórico local confirma o merge; não houve consulta ao remoto. Entrega integrada com pendências, não totalmente validada nos critérios de aceite.
- **Pendências desta história:** aplicar trim e rejeitar descrição contendo apenas espaços; corrigir down das migrations de NOT NULL de price e limite de description para restaurar as definições anteriores, sem apagar as colunas. Rollbacks adiados por decisão do aluno; podem ser implementados com assistência, mas precisam de revisão e teste. Confirmar os testes de criação, tentativa de sobrescrever cliente/status e exclusão com/sem pedidos.
- **Contrato acordado:** status inicial será `pendente`, substituindo `pending` no enunciado. Resposta seleciona id, customerId, description, price e status. Pendências anteriores de clientes continuam registradas na sessão de 19/10.
- **Próximo passo:** consolidar as evidências e definir a próxima história, mantendo a mentoria focada em decisões e regras de negócio; consulta de sintaxe à IA é permitida.


### Direção da mentoria — 27/10/2026

- **Base:** resumos dos dois vídeos fornecidos pelo aluno; adaptação registrada em `Doc.MD`, sem afirmar consulta integral aos vídeos.
- **Acordo:** manter este repositório como laboratório contínuo; priorizar fundamentos aplicados, julgamento técnico, leitura, diagnóstico e testes de regras críticas. Sintaxe e tarefas mecânicas podem receber assistência; decisões devem ser explicadas e verificadas. Sessões de até 1 hora, sem cota rígida de estudo teórico.
- **Próxima história:** confirmar/cancelar pedidos via PATCH, com transições permitidas, repetição sem alteração e proteção dos demais campos. Enunciado atual substituído; pendências de descrição e rollbacks da história anterior permanecem acima.
- **Evidência esperada:** tabela de transições, casos permitido/proibido/repetido e ao menos um teste automatizado protegendo o estado no banco. Concorrência será tratada depois, em uma nova demanda.
- **Ajuste de ritmo solicitado:** duas sessões de até 1 hora são uma estimativa, não um prazo rígido. Continuar em outros dias quando surgirem dúvidas e problemas relevantes, sem penalização pelo tempo; registrar progresso e pedir ajuda se as tentativas se repetirem sem novas evidências. Evitar ampliar o escopo e prolongar detalhes mecânicos já compreendidos. Próximas histórias serão cadastro de usuários, hash de senha, login, tokens, rotas protegidas, logout e autorização. Concorrência foi adiada para ampliar primeiro o domínio do fluxo de autenticação.


## 2026-10-30 — Fechamento: confirmar ou cancelar pedidos

- **Tempo informado:** duas sessões de 1 hora em dias distintos (2 horas no total). Sem desconto pelo tempo; encerramento da avaliação solicitado pelo aluno, sem nova rodada de correções.
- **Nota de evolução:** 7,5/10. Entrega avaliada como parcialmente aderente ao contrato; encerrar a sessão não significa considerar todos os critérios cumpridos.
- **Notas e evidências:** autonomia 8 (implementou após orientações pontuais); raciocínio 7,5 (passou a comparar estado atual e solicitado, mas ampliou indevidamente os destinos permitidos); AdonisJS/TypeScript 7 (schema, rota e persistência funcionam; resposta usa instância desatualizada); organização 8 (fluxo curto e separação adequada ao exercício); qualidade 7,5 (guardas legíveis, resposta inconsistente entre caminhos); erros/casos de borda 7 (404, 409, repetições e preservação de campos corretos, mas aceita retorno a pendente); investigação 8 (formulou dúvidas específicas e refinou a condição com evidências do código). Testes do aluno: não avaliados numericamente sem resultados detalhados; validação manual relatada e teste automatizado solicitado não encontrado no repositório.
- **Verificação do mentor:** typecheck aprovado; migrations aplicadas somente em banco temporário; 11 cenários HTTP executados em instância isolada. Transições previstas atualizam o banco; cancelado → confirmado retorna 409 sem mutação; status ausente/desconhecido retorna 422; ID inexistente retorna 404; outros campos são preservados. Repetições de confirmado e cancelado retornam 200 sem alterar registro ou updated_at. Evidências em [VERIFICACAO_STATUS_2026-10-30.md](VERIFICACAO_STATUS_2026-10-30.md).
- **Falhas registradas, sem correção nesta avaliação:** enum aceita `pendente`, permitindo confirmado → pendente com 200 em vez de rejeitar a entrada; JSON usa findOrders carregado antes de updateOrCreate e devolve status anterior nas mudanças; caminho de cancelado repetido omite ID/status. Tabela de transições e teste automatizado previstos não foram apresentados no material revisado.
- **Aprendizados:** && combina condições; valor truthy não equivale à comparação de status; enum valida entrada e regra de transição depende do estado atual; mudança no banco não atualiza automaticamente outra instância do model já carregada. Assistência de sintaxe registrada sem penalização por consulta.
- **Próxima etapa:** cadastro de usuários e hash de senha, depois login/tokens e rotas protegidas, conforme prioridade acordada. Não ampliar este desafio para concorrência. Pendências históricas continuam registradas.

### Atualização após o fechamento — 30/10/2026

- **Correção voluntária:** resposta do PATCH passou a usar o status da instância retornada por `Order.updateOrCreate`, resolvendo por revisão de código a divergência entre a mudança e o JSON. Typecheck aprovado novamente; a bateria HTTP anterior não foi repetida. `statusUpdated = data` é um alias dispensável, sem impacto funcional que justifique prolongar a tarefa.
- **Estado restante:** destino `pendente` ainda aceito; repetição de cancelado ainda retorna apenas mensagem. Este último é um detalhe de contrato de menor impacto. Falhas da versão anterior permanecem no relatório como histórico, não como nova execução após a correção. Nota original preservada; não houve nova avaliação completa solicitada.
- **Direção reafirmada:** laboratório de conhecimento e retenção, sem compromisso de completar ou polir um produto comercial. Avançar com pendências documentadas e retomar conceitos brevemente em novas histórias. Revisão do guia removeu conflitos sobre expansão de escopo e fixou `codex/Enunciado.md` como fonte vigente.
- **Nova história preparada:** cadastro de usuários com hash de senha; retoma validação, unicidade e persistência no contexto de credenciais. Login, token e proteção de rotas vêm em seguida.


## 2026-11-11 — Cadastro de usuários e hash de senha

- **Situação da entrega:** história encerrada para avanço, com pendências. Revisão de código confirma `POST /users`, validação de nome/e-mail/senha, trim de nome/e-mail, normalização de e-mail, hash bcrypt antes da persistência, resposta 201 e tratamento de duplicidade com 409. Migration declara e-mail UNIQUE e NOT NULL; model oculta password na serialização. Aplicação das migrations e comportamento HTTP não foram verificados nesta sessão.
- **Correções confirmadas:** senha deixou de receber trim; chamada de comparação foi removida do cadastro. O aluno explicou que comparar a senha com o hash recém-gerado não pertence ao fluxo de criação e que a comparação será necessária na autenticação. Essa distinção foi demonstrada no raciocínio e no código atual.
- **Assistência recebida:** o mentor instalou Node compatível, bcrypt e seus tipos, diagnosticou o erro de instalação e substituiu o import incompatível por bcrypt. Também forneceu a integração que gera o hash e o salva. Portanto, esse trecho não comprova implementação independente pelo aluno; sua análise posterior demonstra compreensão da separação entre cadastro e verificação de credenciais. Consulta de sintaxe não é penalizada.
- **Ajuste de contrato:** o enunciado anterior pedia hashing do Adonis; foi adotado bcrypt diretamente com assistência. A alternativa atende ao objetivo pedagógico de persistir hash, mas não demonstra domínio do serviço de hashing do framework.
- **Conceitos demonstrados nesta etapa:** distinção entre senha recebida e valor persistido; preservação dos caracteres da senha; separação entre cadastro e autenticação; seleção de campos na resposta. Validação, persistência, normalização e unicidade foram reaplicadas, sem necessidade de novo exercício de CRUD.
- **Pendências verificadas:** resposta 201 não inclui o ID exigido; migration de password permite NULL, embora o cadastro atual exija senha; não foi apresentada evidência da comparação correta/incorreta com o hash recuperado do banco. O `console.error(error)` genérico merece revisão antes de considerar atendida a exigência de não registrar credenciais: não houve inspeção dos logs em cenários de falha. Marcações de conclusão no enunciado anterior não são prova de aceite.
- **Verificação:** typecheck da API executado nesta sessão e aprovado. Os testes encontrados cobrem apenas a rota inicial e conexão SQLite; não há testes de cadastro ou autenticação no material revisado. O teste isolado do bcrypt executado anteriormente pelo mentor confirmou a biblioteca, não o fluxo HTTP nem a persistência do cadastro. API e migrations não executadas nesta avaliação.

### Avaliação desta etapa

Notas restritas às evidências disponíveis, sem pressupor domínio completo ou atribuir ao aluno código fornecido pelo mentor.

| Dimensão | Avaliação | Evidência |
| --- | --- | --- |
| Autonomia | 7/10 | Identificou o papel inadequado do compare e fez ajustes posteriores; integração do hash recebeu implementação direta do mentor. |
| Raciocínio lógico | 8/10 | Distinguiu uma verificação de teste da responsabilidade do cadastro e do futuro login. |
| AdonisJS e TypeScript | 7/10 | Reaplicou schema e Lucid; compatibilidade do import e uso da biblioteca exigiram assistência. |
| Organização | 7,5/10 | Fluxo curto: validação, hash, persistência e resposta; comparação desnecessária removida. |
| Qualidade do código | 7/10 | Preserva senha e oculta hash; resposta ainda não cumpre integralmente o contrato. |
| Erros e casos de borda | 6,5/10 | Duplicidade tratada no código; falta comprovação dos cenários inválidos e revisão dos logs de erro. |
| Investigação | 7/10 | Trouxe o erro concreto de import e questionou a finalidade do compare; diagnóstico do ambiente foi conduzido pelo mentor. |
| Testes e confiabilidade | Não avaliados | Ausência de evidências de testes do aluno para os critérios desta história. |

- **Nota de evolução:** 7,5/10, síntese qualitativa, não média mecânica. Há compreensão suficiente para avançar ao uso das credenciais; ainda não há evidência de autonomia completa na integração nem de confiabilidade funcional.
- **Próximo objetivo:** login com emissão de token e falhas de autenticação, usando os usuários persistidos. A verificação da senha será aplicada a um problema novo, sem repetir cadastro. Exigir testes automatizados dos caminhos de sucesso e falha para trabalhar a lacuna recorrente de evidências.
- **Escopo posterior:** uso do token em rotas protegidas, identificação do usuário autenticado, logout e autorização serão histórias seguintes. Pendências antigas permanecem registradas; não exigir seu polimento integral para iniciar login.
