const cad = document.getElementById('cad')
const Login = document.getElementById('Login')
const Cadastrar = document.getElementById('Cadastrar')

cad.addEventListener('click',(e)=>{
    window.location.href = "./html/cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./html/Login.html"
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
    