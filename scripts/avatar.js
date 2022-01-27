import {url as endpoint} from "./url.js"

const pintar = document.querySelector('.card');

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
                    </div>
        `
    });
}

window.addEventListener('DOMContentLoaded', getPersonaje)

