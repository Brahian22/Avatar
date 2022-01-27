import {url as endpoint} from "./url.js"

const pintar = document.querySelector('.card');
const form = document.querySelector('.form-group')
const btnBuscar = document.getElementById('btnElemento')
const btnModificar = document.getElementById('btnModificar')


const getPersonaje = async () => {
    const resp = await fetch (endpoint)
    const data = await resp.json()

    data.forEach(element => {
        const {id, imagen, nombre, elemento, edad} = element
        pintar.innerHTML += `
        <img src="${imagen}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${nombre}</h5>
                        <p class="card-text">Elemento: ${elemento} </p>
                        <p class="card-text">Edad: ${edad}</p>
                        <button id=${id} class="btn btn-danger btn-sm">
                Borrar
            </button>
                    </div>
        `
    });
}

window.addEventListener('DOMContentLoaded', getPersonaje)


pintar.addEventListener('click', e => {
    const btnEliminar = e.target.classList.contains('btn-danger')

    if(btnEliminar){
        const id = e.target.id;
        fetch(endpoint + id,{
            method: 'DELETE'
        })
    }
})

const capturarDatos = () => {
    const imagen = document.getElementById('inputImagen').value;
    const nombre = document.getElementById('inputNombre').value;
    const elemento = document.getElementById('inputElemento').value;
    const edad = document.getElementById('inputEdad').value;

    const user = {
        imagen,
        nombre,
        elemento,
        edad
    }

    return user

}
form.addEventListener ('submit', async e => {
    e.preventDefault()

    const objeto = capturarDatos()

    await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
}) 

btnBuscar.addEventListener('click', async () => {
    const input = document.getElementById('inputElemento').value 

    const resp = await fetch(endpoint)
    const data = await resp.json()

    const buscado = data.find(u => u.elemento.toLocaleLowerCase()===input.
    toLocaleLowerCase())

    if(buscado !== undefined){
        const {imagen, id, nombre, edad} = buscado
        document.getElementById('inputImagen').value = imagen
        document.getElementById('inputNombre').value = nombre
        document.getElementById('inputEdad').value = edad
        document.getElementById('inputId').value = id

    } else{
        alert('Elemento no encontrado')
    }
    
})


btnModificar.addEventListener('click', ()=>{
    const dataModificar = capturarDatos()
    const {imagen, nombre, elemento, edad} = dataModificar

    if (imagen === "", nombre === "", elemento ==="", edad === "") {
        alert('Llenar todos los campos')
    }else {
        const id = document.getElementById('inputId').value 

        fetch (endpoint + id, {
            method: 'PUT',
            body: JSON.stringify(dataModificar),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    }
})