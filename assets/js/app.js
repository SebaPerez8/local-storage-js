// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event listeners

eventListeners();

function eventListeners() {
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', 
    agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', LocalStorageListo);
}





// Funciones 

// añadir tweet al formulario
function agregarTweet(e){
    e.preventDefault();
    // leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    // crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // crear el elemento y añadirlo al contenido de la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade boton al tweet
    li.appendChild(botonBorrar);
    // añade tweet a la lista
    listaTweets.appendChild(li);   

    // Añadir al Local Storage
    agregarTweetLocalStorage(tweet)
}


// Elimina tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
      e.target.parentElement.remove();
    }
    borrarTweetLocalStorage(e.target.parentElement.innerText)

}


// mostrar datos de local storage en la lista
function LocalStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
        // crear boton eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // crear el elemento y añadirlo al contenido de la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade boton al tweet
        li.appendChild(botonBorrar);
        // añade tweet a la lista
        listaTweets.appendChild(li);  
    });

}

// agregar tweet a Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage(); 
    // añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de string a arreglo para local storage
    localStorage.setItem('tweets',JSON.stringify(tweets));

}

// comprobar que haya elemento en local storage, retoena un array
function obtenerTweetsLocalStorage() {
    let tweets;
    // revisamos valores de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    } 
    return tweets;
}

//Eliminar tweet del Local Storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;

    // elimina la X de tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
        
    }) ;

   localStorage.setItem('tweets', JSON.stringify(tweets));
}