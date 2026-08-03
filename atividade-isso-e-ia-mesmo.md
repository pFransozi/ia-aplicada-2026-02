# Isso é IA mesmo?

## Dinâmica em grupos

Para cada caso, classifique a solução e justifique pelo mecanismo de funcionamento. Em vários casos, a resposta correta é **depende da implementação**.

## Casos

### Caso 1

Um programa renomeia arquivos usando o padrão ano-mês-número.

**Análise sugerida:** automação convencional. A transformação é explícita e determinística; não exige inferência ou aprendizado.

### Caso 2

Um sistema concede desconto quando o cliente tem cinco compras e nenhuma parcela atrasada.

**Análise sugerida:** sistema baseado em regras. A decisão foi descrita diretamente por condições.

### Caso 3

Um filtro aprende, a partir de mensagens anteriores, a identificar spam.

**Análise sugerida:** IA baseada em aprendizado. O sistema estima padrões a partir de exemplos e deve ser validado em mensagens não utilizadas no treinamento.

### Caso 4

Um aplicativo encontra a rota de menor custo entre diferentes cidades.

**Análise sugerida:** depende. Pode usar um algoritmo clássico de busca e otimização. Ele pertence ao repertório da IA, mas não necessariamente aprende com dados.

### Caso 5

Um chatbot conduz o usuário por perguntas e respostas previamente cadastradas.

**Análise sugerida:** pode ser apenas uma árvore de decisão. A aparência conversacional não garante o uso de IA.

### Caso 6

Um sistema recomenda candidatos com base em decisões históricas de contratação.

**Análise sugerida:** possivelmente IA, mas a pertinência deve ser questionada. Dados históricos podem reproduzir vieses e a decisão exige critérios, auditoria e supervisão humana.

## Matriz de análise do grupo

| Critério | Pergunta orientadora |
| --- | --- |
| Categoria principal | Automação, regras, IA ou híbrida? |
| Mecanismo | Como a entrada é transformada em saída? |
| Informação faltante | O que precisamos saber sobre a implementação? |
| Alternativa simples | Uma regra ou algoritmo convencional seria suficiente? |
| Risco | Qual é o principal modo de falha ou impacto? |
| Validação | Como saberemos se a solução funciona? |
