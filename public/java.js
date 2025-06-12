let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

function guardar() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));  // Guardar jugadores en localStorage
}

function registrarIniciales() {
  const nombresIniciales = [
    "Rubén", "Horacio", "Torres", "Jose.Alcala", "Kiko", "Purpi", "Ivan", "Molero",
    "Pablo", "Rafa", "CarlosGonzalez", "CarlosP", "Jose.Angel", "Raul", "Vicente",
    "CarlosSanchez", "Alvaro", "Javi", "Xaxi", "Diego", "DaniG", "Antonio"
  ];

  const yaExisten = jugadores.some(j => nombresIniciales.includes(j.nombre));

  if (!yaExisten) {
    jugadores.push(
      { nombre: "Rubén", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Vicente", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Alvaro", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Javi", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Purpi", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Torres", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Ivan", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Kiko", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "CarlosSanchez", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Molero", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Pablo", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Rafa", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "CarlosGonzalez", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Jose.Alcala", posicion: "MD", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "CarlosP", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Jose.Angel", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Raul", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Xaxi", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Horacio", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "DaniG", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Diego", posicion: "???", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
      { nombre: "Antonio", posicion: "DEL", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 }
    );
    guardar();
  }
}

function pedirPassword() {
  const password = prompt("Introduce la contraseña para editar:");
  if (password === "Rcorralr123") {
    mostrarPanelEdicion();
  } else {
    alert("Contraseña incorrecta");
  }
}

function mostrarPanelEdicion() {
  const panel = document.getElementById("panel-edicion");
  panel.style.display = "block";
  document.getElementById("btn-editar").style.display = "none";
  actualizarTablaPrincipal();
}

function cerrarEdicion() {
  const panel = document.getElementById("panel-edicion");
  if (panel) panel.style.display = "none";
  document.getElementById("btn-editar").style.display = "inline-block";
}

function actualizarTablaPrincipal() {
  const tbody = document.getElementById("tabla-jugadores-body");
  tbody.innerHTML = "";  // Limpiar tabla antes de agregar nuevos datos

  jugadores.forEach(j => {
    tbody.innerHTML += `
      <tr>
        <td>${j.nombre}</td>
        <td>${j.posicion}</td>
        <td><input type="number" value="${j.goles}" onchange="modValue('${j.nombre}', 'goles', this.value)" /></td>
        <td><input type="number" value="${j.asistencias}" onchange="modValue('${j.nombre}', 'asistencias', this.value)" /></td>
        <td><input type="number" value="${j.amarillas}" onchange="modValue('${j.nombre}', 'amarillas', this.value)" /></td>
        <td><input type="number" value="${j.rojas}" onchange="modValue('${j.nombre}', 'rojas', this.value)" /></td>
        <td><input type="number" value="${j.partidos}" onchange="modValue('${j.nombre}', 'partidos', this.value)" /></td>
        <td><button onclick="eliminarJugador('${j.nombre}')">Eliminar</button></td>
      </tr>
    `;
  });
}

function modValue(nombre, tipo, valor) {
  valor = parseInt(valor, 10);
  if (isNaN(valor)) {
    alert("Valor no válido");
    return;
  }

  const jugador = jugadores.find(j => j.nombre === nombre);
  if (jugador) {
    jugador[tipo] = valor;
    guardar();
    actualizarTablaPrincipal();
  }
}

function eliminarJugador(nombre) {
  jugadores = jugadores.filter(j => j.nombre !== nombre);
  guardar();
  actualizarTablaPrincipal();
}

// Tabla de estadísticas
function actualizarGoleadores() {
  const tbody = document.getElementById("tabla-goleadores");
  const sorted = [...jugadores].sort((a, b) => (b.goles || 0) - (a.goles || 0));
  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    if ((j.goles || 0) > 0) {
      tbody.innerHTML += `<tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.goles}</td><td>${j.partidos}</td></tr>`;
    }
  });
}

function mostrarAsistencias(jugadores) {
  const tbody = document.getElementById('tabla-asistencias');
  tbody.innerHTML = '';
  jugadores.filter(j => j.asistencias > 0).forEach(j => {
    tbody.innerHTML += `
      <tr>
        <td>${j.nombre}</td>
        <td>${j.asistencias}</td>
        <td>${j.partidos}</td>
      </tr>
    `;
  });
}

function actualizarTarjetas() {
  const tbody = document.getElementById("tabla-tarjetas");
  const sorted = [...jugadores].sort((a, b) => ((b.amarillas || 0) + (b.rojas || 0)) - ((a.amarillas || 0) + (a.rojas || 0)));
  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    if ((j.amarillas || 0) > 0 || (j.rojas || 0) > 0) {
      tbody.innerHTML += `<tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.amarillas}</td><td>${j.rojas}</td><td>${j.partidos}</td></tr>`;
    }
  });
}

function actualizarEficiencia() {
  const tbody = document.getElementById("tabla-eficiencia");
  const sorted = jugadores.filter(j => (j.partidos || 0) > 0)
    .sort((a, b) => ((b.goles || 0) / b.partidos) - ((a.goles || 0) / a.partidos));

  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    const prom = (j.goles / j.partidos).toFixed(2);
    tbody.innerHTML += `<tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.partidos}</td><td>${j.goles}</td><td>${prom}</td></tr>`;
  });
}

// Cargar las opciones de equipos para los selects
function cargarOpcionesEquipos() {
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  if (!equipo1 || !equipo2) return;

  equipo1.innerHTML = "";
  equipo2.innerHTML = "";

  jugadores.forEach(j => {
    const opt1 = document.createElement("option");
    opt1.value = j.nombre;
    opt1.text = j.nombre;
    equipo1.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = j.nombre;
    opt2.text = j.nombre;
    equipo2.appendChild(opt2);
  });
}

function obtenerSeleccion(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return [];
  return Array.from(select.selectedOptions).map(opt => opt.value);
}

function actualizarEquipos() {
  const equipo1Jugadores = obtenerSeleccion("equipo1");
  const equipo2Jugadores = obtenerSeleccion("equipo2");

  const lista1 = document.getElementById("lista-equipo1");
  const lista2 = document.getElementById("lista-equipo2");

  lista1.innerHTML = equipo1Jugadores.length
    ? "<ul>" + equipo1Jugadores.map(j => `<li>${j}</li>`).join("") + "</ul>"
    : "No hay jugadores";

  lista2.innerHTML = equipo2Jugadores.length
    ? "<ul>" + equipo2Jugadores.map(j => `<li>${j}</li>`).join("") + "</ul>"
    : "No hay jugadores";
}

function borrarEquipos() {
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  if (equipo1) equipo1.selectedIndex = -1;
  if (equipo2) equipo2.selectedIndex = -1;

  actualizarEquipos();
}
// 7 Ideal 

function calcularPuntos7Ideal(jugador, equipoGanador) {
  let puntos = 0;
  const { posicion, goles, asistencias, amarillas, rojas } = jugador;
  const gano = equipoGanador.includes(jugador.nombre);

  const pos = posicion.toUpperCase();
  if (pos === "DEF" || pos === "DF") {
    puntos += goles * 4;
    puntos += asistencias * 3;
  } else if (pos === "MD") {
    puntos += goles * 4;
    puntos += asistencias * 2;
  } else if (pos === "DEL") {
    puntos += goles * 3;
    puntos += asistencias * 2;
  }

  puntos -= amarillas * 0.5;
  puntos -= rojas * 1;
  if (gano) puntos += 1;

  return puntos;
}

function calcular7Ideal(jugadores, equipo1, equipo2) {
  const equipo1Puntos = equipo1.reduce((acc, nombre) => {
    const jugador = jugadores.find(j => j.nombre === nombre);
    return acc + (jugador?.goles || 0);  // puedes cambiar esta lógica de victoria si es necesario
  }, 0);

  const equipo2Puntos = equipo2.reduce((acc, nombre) => {
    const jugador = jugadores.find(j => j.nombre === nombre);
    return acc + (jugador?.goles || 0);
  }, 0);

  const equipoGanador = equipo1Puntos > equipo2Puntos ? equipo1 : equipo2;

  const jugadoresConPuntaje = jugadores.map(j => ({
    ...j,
    puntos: calcularPuntos7Ideal(j, equipoGanador)
  }));

  const top7 = jugadoresConPuntaje
    .filter(j => j.puntos > 0) // opcional: excluir sin puntos
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 7);

  mostrar7IdealEnTabla(top7);
}

function mostrar7IdealEnTabla(jugadoresIdeal) {
  const tbody = document.querySelector("#tabla-7ideal-partido tbody");
  tbody.innerHTML = ""; // Limpiar tabla

  jugadoresIdeal.forEach(j => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${j.nombre}</td>
      <td>${j.posicion}</td>
      <td>${j.puntos.toFixed(1)}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btn-mostrar-7ideal").addEventListener("click", () => {
  const equipo1 = obtenerSeleccion("equipo1");
  const equipo2 = obtenerSeleccion("equipo2");
  calcular7Ideal(jugadores, equipo1, equipo2);
});
 

// Función para actualizar todo (con estadísticas)
function actualizarTodo() {
  actualizarTablaPrincipal();
  actualizarGoleadores();
  mostrarAsistencias(jugadores);
  actualizarTarjetas();
  actualizarEficiencia();
  cargarOpcionesEquipos();
  actualizarEquipos();
}

// Event listeners para botones y selects
document.addEventListener("DOMContentLoaded", () => {
  registrarIniciales();
  actualizarTodo();
  cargarOpcionesEquipos();

  document.getElementById("btn-actualizar-equipos").addEventListener("click", actualizarEquipos);
  document.getElementById("btn-borrar-equipos").addEventListener("click", borrarEquipos);

  document.getElementById("btn-mostrar-7ideal").addEventListener("click", () => {
    const equipo1 = obtenerSeleccion("equipo1");
    const equipo2 = obtenerSeleccion("equipo2");
    calcular7Ideal(jugadores, equipo1, equipo2);
  });
});
  