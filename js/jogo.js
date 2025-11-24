
const imagem = document.getElementById('capa')
const preco = document.getElementById('preco')
const desc = document.getElementById('desc')
const nome = document.getElementById('nome')
const perfil_review = document.getElementById('perfil_review')
const token = localStorage.getItem('token')
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const tabela = document.getElementById('reviews_tabela')

const payload = JSON.parse(atob(token.split('.')[1]));

function getThings(){
    console.log("payload.imagem =", payload.imagem);
    fetch(`http://localhost:3000/jogo/${id}`)
    .then(resp => resp.json())
    .then((dados)=>{
        console.log(dados.descricao, dados.nomeJogo )
        preco.innerHTML = dados.preco + '$'
        precoCompra = dados.preco
        desc.innerHTML = dados.descricao
        nome.innerHTML = dados.nomeJogo
        imagem.src = dados.capa
    })
    .catch((err)=>{
        console.log(err)
    })
    perfil_review.src = "http://localhost:3000" + payload.imagem
    fetch(`http://localhost:3000/review`,{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(resp => resp.json())
    .then((dados)=>{
        console.log(dados)
        dados.forEach((review) => {

            const card = document.createElement("div")
            card.classList.add("review-card")
    
            card.innerHTML = `
                <div class="review-user">
                    <img class="review-avatar" src="http://localhost:3000${review.cliente.imagem}">
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
    alert("voce quer continuuar com a compra?")
    e.preventDefault()

    valores = {
        idCliente: payload.codCliente,
        idJogo: id,
        DataCompra: new Date(),
        valorTotal : precoCompra
    }

    fetch('http://localhost:3000/compra',{
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
    fetch('http://localhost:3000/review',{
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

window.onload = getThings