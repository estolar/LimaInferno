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
      speed: 5
  };

  // Lista de obstáculos
  const obstaculos = [
      { x: 200, y: 150, width: 50, height: 50, color: "red" },
      { x: 400, y: 300, width: 50, height: 50, color: "red" },
      { x: 600, y: 100, width: 50, height: 50, color: "red" }
  ];

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

  // Función para mover el personaje
  const moverPersonaje = (event) => {
      switch(event.key) {
          case "ArrowUp":
              personaje.y -= personaje.speed;
              break;
          case "ArrowDown":
              personaje.y += personaje.speed;
              break;
          case "ArrowLeft":
              personaje.x -= personaje.speed;
              break;
          case "ArrowRight":
              personaje.x += personaje.speed;
              break;
      }

      // Detección de colisiones con los bordes del canvas
      if (personaje.x < 0) personaje.x = 0;
      if (personaje.y < 0) personaje.y = 0;
      if (personaje.x + personaje.width > canvas.width) personaje.x = canvas.width - personaje.width;
      if (personaje.y + personaje.height > canvas.height) personaje.y = canvas.height - personaje.height;

      // Redibujar todo
      dibujarTodo();
  };

  // Función para dibujar todo el escenario
  const dibujarTodo = () => {
      // Limpiar el canvas y dibujar de nuevo
      dibujarFondo();
      dibujarPersonaje();
      dibujarObstaculos();
  };

  // Event listener para el teclado
  window.addEventListener("keydown", moverPersonaje);

  // Dibujar el escenario inicialmente
  dibujarTodo();
});
