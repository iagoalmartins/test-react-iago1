# Documentação do Endpoint

Este endpoint é um exemplo

## Método

`GET /api/exemplo/{id}?search=...`

## Parâmetros de URL

- `id` (obrigatório)
- `search` (não obrigatório)

## Body

- `name` - string (obrigatório)
- `document` number (não obrigatório)

## Respostas

### Sucesso (200 OK)

Retorna um objeto JSON com os detalhes do usuário.

Exemplo de resposta:

```json
{
  "id": 123,
  "nome": "João da Silva",
  "email": "joao@example.com",
  "idade": 30,
  "cidade": "São Paulo"
}
```

## Erros Possíveis

- **404 Not Found**: Se o usuário com o ID especificado não for encontrado.
- **400 Bad Request**: Se o ID fornecido não for um número inteiro válido.
