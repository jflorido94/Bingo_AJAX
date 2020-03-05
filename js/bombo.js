
class Bombo {
  /**
   * Bombo con los numeros del bombo y los que ya han salido.
   */
  constructor() {

    /** numeros restantes en el interior del bombo */
    this.restantes = [];

    /**numeros que ya han salido del bombo */
    this.salidos = [];

    this.rellenarbombo();


  }

  //sin trampas como el de las gafas de la loteria
  /**
   * Rellena el bombo con numeros del 1 al 90
   */
  rellenarbombo() {
    for (let i = 1; i < 91; i++) {
      this.restantes.push(i);
    }
  }

  /**
   * Saca una bola del bombo utilizando ajax sobre el archivo php
   */
  sacarbola() {
    // $.ajax({
    //   method: "POST",
    // url: "js/bingo.php",
    // data: { opciones : bombo.restantes },
    // dataType: "text",
    // success: bombo.automatizar(),
    // });

    $.ajax(
      'js/bingo.php',
      {
        data: { opciones: bombo.restantes },
        success: function (indice) {
          bombo.automatizar(indice);
        }
      }
    );
  }
  /**
   * realiza todo el proceso automatico despues de sacar la bola mediante php
   * @param {integer} indice posicion de la bola sacada del bombo
   */
  automatizar(indice) {
    var bola = this.restantes[indice];
    this.salidos.push(bola);

    if (this.salidos.length <= 90) {
      this.eliminarbola(indice);
      this.mostrarBolaSacada(bola);

      //Comentar linea para jugar solo, sin que los rivales tachen casillas y/o ganen
      this.tacharycomprobar(bola);

    } else {
      stop();
      alert("Bombo vacio, no deberia pasar antes debe de ganar alguien")
    }
  }
/**
 * Elimina del bombo el numero sacado
 * @param {integer} indice posicion del numero sacado del bombo
 */
  eliminarbola(indice) {
    var copia = []
    copia = this.restantes.slice();
    copia.splice(indice, 1);
    this.restantes = copia.slice();;
  }
  /**
   * dibuja en la pagina web el numero sacado del bombo y los ultimos 5 sacados
   * @param {integer} bola numero sacado del bombo
   */
  mostrarBolaSacada(bola) {
    document.getElementById("bola").innerHTML = bola;

    var ultimos = this.salidos.slice(-5);

    for (let i = 0; i < ultimos.length; i++) {
      document.getElementById("bh" + (i + 1)).innerHTML = ultimos[ultimos.length - (i + 1)];

    }
  }
  /**
   * Tacha la casilla del carton de los jugadores IA y canta bingo si ya tacharon todas las casillas
   * @param {integer} numero valor de la bola sacada del bombo
   */
  tacharycomprobar(numero) {

    for (let i = 1; i < jugadores.length; i++) {
      if (jugadores[i].autoTacharCasilla(numero)) {
        this.cantarbingo();
      }
    }
  }
  /**
   * Comprueba si hay ganadores y si lo hay muestra por pantalla la ventana ganar.html
   */
  cantarbingo() {
    var ganadores = [];
    //comprobamos los cartones de todos los jugadores por si hay mas de un ganador
    for (let i = 0; i < jugadores.length; i++) {
      if (this.comprobarCarton(jugadores[i].carton)) {
        ganadores.push(i);
      }
    }
    // si hay algun ganador
    if (ganadores.length > 0) {
      stop();
      var ventana = window.open("ganar.html", "_blank", "width=470, height=800");

      ventana.onload = function () {

        //Si nosotros somos uno de los ganadores
        if (ganadores.includes(0)) {
          //añadimos la clase ocultar a id = lose
          ventana.document.getElementById('lose').classList.add('ocultar');
        } else {
          ventana.document.getElementById('win').classList.add('ocultar');
          ventana.document.getElementById("ganadorRival").innerHTML = ganadores[0];
        }
        ventana.document.getElementById('premio').innerHTML = bombo.calcularPremio(ganadores.length);

        var winners = document.createElement("ul");
        //Creamos una lista con los rivales ganadores
        //solo entra si hay mas de un ganador
        for (let i = 1; i < ganadores.length; i++) {
          var winner = document.createElement("li");
          winner.innerHTML = "Rival nº" + ganadores[i];
          winners.appendChild(winner);
        }

        if (ganadores.length > 1) {
          ventana.document.getElementById("otros").classList.remove('ocultar');
          ventana.document.getElementById('otros').appendChild(winners);
        }

      }
    }
  }
  /**
   * Averigua si los numeros del carton ya han salido del bombo
   * @param {Carton} carton Carton que quieres comprobar
   * @returns {bool}  
   */
  comprobarCarton(carton) {
    let bingo = true;

    for (let i = 0; i < carton.xlineas.length; i++) {
      for (let j = 0; j < carton.xlineas[i].length; j++) {
        if (!(carton.xlineas[i][j] === "X")) {
          if (!this.salidos.includes(carton.xlineas[i][j])) {
            bingo = false;
            break;
          }
        }
      }
      if (!bingo) {
        break;
      }
    }
    return bingo;
  }

  /**
 * Calcula el premio según la fórmula especificada en la práctica
 * @param {integer} ganadores numero de ganadores
 * @returns {number} resultado Devuelve el resultado del premio
 */
  calcularPremio(ganadores) {
    var resultado = (njugadores * precio) / ganadores;
    return resultado * 0.8;
  }


  /**
   * Devuelve un numero aleatorio en un intervalo
   * @param {integer} min numero minimo incluido
   * @param {integer} max numero maximo NO incluido
   * @returns {integer}
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}