let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

function guardar() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
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
      { nombre: "Javi", posicion: "DF", goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 },
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

function actualizarTablaPrincipal() {
  const tbody = document.getElementById("tabla-jugadores-body");
  tbody.innerHTML = "";
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
        <td>
          <button onclick="mod('${j.nombre}','goles',1)">+⚽</button>
          <button onclick="mod('${j.nombre}','goles',-1)">-⚽</button>
          <button onclick="mod('${j.nombre}','asistencias',1)">+🅰️</button>
          <button onclick="mod('${j.nombre}','asistencias',-1)">-🅰️</button>
          <button onclick="mod('${j.nombre}','amarillas',1)">+🟨</button>
          <button onclick="mod('${j.nombre}','amarillas',-1)">-🟨</button>
          <button onclick="mod('${j.nombre}','rojas',1)">+🟥</button>
          <button onclick="mod('${j.nombre}','rojas',-1)">-🟥</button>
          <button onclick="mod('${j.nombre}','partidos',1)">+🎮</button>
          <button onclick="mod('${j.nombre}','partidos',-1)">-🎮</button>
          <button onclick="eliminarJugador('${j.nombre}')">Eliminar</button>
        </td>
      </tr>
    `;
  });
}


function cerrarEdicion() {
  const panel = document.getElementById("panel-edicion");
  if (panel) panel.style.display = "none";
  document.getElementById("btn-editar").style.display = "inline-block";
}

function actualizarTablaSoloLectura() {
  const tbody = document.getElementById("tabla-jugadores-body-solo-lectura");
  tbody.innerHTML = "";
  jugadores.forEach(j => {
    tbody.innerHTML += `
      <tr>
        <td>${j.nombre}</td>
        <td>${j.posicion}</td>
        <td>${j.goles || 0}</td>
        <td>${j.asistencias || 0}</td>
        <td>${j.amarillas || 0}</td>
        <td>${j.rojas || 0}</td>
        <td>${j.partidos || 0}</td>
      </tr>
    `;
  });
}

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

  jugadores
    .filter(j => j.asistencias > 0)
    .forEach(j => {
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
  const sorted = jugadores
    .filter(j => (j.partidos || 0) > 0)
    .sort((a, b) => ((b.goles || 0) / b.partidos) - ((a.goles || 0) / a.partidos));

  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    const prom = (j.goles / j.partidos).toFixed(2);
    tbody.innerHTML += `<tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.partidos}</td><td>${j.goles}</td><td>${prom}</td></tr>`;
  });
}

function calcular7Ideal(jugadores, equipo1, equipo2) {
  const todos = [...equipo1, ...equipo2];
  const jugadoresPartido = jugadores.filter(j => todos.includes(j.nombre)).map(j => {
    const puntos = (j.goles || 0) * 4 + (j.asistencias || 0) * 3 - (j.amarillas || 0) * 1 - (j.rojas || 0) * 3 + (j.partidos || 0) * 1;
    const prom = (puntos / (j.partidos || 1)).toFixed(2);
    return { ...j, puntos, prom };
  });

  const ideal = jugadoresPartido
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 7);

  const tbody = document.querySelector("#tabla-7ideal-partido tbody");
  tbody.innerHTML = "";
  ideal.forEach(j => {
    tbody.innerHTML += `
      <tr>
        <td>${j.nombre}</td>
        <td>${j.posicion}</td>
        <td>${j.puntos}</td>
      </tr>
    `;
  });
}

function obtenerSeleccion(selectId) {
  return Array.from(document.getElementById(selectId).selectedOptions).map(opt => opt.value);
}

// Función para cargar las opciones en los selectores (debes tener los selects en tu HTML)
function cargarOpcionesEquipos() {
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  if (!equipo1 || !equipo2) return; // Evitar error si no existen

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

// Obtener jugadores seleccionados de un select
function obtenerSeleccion(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return [];
  return Array.from(select.selectedOptions).map(opt => opt.value);
}

// Actualizar la tabla con jugadores seleccionados
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

// Borrar selección y tabla
function borrarEquipos() {
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  if (equipo1) equipo1.selectedIndex = -1;
  if (equipo2) equipo2.selectedIndex = -1;

  actualizarEquipos();
}

// Event listeners para botones y selects
document.addEventListener("DOMContentLoaded", () => {
  cargarOpcionesEquipos();

  document.getElementById("btn-actualizar-equipos").addEventListener("click", actualizarEquipos);
  document.getElementById("btn-borrar-equipos").addEventListener("click", borrarEquipos);

  // Si quieres actualizar al cambiar selección
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");
  if (equipo1) equipo1.addEventListener("change", actualizarEquipos);
  if (equipo2) equipo2.addEventListener("change", actualizarEquipos);
});

function borrarEquipos() {
  document.getElementById("equipo1").selectedIndex = -1;
  document.getElementById("equipo2").selectedIndex = -1;
  actualizarEquipos();
}

function actualizarTodo() {
  actualizarTablaSoloLectura();
  actualizarGoleadores();
  mostrarAsistencias(jugadores);
  actualizarTarjetas();
  actualizarEficiencia();
  cargarOpcionesEquipos();
  actualizarEquipos();
}

// Eventos
document.getElementById("btn-actualizar-equipos").addEventListener("click", actualizarEquipos);
document.getElementById("btn-borrar-equipos").addEventListener("click", borrarEquipos);
document.getElementById("btn-mostrar-7ideal").addEventListener("click", () => {
  const equipo1 = obtenerSeleccion("equipo1");
  const equipo2 = obtenerSeleccion("equipo2");
  calcular7Ideal(jugadores, equipo1, equipo2);
});

document.addEventListener("DOMContentLoaded", () => {
  registrarIniciales();
  actualizarTodo();
});
