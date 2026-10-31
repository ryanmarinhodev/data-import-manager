# Verificação — Status de pedidos — 30/10/2026

**Registro histórico:** os resultados abaixo são anteriores à correção voluntária da resposta. Depois, o controller passou a retornar o status da instância atualizada; essa correção foi revisada no código e passou no typecheck, sem repetir estes testes HTTP. Ver atualização no acompanhamento.

Verificação executada pelo mentor sobre a implementação atual, sem corrigir o código. API em processo separado e SQLite temporário criado pelas migrations do projeto. Typecheck aprovado. Nenhum dado do banco de desenvolvimento foi usado ou alterado. Estes testes de revisão não substituem o teste automatizado solicitado como entrega do aluno.

| Caso | HTTP observado | Status na resposta | Status no banco | Registro inteiro preservado? |
|---|---:|---|---|---|
| pendente_confirmado | 200 | pendente | confirmado | Não |
| pendente_cancelado | 200 | pendente | cancelado | Não |
| confirmado_cancelado | 200 | confirmado | cancelado | Não |
| cancelado_confirmado | 409 | Sem data | cancelado | Sim |
| repete_cancelado | 200 | Sem data | cancelado | Sim |
| repete_confirmado | 200 | confirmado | confirmado | Sim |
| destino_pendente | 200 | confirmado | pendente | Não |
| status_invalido | 422 | Sem data | pendente | Sim |
| status_ausente | 422 | Sem data | pendente | Sim |
| inexistente | 404 | Sem data | pendente | Sim |
| outros_campos | 200 | pendente | confirmado | Não |

Em todos os casos, cliente, descrição, preço e data de criação foram preservados. Nas duas repetições e nas rejeições observadas, a data de atualização também permaneceu intacta.

**Divergências do contrato:** destino `pendente` aceito indevidamente; respostas de mudanças efetivas contêm o status anterior; repetição de `cancelado` não retorna ID e status. O tratamento de confirmado repetido preserva o registro na versão instalada do Lucid: não foi considerada falha de idempotência.

**Limites:** testes sequenciais, sem avaliação de concorrência, que está fora do escopo. O repositório contém apenas o teste funcional hello_world; não foi encontrado teste automatizado de transição de status nem uma tabela de transições entregue separadamente. O aluno relatou validação manual.
