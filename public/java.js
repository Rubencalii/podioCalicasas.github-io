let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

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

const td = document.createElement('td');
td.classList.add(`posicion-${jugador.posicion}`);
td.textContent = jugador.nombre;


const password = "Rcorralr123";

function guardar() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function actualizarTablaSoloLectura() {
  const tbody = document.getElementById("tabla-jugadores-body-solo-lectura");
  tbody.innerHTML = "";
  jugadores.forEach(j => {
    tbody.innerHTML += 
      <tr>
        <td>${j.nombre}</td>
        <td>${j.posicion}</td>
        <td>${j.goles || 0}</td>
        <td>${j.asistencias || 0}</td>
        <td>${j.amarillas || 0}</td>
        <td>${j.rojas || 0}</td>
        <td>${j.partidos || 0}</td>
      </tr>
    ;
  });
}

function actualizarTablaPrincipal() {
  const tbody = document.getElementById("tabla-jugadores-body");
  tbody.innerHTML = "";
  jugadores.forEach(j => {
    tbody.innerHTML += 
      <tr>
        <td>${j.nombre}</td>
        <td>${j.posicion}</td>
        <td><input type="number" min="0" value="${j.goles || 0}" onchange="modValue('${j.nombre}','goles',this.value)" /></td>
        <td><input type="number" min="0" value="${j.asistencias || 0}" onchange="modValue('${j.nombre}','asistencias',this.value)" /></td>
        <td><input type="number" min="0" value="${j.amarillas || 0}" onchange="modValue('${j.nombre}','amarillas',this.value)" /></td>
        <td><input type="number" min="0" value="${j.rojas || 0}" onchange="modValue('${j.nombre}','rojas',this.value)" /></td>
        <td><input type="number" min="0" value="${j.partidos || 0}" onchange="modValue('${j.nombre}','partidos',this.value)" /></td>
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
    ;
  });
}

function modValue(nombre, campo, valor) {
  valor = parseInt(valor);
  if (isNaN(valor) || valor < 0) return;
  const j = jugadores.find(j => j.nombre === nombre);
  if (j) {
    j[campo] = valor;
    guardar();
    actualizarTodo();
  }
}

function mod(nombre, campo, delta) {
  const j = jugadores.find(j => j.nombre === nombre);
  if (j) {
    if (!j[campo]) j[campo] = 0;
    j[campo] += delta;
    if (j[campo] < 0) j[campo] = 0;
    guardar();
    actualizarTodo();
  }
}

function eliminarJugador(nombre) {
  if (confirm(`¿Eliminar jugador ${nombre}?`)) {
    jugadores = jugadores.filter(j => j.nombre !== nombre);
    guardar();
    actualizarTodo();
  }
}

function agregarJugador() {
  const nombre = document.getElementById("nombre").value.trim();
  const posicion = document.getElementById("posicion").value;
  if (!nombre) {
    alert("Introduce un nombre válido");
    return;
  }
  if (jugadores.find(j => j.nombre.toLowerCase() === nombre.toLowerCase())) {
    alert("Ese jugador ya existe");
    return;
  }
  jugadores.push({ nombre, posicion, goles: 0, asistencias: 0, amarillas: 0, rojas: 0, partidos: 0 });
  guardar();
  actualizarTodo();
  document.getElementById("nombre").value = "";
  llenarSelectsPartido();
}

function actualizarGoleadores() {
  const tbody = document.getElementById("tabla-goleadores");
  const sorted = [...jugadores].sort((a, b) => (b.goles || 0) - (a.goles || 0));
  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    if ((j.goles || 0) > 0) {
      tbody.innerHTML += <tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.goles || 0}</td><td>${j.partidos || 0}</td></tr>;
    }
  });
}

function mostrarAsistencias(jugadores) {
  const tbody = document.getElementById('tabla-asistencias');
  tbody.innerHTML = ''; 

  // Filtrar solo jugadores con asistencias > 0
  const jugadoresConAsistencias = jugadores.filter(j => j.asistencias > 0);

  jugadoresConAsistencias.forEach(jugador => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${jugador.nombre}</td>
    <td>${jugador.asistencias}</td>
    <td>${jugador.partidos}</td>
  `;
  tbody.appendChild(tr);
});



// Al actualizar o cargar jugadores, llama a mostrarAsistencias:
mostrarAsistencias(jugadores);

function actualizarTarjetas() {
  const tbody = document.getElementById("tabla-tarjetas");
  const sorted = [...jugadores].sort((a, b) => ((b.amarillas || 0) + (b.rojas || 0)) - ((a.amarillas || 0) + (a.rojas || 0)));
  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    if ((j.amarillas || 0) > 0 || (j.rojas || 0) > 0) {
      tbody.innerHTML += <tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.amarillas || 0}</td><td>${j.rojas || 0}</td><td>${j.partidos || 0}</td></tr>;
    }
  });
}

function actualizarEficiencia() {
  const tbody = document.getElementById("tabla-eficiencia");
  const sorted = [...jugadores].filter(j => (j.partidos || 0) > 0).sort((a, b) => ((b.goles || 0) / (b.partidos || 1)) - ((a.goles || 0) / (a.partidos || 1)));
  tbody.innerHTML = "";
  sorted.forEach((j, i) => {
    const prom = ((j.goles || 0) / (j.partidos || 1)).toFixed(2);
    tbody.innerHTML += <tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.partidos || 0}</td><td>${j.goles || 0}</td><td>${prom}</td></tr>;
  });
}

const equipos = ["Equipo A", "Equipo B", "Equipo C", "Equipo D"];

function obtenerSeleccion(selectId) {
  const select = document.getElementById(selectId);
  const seleccionados = Array.from(select.selectedOptions).map(opt => opt.text);
  return seleccionados;
}


function actualizarEquipos() {
  const equipo1Jugadores = obtenerSeleccion("equipo1");
  const equipo2Jugadores = obtenerSeleccion("equipo2");

  document.getElementById("lista-equipo1").textContent = equipo1Jugadores.join(", ") || "Sin jugadores";
  document.getElementById("lista-equipo2").textContent = equipo2Jugadores.join(", ") || "Sin jugadores";
}


document.getElementById("btn-actualizar-equipos").addEventListener("click", actualizarEquipos);


document.getElementById("equipo1").addEventListener("change", actualizarEquipos);
document.getElementById("equipo2").addEventListener("change", actualizarEquipos);

function cargarOpcionesEquipos() {
  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  equipo1.innerHTML = "";
  equipo2.innerHTML = "";

  jugadores.forEach(j => {
    const option1 = document.createElement("option");
    option1.value = j.nombre;
    option1.text = j.nombre;
    equipo1.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = j.nombre;
    option2.text = j.nombre;
    equipo2.appendChild(option2);
  });
}


function borrarEquipos() {

  const equipo1 = document.getElementById("equipo1");
  const equipo2 = document.getElementById("equipo2");

  // Quitar selección de todos los options
  Array.from(equipo1.options).forEach(option => option.selected = false);
  Array.from(equipo2.options).forEach(option => option.selected = false);


  document.getElementById("lista-equipo1").textContent = "";
  document.getElementById("lista-equipo2").textContent = "";
}
document.getElementById("btn-borrar-equipos").addEventListener("click", borrarEquipos);


// Llamar esta función cuando cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  cargarOpcionesEquipos();
  actualizarEquipos();
});



function filtrar7IdealPartido() {
  const selLocal = document.getElementById("equipo-local");
  const selVisitante = document.getElementById("equipo-visitante");
  const seleccionados = new Set([
    ...Array.from(selLocal.selectedOptions).map(o => o.value),
    ...Array.from(selVisitante.selectedOptions).map(o => o.value)
  ]);
  if (seleccionados.size === 0) {
    alert("Selecciona al menos un jugador en los equipos.");
    return;
  }
  const tbody = document.querySelector("#tabla-7ideal-partido tbody");
  tbody.innerHTML = "";
  const jugadoresPartido = jugadores
    .filter(j => seleccionados.has(j.nombre))
    .map(j => {
      const puntos = (j.goles || 0) * 4 + (j.asistencias || 0) * 3 - (j.amarillas || 0) * 1 - (j.rojas || 0) * 3 + (j.partidos || 0) * 1;
      const prom = (puntos / (j.partidos || 1)).toFixed(2);
      return { ...j, puntos, prom };
    })
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 7);
  jugadoresPartido.forEach((j, i) => {
    tbody.innerHTML += <tr>
      <td>${i + 1}</td><td>${j.nombre}</td><td>${j.posicion}</td><td>${j.puntos}</td><td>${j.prom}</td>
    </tr>;
  });
}

function calcular7Ideal(jugadores, equipo1Ids, equipo2Ids) {
  const tbody = document.querySelector("#tabla-7ideal-partido tbody");
  tbody.innerHTML = "";

  // Filtrar solo jugadores que están en los equipos seleccionados
  const jugadoresEnPartido = jugadores.filter(j =>
    equipo1Ids.includes(j.nombre) || equipo2Ids.includes(j.nombre)
  );

  // Añadir puntos y promedio a cada jugador
  const conPuntos = jugadoresEnPartido.map(j => {
    const puntos = (j.goles || 0) * 4
      + (j.asistencias || 0) * 3
      - (j.amarillas || 0) * 1
      - (j.rojas || 0) * 3
      + (j.partidos || 0) * 1;
    const prom = (puntos / (j.partidos || 1)).toFixed(2);
    return { ...j, puntos, prom };
  });

  // Función para obtener N mejores jugadores por posición
  function mejoresPorPosicion(posicion, n) {
    return conPuntos
      .filter(j => j.posicion === posicion)
      .sort((a, b) => b.puntos - a.puntos)
      .slice(0, n);
  }

  // Elegir 3 defensas, 2 mediocampistas y 2 delanteros
  const defensas = mejoresPorPosicion('DF', 3);
  const mediocampistas = mejoresPorPosicion('MD', 2);
  const delanteros = mejoresPorPosicion('DEL', 2);

  // Combinar el 7 ideal
  const ideal = [...defensas, ...mediocampistas, ...delanteros];

  // Mostrar en la tabla
  ideal.forEach((j, i) => {
    tbody.innerHTML += <tr>
      <td>${i + 1}</td>
      <td>${j.nombre}</td>
      <td>${j.posicion}</td>
      <td>${j.puntos}</td>
      <td>${j.prom}</td>
    </tr>;
  });
}

document.getElementById('btn-mostrar-7ideal').addEventListener('click', () => {
  const equipo1 = Array.from(document.getElementById('equipo1').selectedOptions).map(opt => opt.value);
  const equipo2 = Array.from(document.getElementById('equipo2').selectedOptions).map(opt => opt.value);
  calcular7Ideal(jugadores, equipo1, equipo2);
});



function resetearFiltroPartido() {
  const tbody = document.querySelector("#tabla-7ideal-partido tbody");
  tbody.innerHTML = "";
}

function pedirPassword() {
  const pass = prompt("Introduce la contraseña para editar datos:");
  if (pass === password) {
    document.getElementById("panel-edicion").style.display = "block";
    document.getElementById("btn-editar").style.display = "none";
  } else {
    alert("Contraseña incorrecta.");
  }
}

function cerrarEdicion() {
  document.getElementById("panel-edicion").style.display = "none";
  document.getElementById("btn-editar").style.display = "inline-block";
  actualizarTodo();
}

function actualizarTodo() {
  actualizarTablaSoloLectura();
  actualizarTablaPrincipal();
  actualizarGoleadores();
  actualizarTarjetas();
  actualizarEficiencia();
  calcular7Ideal();
  llenarSelectsPartido();
}

registrarIniciales();
actualizarTodo();
}