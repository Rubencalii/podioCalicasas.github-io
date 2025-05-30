// Reglas de puntuación
const puntos = {
  gol: { defensa: 4, medio: 3, delantero: 2 },
  asistencia: { defensa: 3, medio: 2, delantero: 2 },
  amarilla: -0.5,
  roja: -1,
};

let jugadores = [];

const formulario = document.getElementById('formularioJugadores');
const tabla = document.getElementById('tablaJugadores');
const campo = document.getElementById('campo');

// Cargar jugadores desde el backend al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  fetch('/jugadores')
    .then(res => res.json())
    .then(data => {
      jugadores = data;
      mostrarTabla();
      mostrar8Ideal();
    });
});

// Cuando se envía el formulario para agregar jugador
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const jugador = obtenerDatosFormulario();
  jugador.puntos = calcularPuntos(jugador);

  fetch('/jugadores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jugador)
  })
    .then(res => {
      if (res.ok) {
        jugadores.push(jugador);
        mostrarTabla();
        mostrar8Ideal();
        formulario.reset();
      } else {
        alert('Error al guardar el jugador.');
      }
    })
    .catch(() => alert('Error al conectar con el servidor.'));
});

// Obtiene datos del formulario
function obtenerDatosFormulario() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    posicion: document.getElementById('posicion').value,
    goles: parseInt(document.getElementById('goles').value) || 0,
    asistencias: parseInt(document.getElementById('asistencias').value) || 0,
    amarillas: parseInt(document.getElementById('amarillas').value) || 0,
    rojas: parseInt(document.getElementById('rojas').value) || 0,
    equipo: document.getElementById('equipo').value.trim(),
  };
}

// Calcula puntos según las reglas
function calcularPuntos(j) {
  return (
    j.goles * puntos.gol[j.posicion] +
    j.asistencias * puntos.asistencia[j.posicion] +
    j.amarillas * puntos.amarilla +
    j.rojas * puntos.roja
  );
}

// Muestra la tabla con jugadores ordenados por puntos
function mostrarTabla() {
  jugadores.sort((a, b) => b.puntos - a.puntos);
  tabla.innerHTML = `
    <table>
      <tr>
        <th>Nombre</th>
        <th>Posición</th>
        <th>Goles</th>
        <th>Asistencias</th>
        <th>Amarillas</th>
        <th>Rojas</th>
        <th>Puntos</th>
        <th>Equipo</th>
      </tr>
      ${jugadores.map(j => `
        <tr>
          <td>${j.nombre}</td>
          <td>${j.posicion}</td>
          <td>${j.goles}</td>
          <td>${j.asistencias}</td>
          <td>${j.amarillas}</td>
          <td>${j.rojas}</td>
          <td>${j.puntos.toFixed(1)}</td>
          <td>${j.equipo}</td>
        </tr>`).join('')}
    </table>`;
}

// Muestra el 8 ideal (3 defensas, 3 medios, 2 delanteros con más puntos)
function mostrar8Ideal() {
  campo.innerHTML = '';

  const defensas = jugadores.filter(j => j.posicion === 'defensa').sort((a,b) => b.puntos - a.puntos).slice(0, 3);
  const medios = jugadores.filter(j => j.posicion === 'medio').sort((a,b) => b.puntos - a.puntos).slice(0, 3);
  const delanteros = jugadores.filter(j => j.posicion === 'delantero').sort((a,b) => b.puntos - a.puntos).slice(0, 2);

  const ideal = [...defensas, ...medios, ...delanteros];

  ideal.forEach(j => {
    const div = document.createElement('div');
    div.className = 'jugador';
    div.textContent = `${j.nombre} (${j.puntos.toFixed(1)} pts)`;
    campo.appendChild(div);
  });
}
