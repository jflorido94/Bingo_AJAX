
class Bombo{
/**
 * Bombo con los numeros del bombo y los que ya han salido.
 */
  constructor() {

    /**
     * numeros restantes en el interior del bombo
     */
    this.restantes = [];

    /**
     * numeros que ya han salido del bombo
     */
    this.salidos= [];

    this.rellenarbombo();

    
  }

  //sin trampas como el de las gafas de la loteria
  /**
   * Rellena el bombo con numeros del 1 al 90
   */
  rellenarbombo(){
    for (let i = 1; i < 91; i++) {
      this.restantes.push(i);
    }
  }

  /**
   * Averigua si los numeros del carton ya han salido del bombo
   * @param {Carton} carton Carton que quieres comprobar
   * @returns {bool}  
   */
  comprobarCarton(carton){
    let bingo = true;

    for (let i = 0; i < carton.xlineas.length; i++) {
      for (let j = 0; j < carton.xlineas[i].length; j++) {
        if(!(carton.xlineas[i][j]==="X")){
          if (!this.salidos.includes(carton.xlineas[i][j])){
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

  cantarbingo(){
    if (comprobarCarton()) {
      
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
      {   data: {opciones: bombo.restantes},
          success: function(indice) {
            bombo.automatizar(indice);
          }
       }
    );
  }
 
  automatizar(indice){
    var bola = this.restantes[indice];
    this.salidos.push(bola);

    if (this.salidos.length<=90) {
      this.eliminarbola(indice);
      this.mostrarBolaSacada(bola);

      //Comentar linea para jugar solo, sin que los rivales tachen casillas y/o ganen
      this.tacharycomprobar(bola);
    
    } else {
      clearInterval(intervalo);
      alert("Bombo vacio, no deberia pasar antes debe de ganar alguien")
    }
  }

  tacharycomprobar(numero){

    var ganadores=0;

    for (let i = 1; i < jugadores.length; i++) {
      if (jugadores[i].autoTacharCasilla(numero)){
        ganadores++;
      }
    }

    if (ganadores>0) {
      cantarbingo();
    }


  }

  eliminarbola(indice){
    var copia = []
    copia=  this.restantes.slice();
    copia.splice(indice,1);
    this.restantes=copia.slice();;
  }

  mostrarBolaSacada(bola){
    document.getElementById("bola").innerHTML=bola;

    var ultimos= this.salidos.slice(-5);
  
    for (let i = 0; i < ultimos.length; i++) {
      document.getElementById("bh"+(i+1)).innerHTML = ultimos[ultimos.length-(i+1)];
      
    }
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