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

  // Función para dibujar el personaje
  const dibujarPersonaje = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = personaje.color;
      ctx.fillRect(personaje.x, personaje.y, personaje.width, personaje.height);
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
      dibujarPersonaje();
  };

  // Event listener para el teclado
  window.addEventListener("keydown", moverPersonaje);

  // Dibujar al personaje inicialmente
  dibujarPersonaje();
});
