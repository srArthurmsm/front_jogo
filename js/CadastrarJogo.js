const cad = document.getElementById('cad')
const Login = document.getElementById('Login')



cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})
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
    


const formCadastro = document.getElementById('formCadastro')
const res = document.getElementById('res')


function opGenero(){
  const select = document.getElementById("genero")
  fetch(`https://backjogo-production.up.railway.app/genero`,{
    headers: {
        "Authorization": "Bearer " + token
    }
  })
  .then(resp => resp.json())
  .then((dados)=>{
    dados.forEach(genero => {
      const opcao = document.createElement('option')
      opcao.value = genero.codGenero;
      opcao.textContent = genero.nomeGenero;
      console.log(genero)
      select.appendChild(opcao)
    });
  })
  .catch((err)=>{
    console.log(err)
  })
}

window.onload = opGenero

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

const addGenero = document.getElementById('addGenero')

addGenero.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href = "./criarGenero.html"
})