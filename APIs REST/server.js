const express = require('express');
const app = express();
const data = require('./data.json'); // Importando os dados do arquivo JSON

// resource = objeto/identidade
// CRUD = Create, Read, Update, Delete
// REST = Representational State Transfer
// RESTful API = API que segue os princípios do REST 

// VERBOS HTTP
// GET - Ler (Read  - Obter dados de um recurso ou coleção de resource)
// POST - Criar (Create - Enviar dados para criar um novo resource)
// PUT - Atualizar (Update - Enviar dados para atualizar um resource existente)
// DELETE - Deletar (Delete - Deletar um resource existente)

// http://localhost:3000/clients
// clients = nome do meu resource
// essa url é o endpoint da minha API, alcança o resource clients

app.use(express.json()); // Middleware para analisar o corpo da requisição como JSON


app.get("/clients", function(request, response) {
    // CORRIGIDO: trocamos 'res' por 'response' para combinar com o nome do parâmetro da função
    res.json(data); // Retorna os dados do arquivo JSON como resposta

});

app.get("/clients/:id", function(req, res) { 
  
  const {id} = req.params; // Extrai o parâmetro 'id' da query string
  // CORRIGIDO: trocamos 'request' por 'req' e '
  const client = data.find(cli => cli.id === Number(id)); // Encontra o cliente com o ID correspondente
  
  if (!client) return res.status(204).json({ error: "Client not found" });
  res.json(client); // Retorna o cliente encontrado como resposta
});
app.post("/clients", function(req, res){
  const { name, email } = req.body; // Extrai os dados do corpo da requisição

//salvar

res.json({name, email}); // Retorna os dados recebidos como resposta  
});

app.put("/clients/:id", function(req, res) {

  const {id} = req.params; 

  const client = data.find(cli => cli.id === Number(id)); // Encontra o cliente com o ID correspondente

    if (!client) return res.status(204).json({ error: "Client not found"}); // Se o cliente não for encontrado, retorna um erro 204
  
  
  const { name } = req.body;
  
  
  client.name = name; // Atualiza o nome do cliente com o novo valor
  
  
  
  res.json(client);



});

app.delete("/clients/:id", function(req, res) {

const {id} = req.params; // Extrai o parâmetro 'id' da URL
const clientFiltered = data.filter(cli => cli.id !== Number(id)); // Filtra os clientes, removendo o cliente com o ID correspondente

res.json(clientFiltered); // Retorna a lista de clientes filtrada como resposta

});





// https://jsonplaceholder.typicode.com/users

// CORRIGIDO: As linhas abaixo foram comentadas porque ainda não têm uma função (handler).
// Você poderá descomentá-las uma a uma quando for criar a lógica para cada uma.
// app.get("/clients/:id*")
// app.post("/clients")
// app.put("/clients/:id*")
// app.delete("/clients/:id*")

// boa prática: não usar / no final do endpoint
// se for usar no plural clients, usar sempre no plural
// se for usar no singular client, usar sempre no singular

// status de reposta
// 200 - OK (Requisição bem sucedida)
// 201 - Created (Recurso criado com sucesso)
// 204 - No Content (Recurso deletado com sucesso, sem conteúdo na resposta)
// 400 - Bad Request (Requisição inválida)
// 404 - Not Found (Recurso não encontrado)
// 500 - Internal Server Error (Erro interno no servidor)
// 401 - Unauthorized (Não autorizado)
// 403 - Forbidden (Proibido, acesso negado)
// 422 - Unprocessable Entity (Entidade não processável, geralmente usado para validação de dados)
// 304 - Not Modified (Recurso não modificado, usado com cache)
// 429 - Too Many Requests (Muitas requisições, limite excedido)
// 5xx - Erros do servidor (500, 501, 502, 503, etc.)
// 4xx - Erros do cliente (400, 401, 403, 404, etc.)
// 3xx - Redirecionamento (301, 302, 304, etc.)
// 1xx - Informativo (100, 101, etc.)
// 2xx - Sucesso (200, 201, 204, etc.)



app.listen(3000, function() {
  console.log('Server is running');
});