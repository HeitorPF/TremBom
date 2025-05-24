# Exemplos de Consultas MongoDB

- Exemplos práticos de como realizar operações de busca no banco de dados do TremBom utilizando a shell do MongoDB. Essas consultas ilustram como interagir com as coleções de clientes, restaurantes, pedidos e pagamentos para recuperar informações cruciais para o funcionamento da plataforma.
```sh
// Busca cliente pelo email
db.cliente.findOne({ email: "heitor@gmail" })

// Busca pedido feito pelo cliente
db.pedido.find({cliente_id: ObjectId("683101dae1a5ecb8736cb80a")})

// Busca restaurante pelo nome
db.restaurante.findOne({restaurante_nome: "jacare"})

// Busca pedido aceito pelo restaurante
db.pedido.find({restaurante_id: ObjectId("683101e6e1a5ecb8736cb80d")})

// Busca pedido pelo Id
db.pedido.findOne({_id: ObjectId("6831027db8f4b7256a3f7712")})

// Busca pagamento pelo pedido
db.pagamento.findOne({pedido_id: ObjectId("6831027db8f4b7256a3f7712")})
```
