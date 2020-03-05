class Jugador {
/**
 * Crea un jugador el cual posee un carton
 * @param {bool} esrival true si es un jugador rival (IA)
 */
constructor(esrival=true){

  this.carton=new Carton();
  this.rival = esrival;
  this.aciertos = 0;
}
/**
 * Tacha las casillas con el numero sacado del bombo de los cartones de los rivales,
 * comprueba si estan todas tachadas y si es asi canta bingo
 * @param {integer} numero numero sacado del bombo
 */
autoTacharCasilla(numero){
   
  for (let i = 0; i < this.carton.xlineas.length; i++) {
    if (this.carton.xlineas[i].includes(numero)) {
      var casilla=$('#rivales .casilla').filter(function(){
        return $(this).text()==numero.toString();
      });
      casilla.addClass('sacado');
      this.aciertos++;
    }
  }

  if (this.aciertos==15) {
    return true;
  }else{
    return false;
  }
}




}