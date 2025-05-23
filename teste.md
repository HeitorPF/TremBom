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