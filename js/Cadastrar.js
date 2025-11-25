const cad = document.getElementById('cad')
const Login = document.getElementById('Login')

cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})



const formCadastro = document.getElementById('formCadastro')
const res = document.getElementById('res')



formCadastro.addEventListener('submit', (e) => {
  e.preventDefault()
  
    const form = e.target
    const formData = new FormData(form)

    for (let [key, value] of formData.entries()) {
      console.log(key, value)
    }
    fetch('http://backjogo-production.up.railway.app/cliente', {
      method: 'POST',
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
