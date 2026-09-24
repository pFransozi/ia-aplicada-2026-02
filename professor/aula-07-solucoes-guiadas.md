# Aula 07 · Material do professor
## Raciocínio sob incerteza e sistema especialista probabilístico

> Material de apoio do professor. Não está vinculado à página dos estudantes.

## 1. Objetivo didático da aula

A aula deve deixar explícita a passagem entre dois mecanismos de inferência:

```text
Aula 06
fatos + regras
      ↓
conclusão

Aula 07
base de conhecimento probabilística + evidências
      ↓
motor de inferência
      ↓
probabilidades posteriores
      ↓
hipótese mais provável
```

O ponto central não é ensinar a fórmula de Bayes isoladamente. O estudante deve perceber que a probabilidade passa a fazer parte da representação do conhecimento e do processo de inferência.

Uma formulação útil em sala:

> Na aula anterior, a regra dizia quando uma conclusão poderia ser produzida. Agora temos situações em que a mesma evidência pode ser explicada por várias hipóteses. O sistema precisa comparar essas hipóteses.

## 2. Retomada inicial

Escreva no quadro:

```python
if timeout and pool_esgotado:
    conclusao = "falha_banco"
```

Pergunte:

1. Esse código aceita outra explicação para o timeout?
2. O que acontece se a rede também puder causar timeout?
3. Se uma evidência puder ter três causas diferentes, como o programa escolhe entre elas?

A ideia é chegar a:

```text
não queremos apenas verificar uma regra;
queremos comparar hipóteses.
```

## 3. Arquitetura do sistema probabilístico

Use quatro blocos:

```text
BASE DE CONHECIMENTO
priors + probabilidades condicionais
            ↓
EVIDÊNCIAS DO CASO
timeout, pool esgotado...
            ↓
MOTOR DE INFERÊNCIA
Bayes
            ↓
SAÍDA
posteriores + hipótese mais provável
```

Reforce que esse sistema ainda é baseado em conhecimento. O conhecimento apenas deixou de ser exclusivamente binário.

## 4. Exemplo resolvido 1 · Uma hipótese

Dados:

```text
H = falha no banco
E = timeout

P(H) = 0,10
P(E|H) = 0,80
P(E|¬H) = 0,20
```

### Condução guiada

Pergunte primeiro:

**Qual é a chance de falha no banco antes do timeout?**

Resposta: 10%.

Depois:

**Se realmente houver falha no banco, qual é a chance de timeout?**

Resposta: 80%.

Depois:

**Timeout também pode acontecer sem falha no banco?**

Resposta: sim, em 20% dos casos.

Monte a conta:

```text
numerador
= P(E|H) × P(H)
= 0,80 × 0,10
= 0,08
```

```text
denominador
= 0,08 + (0,20 × 0,90)
= 0,08 + 0,18
= 0,26
```

```text
P(H|E)
= 0,08 / 0,26
≈ 0,3077
≈ 30,8%
```

Interpretação a reforçar:

> O timeout aumentou a plausibilidade da hipótese, mas não transformou a hipótese em fato.

## 5. Exemplo resolvido 2 · Três hipóteses

Dados:

| Hipótese | Prior | P(timeout|H) |
|---|---:|---:|
| Falha no banco | 0,10 | 0,80 |
| Falha de rede | 0,30 | 0,60 |
| Sobrecarga da aplicação | 0,60 | 0,40 |

### Passo 1 · Calcular os scores

```text
Banco
0,10 × 0,80 = 0,080

Rede
0,30 × 0,60 = 0,180

Sobrecarga
0,60 × 0,40 = 0,240
```

### Passo 2 · Somar

```text
0,080 + 0,180 + 0,240 = 0,500
```

### Passo 3 · Normalizar

```text
Banco
0,080 / 0,500 = 0,16 = 16%

Rede
0,180 / 0,500 = 0,36 = 36%

Sobrecarga
0,240 / 0,500 = 0,48 = 48%
```

### Passo 4 · Fazer a predição

```text
Predição = sobrecarga da aplicação
```

Reforce:

> A função `max()` não faz inferência probabilística. Ela apenas escolhe, entre os posteriores já calculados, a hipótese com maior valor.

## 6. Leitura guiada do primeiro código

Trecho:

```python
for hipotese, dados in base.items():
    prior = dados["prior"]
    p_e_dado_h = dados["evidencias"][evidencia]
    scores[hipotese] = prior * p_e_dado_h
```

Explique linha a linha:

- `for hipotese...`: percorre cada explicação possível;
- `prior`: recupera a probabilidade inicial da hipótese;
- `p_e_dado_h`: recupera quanto a evidência é esperada naquela hipótese;
- multiplicação: calcula um valor proporcional ao posterior.

Depois:

```python
total = sum(scores.values())
```

Explique que os scores ainda não somam 1.

Depois:

```python
posteriores = {
    hipotese: score / total
    for hipotese, score in scores.items()
}
```

Explique que a normalização transforma os scores em uma distribuição de probabilidades.

Finalmente:

```python
predicao = max(posteriores, key=posteriores.get)
```

Explique que aqui ocorre a escolha da hipótese mais provável.

## 7. Exemplo resolvido 3 · Nova evidência

Acrescentar:

```text
E2 = pool esgotado
```

Probabilidades:

| Hipótese | P(timeout|H) | P(pool|H) |
|---|---:|---:|
| Falha no banco | 0,80 | 0,90 |
| Falha de rede | 0,60 | 0,05 |
| Sobrecarga da aplicação | 0,40 | 0,25 |

Assumindo independência condicional entre as evidências dada cada hipótese:

```text
score(H) = P(H) × P(E1|H) × P(E2|H)
```

### Banco

```text
0,10 × 0,80 × 0,90
= 0,072
```

### Rede

```text
0,30 × 0,60 × 0,05
= 0,009
```

### Sobrecarga

```text
0,60 × 0,40 × 0,25
= 0,060
```

Total:

```text
0,072 + 0,009 + 0,060 = 0,141
```

Posteriores:

```text
Banco
0,072 / 0,141 ≈ 51,1%

Rede
0,009 / 0,141 ≈ 6,4%

Sobrecarga
0,060 / 0,141 ≈ 42,6%
```

Predição:

```text
falha_banco
```

Ponto didático:

> Uma nova evidência não apenas aumenta ou diminui um número. Ela pode alterar qual hipótese é a mais provável.

## 8. Gabarito · Exercício 1

Dados:

```text
P(H)=0,15
P(E|H)=0,75
P(E|¬H)=0,25
```

### Item 1

Prior:

```text
P(H)=0,15 = 15%
```

### Item 2

```text
P(E|H)=0,75
```

Interpretação:

> Se o serviço de cache estiver indisponível, existe 75% de probabilidade de ocorrer erro 504.

### Item 3

```text
P(H|E)
= (0,75 × 0,15) /
  [(0,75 × 0,15) + (0,25 × 0,85)]
```

Numerador:

```text
0,75 × 0,15 = 0,1125
```

Outro termo do denominador:

```text
0,25 × 0,85 = 0,2125
```

Denominador:

```text
0,1125 + 0,2125 = 0,325
```

Posterior:

```text
0,1125 / 0,325
≈ 0,3462
≈ 34,6%
```

### Item 4

A confiança aumentou de 15% para aproximadamente 34,6%.

A evidência favorece a hipótese, mas a hipótese ainda está longe de ser certa.

## 9. Gabarito · Exercício 2

Dados:

| Hipótese | Prior | P(latência alta|H) |
|---|---:|---:|
| Banco | 0,20 | 0,70 |
| Rede | 0,30 | 0,60 |
| Aplicação | 0,50 | 0,20 |

### Item 1 · Scores

```text
Banco
0,20 × 0,70 = 0,14

Rede
0,30 × 0,60 = 0,18

Aplicação
0,50 × 0,20 = 0,10
```

### Item 2 · Soma

```text
0,14 + 0,18 + 0,10 = 0,42
```

### Item 3 · Normalização

```text
Banco
0,14 / 0,42 = 0,3333 = 33,3%

Rede
0,18 / 0,42 = 0,4286 = 42,9%

Aplicação
0,10 / 0,42 = 0,2381 = 23,8%
```

### Item 4 · Predição

```text
falha de rede
```

### Item 5 · Discussão

A aplicação tinha o maior prior, 50%, mas a evidência de latência alta era muito menos provável nessa hipótese, apenas 20%.

A falha de rede tinha prior menor, 30%, mas a evidência era muito mais compatível com ela, 60%.

A atualização combina os dois componentes:

```text
o que acreditávamos antes
+
o quanto a evidência é compatível com cada hipótese
```

## 10. Gabarito · Exercício 3

Código completo:

```python
def inferir(base, evidencias_observadas):
    scores = {}

    for hipotese, dados in base.items():
        score = dados["prior"]

        for evidencia in evidencias_observadas:
            score *= dados["evidencias"][evidencia]

        scores[hipotese] = score

    total = sum(scores.values())

    posteriores = {
        hipotese: score / total
        for hipotese, score in scores.items()
    }

    predicao = max(posteriores, key=posteriores.get)

    return posteriores, predicao
```

Relação conceitual:

```text
dados["prior"]
→ conhecimento inicial sobre H

dados["evidencias"][evidencia]
→ P(E|H)

score
→ valor proporcional a P(H|E1,...,En)

sum(scores.values())
→ normalização

score / total
→ posterior

max(...)
→ predição
```

## 11. Gabarito · Exercício 4

### Item 1

“Tempo de resposta muito alto” e “timeout” podem ser dependentes porque o timeout pode ocorrer justamente como consequência de uma latência que ultrapassou um limite.

### Item 2

Se o modelo tratá-las como evidências independentes, ele poderá contar praticamente a mesma informação duas vezes. Isso pode produzir posteriores excessivamente altos ou baixos.

### Item 3

É necessário avaliar se, depois de fixarmos uma hipótese, conhecer uma das evidências ainda altera a probabilidade da outra.

A pergunta útil é:

```text
Sabendo a causa, timeout ainda fornece informação
sobre latência alta, ou vice-versa?
```

Se sim, a hipótese de independência condicional não é apropriada para esse par de evidências.

## 12. Pontos que merecem reforço

### Predição não é certeza

A saída:

```text
falha_banco = 51,1%
```

não significa:

```text
o banco certamente falhou
```

Significa:

```text
dentro das hipóteses e probabilidades representadas,
falha_banco recebeu o maior suporte das evidências.
```

### Bayes não cria conhecimento

O motor de inferência depende de uma base de conhecimento adequada.

Se os priors estiverem errados, ou se as probabilidades condicionais não representarem o domínio, o resultado também será inadequado.

### Uma hipótese ausente não pode ser descoberta

Se o sistema conhece apenas:

```text
banco
rede
sobrecarga
```

mas o problema real for DNS, o sistema não criará espontaneamente a hipótese “DNS”.

Ele redistribuirá a probabilidade apenas entre as hipóteses disponíveis.

### Sistema probabilístico não é automaticamente aprendizado de máquina

Se os valores foram definidos por especialistas ou previamente estimados, o programa está fazendo inferência sobre conhecimento já representado.

Se os parâmetros forem aprendidos automaticamente a partir de dados, então existe também um processo de aprendizado.

## 13. Fechamento sugerido no quadro

```text
SISTEMA ESPECIALISTA PROBABILÍSTICO

conhecimento do domínio
        ↓
priors + P(evidência | hipótese)
        ↓
evidências observadas
        ↓
Bayes / normalização
        ↓
P(hipótese | evidências)
        ↓
hipótese mais provável
```

Pergunta final para a turma:

> Qual parte desse sistema corresponde ao conhecimento e qual parte corresponde ao raciocínio?

Resposta esperada:

- a base com priors e probabilidades condicionais representa o conhecimento;
- o algoritmo que atualiza e normaliza representa o mecanismo de inferência.
