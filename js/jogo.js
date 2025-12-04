const cad = document.getElementById('cad')
const Login = document.getElementById('Login')

cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})

const imagem = document.getElementById('capa')
const preco = document.getElementById('preco')
const desc = document.getElementById('desc')
const nome = document.getElementById('nome')
const perfil_review = document.getElementById('perfil_review')
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const tabela = document.getElementById('reviews_tabela')


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

function getThings(){
    console.log("payload.imagem =", payload.imagem);
    fetch(`https://backjogo-production.up.railway.app/jogo/${id}`)
    .then(resp => resp.json())
    .then((dados)=>{
        console.log(dados.descricao, dados.nomeJogo )
        preco.innerHTML = dados.preco + '$'
        precoCompra = dados.preco
        desc.innerHTML = dados.descricao
        nome.innerHTML = dados.nomeJogo
        imagem.src = `https://backjogo-production.up.railway.app${dados.capa}`
    })
    .catch((err)=>{
        console.log(err)
    })
    perfil_review.src = "https://backjogo-production.up.railway.app" + payload.imagem
    fetch(`https://backjogo-production.up.railway.app/review`,{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(resp => resp.json())
    .then((dados)=>{
        console.log(dados)
        dados.filter(review => review.idJogo == id).forEach((review) => {

            const card = document.createElement("div")
            card.classList.add("review-card")
    
            card.innerHTML = `
                <div class="review-user">
                    <img class="review-avatar" src="https://backjogo-production.up.railway.app${review.cliente.imagem}">
                    <div>
                        <h3 class="review-name">${review.cliente.nome}</h3>
                        <p class="review-date">${new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
    
                <div class="review-content">
                    <p>${review.Conteudo}</p>
                </div>
            `
            tabela.appendChild(card)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

const comprar = document.getElementById('comprar')
const carrinho = document.getElementById('carrinho')

comprar.addEventListener('click',(e)=>{
    alert("voce quer continuar com a compra?")
    e.preventDefault()

    valores = {
        idCliente: payload.codCliente,
        idJogo: id,
        DataCompra: new Date(),
        valorTotal : precoCompra
    }

    fetch('https://backjogo-production.up.railway.app/compra',{
        method: 'POST',
        body: JSON.stringify(valores),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    })
    .then((dados)=>{
        console.log(dados)
    })
    .catch((err)=>{
        console.log(err)
    })
})


carrinho.addEventListener('click',(e)=>{

    adicionarProduto()
})



const enviar = document.getElementById('enviar')

enviar.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log(payload.codCliente);
    console.log(id);
    console.log(document.getElementById('review_nota').value);
    valores = {
        idCliente: payload.codCliente,
        idJogo: id,
        Conteudo: document.getElementById('review_nota').value
    }
    fetch('https://backjogo-production.up.railway.app/review',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(valores)
    })
    .then((dados)=>{
        console.log(dados)
    })
    .catch((err)=>{
        console.log(err)
    })
})


let produtos = JSON.parse(localStorage.getItem('produtos')) || []


function adicionarProduto() {
    fetch(`https://backjogo-production.up.railway.app/jogo/${id}`)
        .then(resp => resp.json())
        .then((dados) => {
            const precoCompra = dados.preco;
            const nome = dados.nomeJogo;

            const produto = { nome, precoCompra, id };
            produtos.push(produto);

            localStorage.setItem('produtos', JSON.stringify(produtos));

            alert(`${nome} adicionado ao carrinho!`);
        })
        .catch((err) => {
            console.log(err);
        });
}
window.onload = getThings