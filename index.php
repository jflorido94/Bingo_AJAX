<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bingo</title>

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/estilo.css">

  <script src="https://code.jquery.com/jquery-3.1.1.min.js" type="text/javascript"></script>

  <script src="js/bombo.js"></script>
  <script src="js/carton.js"></script>
  <script src="js/jugador.js"></script>
  <script src="js/bingo.js"></script>
</head>

<body>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 p-4" id="menu">
        <div class="row my-3">
          <label for="jugadores">Nº de Jugadores: </label>
          <select class="custom-select" id="njugadores">
            <script>
              for (let i = 5; i <= 20; i++) {
                document.write("<option value='" + i + "'>" + i + "</option>")
              }
            </script>
          </select>
        </div>

        <div class="row my-3">
          <label for="precio">Precio: </label>
          <select class="custom-select" id="precio">
            <option value="1" selected>1€</option>
            <option value="2">2€</option>
            <option value="3">3€</option>
            <option value="4">4€</option>
            <option value="5">5€</option>
          </select>
        </div>

        <div class="row my-3">
          <label for="velocidad">Velocidad de juego</label>
          <select class="custom-select" id="velocidad">
            <option value="1000">Super rápido (1 seg/bola)</option>
            <option value="2500">Rápido (2,5 seg/bola)</option>
            <option value="5000" selected>Normal (5 seg/bola)</option>
            <option value="7500">Lento 7,5 seg/bola</option>
          </select>
        </div>

        <div class="row my-3 d-flex justify-content-center">
          <button class="btn btn-success btn-lg" onclick="comenzar()"> Start </button>
        </div>
      </div>

      <div class="col-2 ocultar" id="botones">
        <div class="row my-5 d-flex justify-content-center">
          <h1><span class="ball" id="bola">?</span></h1>
        </div>
        <div class="row my-5 d-flex justify-content-center" id="historial">
          <h5 class="col-12 text-center">Ultimas 5 bolas: </h5>
          <h3><span class="ball" id="bh1">?</span></h3>
          <h3><span class="ball" id="bh2">?</span></h3>
          <h3><span class="ball" id="bh3">?</span></h3>
          <h3><span class="ball" id="bh4">?</span></h3>
          <h3><span class="ball" id="bh5">?</span></h3>
        </div>
        <div class="row my-5 d-flex justify-content-center">
          <button class="btn btn-success btn-lg" onclick="bingo()"> ¡¡BINGO!! </button>
        </div>
        <div class="row my-5 d-flex justify-content-center" >
          <button class="btn btn-primary" id="play" onclick="iniciar()"> Play </button>
        </div>
        <div class="row my-5 d-flex justify-content-center" >
          <button class="btn btn-danger ocultar" id="stop" onclick="stop()"> Stop </button>
        </div>
      </div>
      <div class="col-10 p-5" id="juego">
        <div id="instrucciones">
          <h3>Instrucciones de Juego</h3>
          <ul>
            <li>Elige en el menú de la derecha las opciones de juego</li>
            <li>Para cantar Bingo clica en el boton cuando todos tus numeros hayan salido</li>
            <li>Si el Bingo es correcto saldrá una ventana con la cantidad del premio obtenido</li>
            <li>Si el bingo no es correcto la partida seguira automaticamente</li>
            <li>Necesitas tener habilitada las ventanas emergentes en tu navegador</li>
            <li>Cuando un rival consigue bingo, comprueba que jugadores han conseguido premio</li>
            <li>Puedes parar la partida pulsando en stop y retomarla pulsando en play</li>
          </ul>
        </div>


        <div class="ocultar" id="micarton">
          <h2>Jugador</h2>


        </div>
        <div class="row rivales ocultar" id="rivales">

        </div>

      </div>
    </div>
</body>

</html>