const cad = document.getElementById('cad')
const Login = document.getElementById('Login')
const logOut = document.getElementById('logOut')
const token = localStorage.getItem('token')
const tabela = document.getElementById('biblioteca_table')


logOut.addEventListener('click',(e)=>{
    localStorage.removeItem('token')
    window.location.href = "../index.html"
})

cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})

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

function setThingUp(){
    const imagem = document.getElementById('UserImagemPrincipal')
    imagem.src = `https://backjogo-production.up.railway.app{payload.imagem}`
    const userName = document.getElementById('userName')
    userName.innerHTML = payload.nome
    const userDate = document.getElementById('userDate')
    userDate.innerHTML = new Date(payload.DataNascimento).toLocaleDateString()

    fetch(`https://backjogo-production.up.railway.app/compra`,{
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(resp => resp.json())
    .then((dados)=>{
        console.log(dados)
        console.log(payload.codCliente)
        dados.filter(compra => compra.compra.idCliente == payload.codCliente).forEach((compra) => {

            const card = document.createElement("div")
            card.classList.add("biblioteca-card")

            console.log(compra.jogo.capa)
            card.innerHTML = `
                <div class="biblioteca-user">
                    <img class="review-avatar" src="https://backjogo-production.up.railway.app{compra.jogo.capa}">
                </div>
            `
            tabela.appendChild(card)
        })
    })
}

setThingUp()