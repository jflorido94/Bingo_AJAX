class Carton {

  
  constructor(){
  
    this.lineas = [[],[],[]];
    this.columnas = [];

  
    // nueve columnas en cada carton
    for (let j = 0; j<9; j++) {
      let columna = [];
      // tres numeros al azar (en el rango segun columna) por columna
      for (let i = 0; i < 3; i++) {
        do {
          var numero = this.getRandomInt(1+10*j,11+10*j)
        } while (columna.includes(numero));
        columna.push(numero);
      }
      // agregamos la columna completa y ordenada al carton
      this.columnas.push(columna.sort());
    }
    // Equipara el carton mostrado por columnas por el carton mostrado por filas
    for (let i = 0; i < this.columnas.length; i++) {
      for (let j = 0; j < this.columnas[i].length; j++) {
        this.lineas[j][i]=this.columnas[i][j];
      }
    }
    //quitamos las 4 casillas por cada fila del carton
    this.casillasOcultas();
  }

  casillasOcultas(){
    let quitar= new Array(3);
    quitar[0]=new Array();
    quitar[1]=new Array();
    quitar[2]=new Array();
    let posicion= 0;
    let coinciden = false;
    do {
      coinciden = false;
      // por cada fila del carton tachamos 4 casillas
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j<4; j++){
          do {
          // quitar la posicion random
          posicion=this.getRandomInt(0,9);
          } while (quitar[i].includes(posicion))
          // si no existe en las que quitaremos de la fila i, la añadimos, 
          // asi hasta ser 4 las casillas quitadas
          quitar[i].push(posicion);
        }
      }

      for (let i = 0; i < 9; i++) {
          if (quitar[0].includes(i)&&quitar[1].includes(i)&&quitar[2].includes(i)) {
            coinciden=true;
            break;
        }
      }
    } while (coinciden);

    for (let i = 0; i <quitar.length; i++) {
      for (let j = 0; j < quitar[i].length; j++) {     
        this.lineas[i][quitar[i][j]]=0;
        this.columnas[quitar[i][j]][i]=0;
      }
    }
  }

  mostrar(){
    
  }



  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}