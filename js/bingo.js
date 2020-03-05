/** Array donde se guardan los distintos jugadores posicion 0 es el jugador humano */
var jugadores = [];
/** Precio de cada carton */
var precio;
/**cantidad de jugadores seleccionados */
var njugadores;
/** velocidad de juego ms/bola */
var velocidad;
/** intervalo que saca las bolas */
var intervalo;
/**bombo donde estan las bolas */
var bombo;

/**
 * funcion principal que recoge los valores del menu e inicializa el juego
 */
function comenzar() {

  //Recogemos las opciones de juego de la pagina
  njugadores = document.getElementById("njugadores").value;
  precio = document.getElementById("precio").value;
  velocidad = document.getElementById("velocidad").value;

  //creamos el bombo
  bombo = new Bombo();

  //creamos los jugadores
  jugadores[0]= new Jugador(false);
  jugadores[0].carton.dibujar(jugadores[0].rival);

  //reservamos el lugar 0 del array para nosotros 
  for (let i = 1; i < njugadores; i++) {
    jugadores[i]= new Jugador(true);
    jugadores[i].carton.dibujar(jugadores[i].rival);

  }

  iniciar();
  
  
  cambiarMenu();
}

/**
 * Cambia el div donde estan las opciones de juego y botones
 */
function cambiarMenu(){
  $('#menu, #botones').toggleClass('ocultar');
  $('#micarton, #rivales, #instrucciones').toggleClass('ocultar');
}

/**
 * Inicia el intevalo que saca las bolas del bombo con la velocidad establecida
 */
function iniciar(){
  intervalo= setInterval(bombo.sacarbola, velocidad);
  $('#play, #stop').toggleClass('ocultar');
}

/**
 * Llamada para comprobar si el jugador tiene completo un bingo
 */
function bingo() {
  stop();
  bombo.cantarbingo();
  iniciar();
}

/**
 * para el intervalo que saca las bolas
 */
function stop(){
  clearInterval(intervalo);
  $('#play, #stop').toggleClass('ocultar');
}



