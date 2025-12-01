const cad = document.getElementById('cad')
const Login = document.getElementById('Login')
const token = localStorage.getItem('token')


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
const payload = JSON.parse(atob(token.split('.')[1]))
if(token){
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
