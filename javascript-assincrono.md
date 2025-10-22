# JavaScript Assíncrono
## Resumo de `fetch`, `async/await` e `try/catch`

### 1. `fetch` (O Pedido)
- ***O que é?***
  É a função que "faz o pedido" na web. É ela que vai na API buscar ou enviar dados.
- ***Como funciona?***
  Você liga para a pizzaria (fetch). Você não fica mudo no telefone esperando a pizza ficar pronta; você desliga e espera eles te retornarem. O fetch te devolve uma "Promessa" `(Promise)` de que a resposta (a pizza) chegará.
````js
// Apenas "fazer o pedido"
fetch('https://api.pizzaria.com/pedidos');
````

### 2. `async` (O "Modo de Espera")
- ***O que é?***
   Uma palavra-chave que você coloca antes de function.
- ***O que faz?***
   Ela "avisa" que dentro daquela função, você talvez precise "esperar" por algo (como a pizza). Ela habilita o uso do `await`.
````js
async function fazerMeuJantar() {
// Agora eu posso usar 'await' aqui dentro
}
````

### 3. `await` (O Ato de Esperar)
- ***O que é?***
   A palavra-chave que "pausa" a função até a "Promessa" (o fetch) ser resolvida.
- ***O que faz?***
   Em vez de você ter que checar a porta a cada minuto, o await faz você "sentar no sofá" e a função só continua depois que o entregador (fetch) chega com a resposta. Ele "desempacota" a Promessa para você.
````js
async function fazerMeuJantar() {
  // Pausa a função AQUI até o 'fetch' terminar
  const response = await fetch('https://api.pizzaria.com/pedidos');

  // Quando a resposta chega, "despausa" e continua
  const data = await response.json(); // Pausa de novo para processar o JSON
  console.log(data); // A pizza (dados) chegou!
}
````

### 4. `try` (A Tentativa)
- ***O que é?***
  Um bloco de código que "monitora" erros.
- ***O que faz?***
  Você coloca o código "arriscado" (o pedido da pizza, que pode dar errado) dentro dele. Ele "tenta" (try) executar aquele código.
````js
try {
  // Tenta fazer o pedido
  const response = await fetch('https://api.pizzaria.com/pedidos');
  const data = await response.json();
}
````

### 5. `catch` (O Plano B)
- ***O que é?***
 O bloco que "pega" (catch) o erro, caso o try falhe.
- ***O que faz?***
  Se algo der errado no try (ex: a pizzaria está fechada, a rede caiu, o endereço está errado), o código pula imediatamente para o catch, e a variável error contém os detalhes da falha. Isso evita que seu app "quebre".
````js
catch (error) {
  // O 'try' falhou. O 'error' diz o porquê.
  console.error('O pedido deu errado:', error);
  // Plano B: pedir um sanduíche
}
````

### Exemplo completo, unindo tudo:
````js
// 1. 'async' habilita o "modo de espera"
async function buscarDadosDaAPI() {
  
  // 2. 'try' monitora o código arriscado
  try {
    console.log('Iniciando o pedido...');
    
    // 3. 'fetch' faz o pedido
    // 4. 'await' pausa a função até a resposta do fetch chegar
    const response = await fetch('https://api.github.com/users/google');

    // 'await' pausa de novo para processar o JSON
    const data = await response.json();

    console.log('Pedido concluído:', data.name); // Ex: "Google"

  } 
  // 5. 'catch' é o plano B se o 'try' falhar
  catch (error) {
    console.error('Ocorreu um erro ao buscar os dados:', error);
  }
}

// Chama a função
buscarDadosDaAPI();
````

