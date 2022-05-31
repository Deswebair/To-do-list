// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevlo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta listo 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;


    // Validacion..
    if(tweet === ''){
        mostrarError('un mensaje no puede ir vacio')
        return; // evita que se ejecuten mas lineas
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Agregar al HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');


    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los Tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.lenght > 0) {
        tweets.forEach(tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear el HTML
            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}
// agregar los Tweets actuales a Localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

//Limpiar el HTML
function limpiarHTML(){
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}