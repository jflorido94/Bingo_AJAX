class Carton {

  /**
   * Crea un carton con numeros tapados y ordenados por columnas y filas
   */
  constructor() {
    /**
     * Carton ordenado por columnas (9 columnas de 3 numeros)
     */
    this.xcolumnas = [];

    this.rellenarColumnas();

    //quitamos las 4 casillas por cada fila del carton
    this.casillasOcultas();
    /**
     * Carton ordenado por filas (3 filas de 9 columnas)
     */
    this.xlineas = this.igualarCartonDesde(this.xcolumnas);
  }
  //Antigua forma se quedaba pillado a veces por repeticion de los numeros del random
  // rellenarColumnas() {
  //   // nueve columnas en cada carton
  //   for (let j = 0; j < 9; j++) {
  //     let columna = [];
  //     // tres numeros al azar (en el rango segun columna) por columna
  //     for (let i = 0; i < 3; i++) {
  //       do {
  //         var numero = this.getRandomInt(1 + 10 * j, 11 + 10 * j)
  //       } while (columna.includes(numero));
  //       columna.push(numero);
  //     }
  //     // agregamos la columna completa y ordenada al carton
  //     this.columnas.push(columna.sort((a, b) => a - b));
  //   }
  // }

  /**
   * Rellena el carton con numeros ordenados por columnas, aun sin ocultar los numeros
   */
  rellenarColumnas() {
    //nueve columnas en cada carton
    for (let j = 0; j < 9; j++) {
      let columna = [];
      //sacamos los posibles numeros para esa columna y los desordenamos
      let desordenados = this.rellenarydesordenararray(1 + 10 * j, 11 + 10 * j);
      //cogemos los 3 primeros numeros del array desordenado
      for (let i = 0; i < 3; i++) {
        var numero = desordenados[i];
        columna.push(numero);
      }
      // agregamos la columna completa y ordenada al carton
      this.xcolumnas.push(columna.sort((a, b) => a - b));
    }

  }
  /**
   * Devuelve el array bidimensional ordenado al revez del pasado por parametros
   * @param {array} entrada array bidimensional
   * @returns {array} 
   */
  igualarCartonDesde(entrada) {
    // Equipara el carton mostrado por columnas por el carton mostrado por filas
    let salida = [[], [], []];
    for (let i = 0; i < entrada.length; i++) {
      for (let j = 0; j < entrada[i].length; j++) {
        salida[j][i] = entrada[i][j];
      }
    }
    return salida;
  }

  /**
   * Quita 4 casillas por fila del Carton
   */
  casillasOcultas() {
    let quitar = new Array(3);
    quitar[0] = new Array();
    quitar[1] = new Array();
    quitar[2] = new Array();
    let posicion = 0;

    // por cada fila del carton tachamos 4 casillas
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        do {
          posicion = this.getRandomInt(0, 9);
        } while (quitar[i].includes(posicion) || quitar[0].includes(posicion) && quitar[1].includes(posicion))
        quitar[i].push(posicion);
      }
    }

    //comprobamos si coinciden 3 casillas a ocultar en la misma columna
    for (let i = 0; i < 9; i++) {
      if (quitar[0].includes(i) && quitar[1].includes(i) && quitar[2].includes(i)) {
        coinciden = true;
        break;
      }
    }

    //una vez cumple las normas las casillas a ocultar las cambiamos por "X"
    for (let i = 0; i < quitar.length; i++) {
      for (let j = 0; j < quitar[i].length; j++) {
        this.xcolumnas[quitar[i][j]][i] = "X";
      }
    }
  }

  dibujar(rival = true) {
    if (rival) {
      var div = document.createElement("div");
      div.classList.add("col-12", "col-lg-6");
      var carton = document.createElement("div");
      carton.classList.add("row", "my-4", "carton");

      for (let i = 0; i < this.xlineas.length; i++) {
        for (let j = 0; j < this.xlineas[i].length; j++) {
          var terciodefila;
          var casilla;
          if (j == 0) {
            if (i != 0) {
              carton.appendChild(terciodefila);
            }
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");
          }
          if (j == 3) {
            carton.appendChild(terciodefila);
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");
          }
          if (j == 6) {
            carton.appendChild(terciodefila);
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");

          }
          casilla = document.createElement("div");
          casilla.classList.add("col-4");
          casilla.setAttribute("id", (i + 1) + "/" + (j + 1));

          if (this.xlineas[i][j] == "X") {
            casilla.classList.add("hueco");
          } else {
            casilla.classList.add("casilla");
            casilla.innerHTML = this.xlineas[i][j];
          }
          terciodefila.appendChild(casilla);

          if (j == 8 && i == 2) {
            carton.appendChild(terciodefila);
          }
        }

      }
      div.appendChild(carton);
      var sitio = document.getElementById("rivales");
      sitio.appendChild(div);

    } else {

      var carton = document.createElement("div");
      carton.classList.add("row", "m-4", "carton");

      for (let i = 0; i < this.xlineas.length; i++) {
        for (let j = 0; j < this.xlineas[i].length; j++) {
          var terciodefila;
          var casilla;
          if (j == 0) {
            if (i != 0) {
              carton.appendChild(terciodefila);
            }
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");
          }
          if (j == 3) {
            carton.appendChild(terciodefila);
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");
          }
          if (j == 6) {
            carton.appendChild(terciodefila);
            terciodefila = document.createElement("div");
            terciodefila.classList.add("col-4", "row");

          }
          casilla = document.createElement("div");
          casilla.classList.add("col-4");
          casilla.setAttribute("id", (i*9)+(j+1));

          if (this.xlineas[i][j] == "X") {
            casilla.classList.add("hueco");
          } else {
            casilla.classList.add("casilla");
            casilla.innerHTML = this.xlineas[i][j]
            casilla.addEventListener("click", function () { jugadores[0].carton.marcar(this.id); }, false);
          }
          terciodefila.appendChild(casilla);

          if (j == 8 && i == 2) {
            carton.appendChild(terciodefila);
          }
        }

      }

      var sitio = document.getElementById("micarton");
      sitio.appendChild(carton);
    }

  }

  marcar(id){
    $('#'+id).toggleClass('sacado');
  }


  /**
   * Desordena el array pasado por parametros
   * @param {array} a Array que deseas desordenar
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      let ram = Math.floor(Math.random() * (i + 1));
      let aux = a[i];
      a[i] = a[ram];
      a[ram] = aux;
    }
    return a;
  }
  /**
   * Devuelve un array con numeros en el intervalo y desordenado
   * @param {integer} min numero menor del array
   * @param {integer} max numero maximo del array, No incluido
   * @returns {array}
   */
  rellenarydesordenararray(min, max) {
    let aux = new Array();
    for (let i = min; i < max; i++) {
      aux.push(i);
    }
    return this.shuffle(aux);
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