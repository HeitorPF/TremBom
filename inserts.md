```sh
//Collection cliente
db.cliente.insertMany([
  {nome: "Heitor", email:"heitor@gmail", senha: "123"},
  {nome: "Brena", email:"brena@gmail", senha: "123"},
  {nome: "Joao", email:"joao@gmail", senha: "123"}
])

//Collection restaurante
db.restaurante.insertMany([
  {restaurante_nome: "jacare", horario_abertura: "12:00", horario_fechamento: "20:30"},
  {restaurante_nome: "paranaze", horario_abertura: "11:00", horario_fechamento: "21:30"},
  {restaurante_nome: "pindamoiangaba", horario_abertura: "10:00", horario_fechamento: "20:30"}
])

//Collection pedido
db.pedido.insertOne(
    {quantidade_itens: 3, pedido_total: 50.00, cliente_id: ObjectId("683101dae1a5ecb8736cb80a"), restaurante_id: ObjectId("683101e6e1a5ecb8736cb80d")}
)

//Collection pagamento
db.pagamento.insertOne(
    {pago: false, valor: 55.00, data_pagamento: "21/05/2025", metodo_pagamento: "cartão", pedido_id: ObjectId("6831027db8f4b7256a3f7712")}
)
```