document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("juego");
  const ctx = canvas.getContext("2d");

  // Configuración del personaje
  const personaje = {
      x: 50,
      y: 50,
      width: 30,
      height: 30,
      color: "blue",
      speed: 5,
      direccion: "ArrowRight" // Dirección inicial del personaje
  };

  // Lista de obstáculos con velocidad
  const obstaculos = [
      { x: 200, y: 150, width: 50, height: 50, color: "red", speedX: 2, speedY: 2 },
      { x: 400, y: 300, width: 50, height: 50, color: "red", speedX: -3, speedY: 2 },
      { x: 600, y: 100, width: 50, height: 50, color: "red", speedX: 1, speedY: -2 }
  ];

  // Lista de balas disparadas por el personaje
  const balas = [];

  // Función para dibujar el fondo
  const dibujarFondo = () => {
      ctx.fillStyle = "#e0e0e0"; // Color gris claro
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Función para dibujar el personaje
  const dibujarPersonaje = () => {
      ctx.fillStyle = personaje.color;
      ctx.fillRect(personaje.x, personaje.y, personaje.width, personaje.height);
  };

  // Función para dibujar los obstáculos
  const dibujarObstaculos = () => {
      obstaculos.forEach(obstaculo => {
          ctx.fillStyle = obstaculo.color;
          ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.width, obstaculo.height);
      });
  };

  // Función para dibujar las balas
  const dibujarBalas = () => {
      balas.forEach(bala => {
          ctx.fillStyle = bala.color;
          ctx.fillRect(bala.x, bala.y, bala.width, bala.height);
      });
  };

  // Función para mover las balas
  const moverBalas = () => {
      for (let i = balas.length - 1; i >= 0; i--) {
          switch (balas[i].direccion) {
              case "ArrowUp":
                  balas[i].y -= balas[i].speed;
                  break;
              case "ArrowDown":
                  balas[i].y += balas[i].speed;
                  break;
              case "ArrowLeft":
                  balas[i].x -= balas[i].speed;
                  break;
              case "ArrowRight":
                  balas[i].x += balas[i].speed;
                  break;
          }

          // Eliminar balas que salgan del canvas
          if (
              balas[i].x > canvas.width ||
              balas[i].x < 0 ||
              balas[i].y > canvas.height ||
              balas[i].y < 0
          ) {
              balas.splice(i, 1);
          }
      }
  };

  // Función para mover los obstáculos
  const moverObstaculos = () => {
      obstaculos.forEach(obstaculo => {
          // Actualizar la posición del obstáculo
          obstaculo.x += obstaculo.speedX;
          obstaculo.y += obstaculo.speedY;

          // Rebotar cuando alcance los bordes del canvas
          if (obstaculo.x <= 0 || obstaculo.x + obstaculo.width >= canvas.width) {
              obstaculo.speedX *= -1; // Cambiar dirección en X
          }
          if (obstaculo.y <= 0 || obstaculo.y + obstaculo.height >= canvas.height) {
              obstaculo.speedY *= -1; // Cambiar dirección en Y
          }
      });
  };

  // Función para detectar colisiones entre balas y obstáculos
  const detectarColisionBalasObstaculos = () => {
      for (let i = balas.length - 1; i >= 0; i--) {
          for (let j = obstaculos.length - 1; j >= 0; j--) {
              const bala = balas[i];
              const obstaculo = obstaculos[j];
              if (
                  bala.x < obstaculo.x + obstaculo.width &&
                  bala.x + bala.width > obstaculo.x &&
                  bala.y < obstaculo.y + obstaculo.height &&
                  bala.y + bala.height > obstaculo.y
              ) {
                  // Eliminar el obstáculo y la bala cuando colisionen
                  obstaculos.splice(j, 1);
                  balas.splice(i, 1);
                  break; // Salir del bucle de obstáculos una vez que se haya detectado una colisión
              }
          }
      }
  };

  // Función para detectar colisiones del personaje con obstáculos
  const detectarColision = () => {
      for (let obstaculo of obstaculos) {
          if (
              personaje.x < obstaculo.x + obstaculo.width &&
              personaje.x + personaje.width > obstaculo.x &&
              personaje.y < obstaculo.y + obstaculo.height &&
              personaje.y + personaje.height > obstaculo.y
          ) {
              // Colisión detectada
              return;
          }
      }
  };

  // Función para disparar balas en la dirección del movimiento actual
  const dispararBala = () => {
      const nuevaBala = {
          x: personaje.x + personaje.width / 2,
          y: personaje.y + personaje.height / 2,
          width: 10,
          height: 5,
          color: "black",
          speed: 7,
          direccion: personaje.direccion // Usar la dirección actual del personaje
      };

      // Ajustar el tamaño de la bala según la dirección
      if (nuevaBala.direccion === "ArrowUp" || nuevaBala.direccion === "ArrowDown") {
          nuevaBala.width = 5;
          nuevaBala.height = 10;
      }

      balas.push(nuevaBala);
  };

  // Función para mover el personaje
  const moverPersonaje = (event) => {
      switch (event.key) {
          case "ArrowUp":
              personaje.y -= personaje.speed;
              personaje.direccion = "ArrowUp";
              break;
          case "ArrowDown":
              personaje.y += personaje.speed;
              personaje.direccion = "ArrowDown";
              break;
          case "ArrowLeft":
              personaje.x -= personaje.speed;
              personaje.direccion = "ArrowLeft";
              break;
          case "ArrowRight":
              personaje.x += personaje.speed;
              personaje.direccion = "ArrowRight";
              break;
          case " ":
              dispararBala();
              break;
      }

      // Detección de colisiones con los bordes del canvas
      if (personaje.x < 0) personaje.x = 0;
      if (personaje.y < 0) personaje.y = 0;
      if (personaje.x + personaje.width > canvas.width) personaje.x = canvas.width - personaje.width;
      if (personaje.y + personaje.height > canvas.height) personaje.y = canvas.height - personaje.height;

      // Verificar si hay una colisión con algún obstáculo
      detectarColision();
  };

  // Función para dibujar todo el escenario
  const dibujarTodo = () => {
      // Limpiar el canvas y dibujar de nuevo
      dibujarFondo();
      dibujarPersonaje();
      dibujarObstaculos();
      dibujarBalas();
  };

  // Bucle principal del juego
  const gameLoop = () => {
      moverObstaculos();                 // Mover obstáculos
      moverBalas();                      // Mover balas
      detectarColisionBalasObstaculos(); // Detectar colisiones entre balas y obstáculos
      dibujarTodo();                     // Redibujar todo
      detectarColision();                // Detectar colisiones del personaje
      requestAnimationFrame(gameLoop);   // Llamar a gameLoop de nuevo
  };

  // Event listener para el teclado
  window.addEventListener("keydown", moverPersonaje);

  // Iniciar el bucle del juego
  gameLoop();
});
