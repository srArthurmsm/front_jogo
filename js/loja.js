const cad = document.getElementById('cad')
const Login = document.getElementById('Login')


cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})



function mandarPagina(id){
    window.location.href = `./jogo.html?id=${id}`
}

const user = document.getElementById('user')
const token = localStorage.getItem('token')
let payload = null

try {
  payload = JSON.parse(atob(token.split('.')[1]))
  user.innerHTML = ""
  const userButton = document.createElement('button')
  userButton.classList.add('userPage')
  const imagem = document.createElement('img')
  imagem.classList.add('userImagem')
  imagem.src = `https://backjogo-production.up.railway.app${payload.imagem}`
  const username = document.createElement('div')
  username.innerHTML = payload.nome
  userButton.appendChild(imagem)
  userButton.appendChild(username)
  user.appendChild(userButton)
  userButton.addEventListener('click',(e)=>{
      window.location.href = "./Perfil.html"
  })
  console.log('esta logado')

} catch(e) {
  console.log('nao esta logado', e)
}
    

const tabela = document.getElementById('tabela')


function listar(){
    if(payload.rank == "DEV"){
        document.getElementById("criar").disabled = false;
    }

    fetch('https://backjogo-production.up.railway.app/jogo')
    .then(resp => resp.json())
    .then((dados)=>{
        dados.forEach(produto => {
            const linha = document.createElement('tr')
            const colunas = ["nomeJogo","descricao", "preco"]

            colunas.forEach(campo => {
                linha.innerHTML += `<td>${produto[campo]}</td>`
            })
            linha.innerHTML += `<td><button onclick="mandarPagina(${produto.codJogo})">Comprar</button></td>`
            tabela.appendChild(linha)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}


window.onload = listar


const criar = document.getElementById('criar')


criar.addEventListener('click',(e)=>{
    window.location.href = './criarJogo.html'
})


const btnsearch = document.getElementById('btnsearch');

btnsearch.addEventListener('click', (e) => {
    e.preventDefault();
    const originalText = btnsearch.textContent;
    btnsearch.textContent = 'Buscando...';
    btnsearch.disabled = true;
    
    const search = document.getElementById('search').value.toLowerCase();
    const categoria = document.getElementById('categoria').value.toLowerCase();

    // Supondo que 'tabela' é uma referência a um elemento table/tbody
    const tabela = document.getElementById('tabela'); // Adicione esta linha
    
    tabela.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    
    fetch('https://backjogo-production.up.railway.app/jogo')
        .then(resp => resp.json())
        .then((dados) => {
            // Limpar mensagem de carregamento
            tabela.innerHTML = '';
            
            // Filtragem dos produtos
            const produtosFiltrados = dados.filter(produto => {
                const matchCategoria = categoria === '' || 
                                     produto.categoria.toLowerCase() === categoria;
                const matchSearch = search === '' || 
                                   produto.nomeJogo.toLowerCase().includes(search);
                return matchCategoria && matchSearch;
            });
            
            // Verificar se há resultados
            if (produtosFiltrados.length === 0) {
                tabela.innerHTML = '<tr><td colspan="4">Nenhum produto encontrado</td></tr>';
            } else {
                // Renderizar os produtos filtrados
                produtosFiltrados.forEach(produto => {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                        <td>${produto.nomeJogo}</td>
                        <td>${produto.descricao}</td>
                        <td>R$ ${produto.preco}</td>
                        <td><button onclick="mandarPagina(${produto.codJogo})">Comprar</button></td>
                    `;
                    tabela.appendChild(linha);
                });
            }
        })
        .catch((err) => {
            console.error('Erro na busca:', err);
            tabela.innerHTML = `<tr><td colspan="4">Erro ao carregar produtos: ${err.message}</td></tr>`;
        })
        .finally(() => {
            btnsearch.textContent = originalText;
            btnsearch.disabled = false;
        });
});