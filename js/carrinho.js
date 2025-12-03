const cad = document.getElementById('cad')
const Login = document.getElementById('Login')



cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})

const user = document.getElementById('user')
try{
  const token = localStorage.getItem('token')
  const payload = JSON.parse(atob(token.split('.')[1]))
  console.log('esta logado')
  user.innerHTML = ""
  const userButton = document.createElement('button')
  userButton.classList.add('userPage')
  const imagem = document.createElement('img')
  imagem.classList.add('userImagem')
  imagem.src = `https://backjogo-production.up.railway.app{payload.imagem}`
  const username = document.createElement('div')
  username.innerHTML = payload.nome
  userButton.appendChild(imagem)
  userButton.appendChild(username)
  user.appendChild(userButton)
  userButton.addEventListener('click',(e)=>{
      window.location.href = "./Perfil.html"
  })
}
catch{
  console.log('nao esta logado')
}
    



function mandarPagina(id){
    window.location.href = `./jogo.html?id=${id}`
}



const tabela = document.getElementById('tabela')


function listar(){
    tabela.innerHTML = ""
    dados = JSON.parse(localStorage.getItem('produtos'))
    precoTotal = 0
    dados.forEach(produto => {
        const linha = document.createElement('tr')
        const colunas = ["nome","precoCompra"]

        colunas.forEach(campo => {
            linha.innerHTML += `<td>${produto[campo]}</td>`
            if (campo == "precoCompra"){
                precoTotal += produto[campo]
            }
        })
        tabela.appendChild(linha)
    })
    const linha = document.createElement('tr')
    linha.innerHTML = `<td>Preço Total</td> <td>${precoTotal}</td>`
    tabela.appendChild(linha)
}

const Limpar = document.getElementById('Limpar')
const Comprar = document.getElementById('Comprar')


Limpar.addEventListener('click',(e)=>{
    localStorage.removeItem('produtos')
})

Comprar.addEventListener('click', (e)=>{
    const produtos = JSON.parse(localStorage.getItem('produtos'))
    const body = {
        idCliente: payload.codCliente, 
        compras: produtos.map(p => ({
            idJogo: p.id,          
            preco: p.precoCompra
        }))
    };


    fetch('https://backjogo-production.up.railway.app/compra/carrinho',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(body)
    })
    .then((dados)=>{
        console.log(dados)
    })
    .catch((err)=>{
        console.log(err)
    })
})

window.onload = listar
