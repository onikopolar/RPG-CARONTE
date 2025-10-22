#!/bin/bash

echo "Testando API com diferentes cenarios:"

echo "1. Teste com todos os campos:"
curl -X POST https://rpg-caronte-oniko-b4b7ee4a5e87.herokuapp.com/api/character \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste-1","player":"Jogador Teste","description":"Descricao teste"}' \
  -w " Status: %{http_code}\n"

echo -e "\n2. Teste SEM campo player (deve usar padrao):"
curl -X POST https://rpg-caronte-oniko-b4b7ee4a5e87.herokuapp.com/api/character \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste-2","description":"Sem player"}' \
  -w " Status: %{http_code}\n"

echo -e "\n3. Listar personagens:"
curl -s https://rpg-caronte-oniko-b4b7ee4a5e87.herokuapp.com/api/character | python3 -m json.tool
