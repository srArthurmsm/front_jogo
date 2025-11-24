const cad = document.getElementById('cad')
const Login = document.getElementById('Login')

cad.addEventListener('click',(e)=>{
    window.location.href = "./cadastrar.html"
})

Login.addEventListener('click',(e)=>{
    window.location.href = "./Login.html"
})



const Loginbtn = document.getElementById('Loginbtn')
const res = document.getElementById('res')



Loginbtn.addEventListener('click',(e)=>{
    valores = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }
    console.log(valores)
    fetch(`http://localhost:3000/login`,{
        headers: {
            'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(valores)
    })
    .then(resp => resp.json())
    .then((dados)=>{
        res.innerHTML = dados.message
        localStorage.setItem('token', dados.token)
    })
    .catch((err)=>{
        res.innerHTML = err.message
    })
})