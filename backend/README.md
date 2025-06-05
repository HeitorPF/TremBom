# BACKEND 

## 🛠 Rodando o servidor
1️⃣ Abra o primeiro terminal e navegue até a pasta do backend:
```sh
cd backend
```
2️⃣ Execute o comando para iniciar o servidor:
```sh
node app.js
```

No primeiro terminal (onde o servidor está rodando), veja os logs para verificar se as requisições foram processadas corretamente, que sao feitas pelos comandos a seguir:

3️⃣ No segundo terminal, envie requisições com curl:

### Para testar as rotas - CLIENTE

### 🟢 Inserir cliente
```sh
curl -X POST http://localhost:8000/inserir-cliente
```

### 🔴 Excluir cliente
```sh
curl -X DELETE http://localhost:8000/deletar-cliente
```

### 🟡 Atualizar cliente
```sh
curl -X PUT http://localhost:8000/atualizar-cliente
```

### 🔍 Consultar cliente

```sh
curl -X GET http://localhost:8000/consultar-cliente
```



### Para testar as rotas - RESTAURANTE

### 🟢 Inserir restaurante
```sh
curl -X POST http://localhost:8000/inserir-restaurante
```

### 🔴 Excluir restaurante
```sh
curl -X DELETE http://localhost:8000/deletar-restaurante
```

### 🟡 Atualizar restaurante
```sh
curl -X PUT http://localhost:8000/atualizar-restaurante
```

### 🔍 Consultar restaurante

```sh
curl -X GET http://localhost:8000/consultar-restaurante
```

O resultado da consulta é semelhante à:
```sh
Requisição recebida: GET /consultar-restaurante
{
  _id: new ObjectId('6838bfc7449940fb84196275'),
  restaurante_nome: 'Estação',
  horario_abertura: '10:00',
  horario_fechamento: '14:00'
}
```


### Para testar as rotas - PEDIDO

### 🟢 Inserir pedido
```sh
curl -X POST http://localhost:8000/inserir-pedido
```

### 🔴 Excluir pedido
```sh
curl -X DELETE http://localhost:8000/deletar-pedido
```

### 🟡 Atualizar pedido
```sh
curl -X PUT http://localhost:8000/atualizar-pedido
```

### 🔍 Consultar pedido

```sh
curl -X GET http://localhost:8000/consultar-pedido
```

O resultado é semelhante à :

```sh
Servidor rodando na porta 8000
Requisição recebida: GET /consultar-pedido
{
  _id: new ObjectId('68419b8be252d4e9ef64f827'),
  quantidade_itens: 40,
  pedido_total: 80,
  cliente_id: new ObjectId('68419b88e252d4e9ef64f826'),
  restaurante_id: new ObjectId('6838bfc7449940fb84196275')
}

```