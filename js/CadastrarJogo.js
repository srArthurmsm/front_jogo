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
    


const formCadastro = document.getElementById('formCadastro')
const res = document.getElementById('res')


function addGenero(){
  const select = document.getElementById("genero")
  fetch(`https://backjogo-production.up.railway.app/genero`,{
    headers: {
        "Authorization": "Bearer " + token
    }
  })
  .then(resp => resp.json())
  .then((dados)=>{
    dados.array.forEach(genero => {
      const opcao = `<option value="${genero.codGenero}">${genero.nomeGenero}</option>`
      select.appendChild(opcao)
    });
  })
  .catch((err)=>{
    console.log(err)
  })
}

window.onload = addGenero

formCadastro.addEventListener('submit', (e) => {
    e.preventDefault()
    
      const form = e.target
      const formData = new FormData(form)
  
      for (let [key, value] of formData.entries()) {
        console.log(key, value)
      }
      fetch('https://backjogo-production.up.railway.app/jogo', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
      })
      .then(resp => resp.json())
      .then((dados)=>{
        res.innerHTML = dados.message
      })
      .catch((dados)=>{
        console.error(dados)
        res.innerHTML = 'Erro ao cadastrar o usuário.'
      })
  })