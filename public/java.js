// Datos iniciales
let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];

// Modo edición control (simple)
let modoEdicion = false;

// Variables para los jugadores del partido actual
let jugadoresHoyEq1 = JSON.parse(localStorage.getItem("jugadoresHoyEq1")) || [];
let jugadoresHoyEq2 = JSON.parse(localStorage.getItem("jugadoresHoyEq2")) || [];

// Funciones básicas
function guardarJugadores() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

function agregarJugador() {
  if (!modoEdicion) {
    return alert("Activa modo edición para añadir jugadores.");
  }

  const nombre = document.getElementById("nombre").value.trim();
  const posicion = document.getElementById("posicion").value;
  if (!nombre) return alert("Introduce un nombre válido");
  if (jugadores.find(j => j.nombre === nombre)) return alert("Jugador ya existe");

  jugadores.push({ nombre, posicion, goles:0, asistencias:0, amarillas:0, rojas:0, partidos:0, puntos:0 });
  guardarJugadores();
  document.getElementById("nombre").value = "";
  document.getElementById("posicion").value = "DEL";
  actualizarTodo();
  mostrarSeleccionJugadores();
}
function actualizarEstadoBotonAgregar() {
  const btn = document.getElementById("btn-agregar-jugador");
  btn.disabled = !modoEdicion;
  btn.style.opacity = modoEdicion ? "1" : "0.5";
  btn.style.cursor = modoEdicion ? "pointer" : "not-allowed";
}


function actualizarTodo() {
  actualizarTablaJugadores();
  actualizarTopTablas();
}

function actualizarTablaJugadores() {
  const tbody = document.querySelector("#tabla-jugadores tbody");
  tbody.innerHTML = "";
  jugadores.forEach((j, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${j.nombre}</td>
      <td>${j.posicion}</td>
      <td>${j.goles}</td>
      <td>${j.asistencias}</td>
      <td>${j.amarillas}</td>
      <td>${j.rojas}</td>
      <td>${j.partidos}</td>
      <td>${j.puntos.toFixed(2)}</td>
      <td><button onclick="borrarJugador(${i})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function borrarJugador(index) {
  if (!modoEdicion) return alert("Activa modo edición para eliminar jugadores");
  jugadores.splice(index, 1);
  guardarJugadores();
  actualizarTodo();
  mostrarSeleccionJugadores();
}

function activarModoEdicion() {
  if (modoEdicion) {
    // Desactivar
    modoEdicion = false;
    document.querySelector("button[onclick='activarModoEdicion()']").textContent = "🔒 Activar edición";
    document.getElementById("btn-reset").disabled = true;
    document.getElementById("form-editar-partido").innerHTML = "";
    alert("Modo edición desactivado");
    return;
  }
  // Activar
  const pass = prompt("Introduce la contraseña para modo edición:");
  if(pass === "Rcorralr123") {
    modoEdicion = true;
    document.querySelector("button[onclick='activarModoEdicion()']").textContent = "🔓 Desactivar edición";
    document.getElementById("btn-reset").disabled = false;
    mostrarFormularioEditarPartido();
  } else {
    alert("Contraseña incorrecta");
  }
}


// Mostrar o esconder formulario para editar datos del partido actual
function mostrarFormularioEditarPartido() {
  // Si no hay jugadores seleccionados, no mostramos
  jugadoresHoyEq1 = JSON.parse(localStorage.getItem("jugadoresHoyEq1")) || [];
  jugadoresHoyEq2 = JSON.parse(localStorage.getItem("jugadoresHoyEq2")) || [];
  if(jugadoresHoyEq1.length === 0 && jugadoresHoyEq2.length === 0) {
    alert("No hay jugadores seleccionados para el partido. Registra un partido primero.");
    return;
  }
  
  const cont = document.getElementById("form-editar-partido");
  cont.innerHTML = ""; // limpio
  
  const tabla = document.createElement("table");
  tabla.border = "1";
  const header = document.createElement("tr");
  header.innerHTML = `<th>Jugador</th><th>Goles</th><th>Asistencias</th><th>Amarillas</th><th>Rojas</th>`;
  tabla.appendChild(header);

  function crearFila(nombre) {
    const jugador = jugadores.find(j => j.nombre === nombre);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${nombre}</td>
      <td><input type="number" min="0" value="0" id="goles-${nombre}"></td>
      <td><input type="number" min="0" value="0" id="asistencias-${nombre}"></td>
      <td><input type="number" min="0" value="0" id="amarillas-${nombre}"></td>
      <td><input type="number" min="0" value="0" id="rojas-${nombre}"></td>
    `;
    return tr;
  }

  jugadoresHoyEq1.forEach(n => tabla.appendChild(crearFila(n)));
  jugadoresHoyEq2.forEach(n => tabla.appendChild(crearFila(n)));

  cont.appendChild(tabla);

  // Botón guardar
  const btnGuardar = document.createElement("button");
  btnGuardar.textContent = "Guardar datos del partido";
  btnGuardar.onclick = guardarDatosPartido;
  cont.appendChild(btnGuardar);

  // Botón borrar datos partido actual
  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "Borrar datos del partido actual";
  btnBorrar.style.marginLeft = "10px";
  btnBorrar.onclick = borrarDatosPartidoActual;
  cont.appendChild(btnBorrar);
}

function guardarDatosPartido() {
  // Por cada jugador de los equipos, sumamos lo que haya en inputs a sus registros totales
  jugadoresHoyEq1.concat(jugadoresHoyEq2).forEach(nombre => {
    const jugador = jugadores.find(j => j.nombre === nombre);
    if(!jugador) return;

    const goles = parseInt(document.getElementById(`goles-${nombre}`).value) || 0;
    const asistencias = parseInt(document.getElementById(`asistencias-${nombre}`).value) || 0;
    const amarillas = parseInt(document.getElementById(`amarillas-${nombre}`).value) || 0;
    const rojas = parseInt(document.getElementById(`rojas-${nombre}`).value) || 0;

    jugador.goles += goles;
    jugador.asistencias += asistencias;
    jugador.amarillas += amarillas;
    jugador.rojas += rojas;
  });

  guardarJugadores();
  actualizarTodo();
  alert("Datos del partido guardados correctamente");
}

function borrarDatosPartidoActual() {
  if(!confirm("¿Seguro que quieres borrar los datos del partido actual? Esto no borrará los registros totales.")) return;
  // Simplemente quitamos los jugadores del partido actual (los seleccionados) para poder registrar otro partido nuevo
  localStorage.removeItem("jugadoresHoyEq1");
  localStorage.removeItem("jugadoresHoyEq2");
  jugadoresHoyEq1 = [];
  jugadoresHoyEq2 = [];
  document.getElementById("form-editar-partido").innerHTML = "";
  alert("Datos del partido actual borrados. Ya puedes registrar otro partido.");
}

// Mostrar selección de jugadores para equipos con posición visible
function mostrarSeleccionJugadores() {
  const cantidadEq1 = parseInt(document.getElementById("cantidad-jugadores-eq1").value);
  const cantidadEq2 = parseInt(document.getElementById("cantidad-jugadores-eq2").value);

  const contenedorEq1 = document.getElementById("seleccion-jugadores-eq1");
  contenedorEq1.innerHTML = "";
  for(let i=0; i<cantidadEq1; i++) {
    const select = document.createElement("select");
    select.id = `jugador-eq1-${i}`;
    jugadores.forEach(j => {
      const option = document.createElement("option");
      option.value = j.nombre;
      option.textContent = `${j.nombre} (${j.posicion})`;
      select.appendChild(option);
    });
    contenedorEq1.appendChild(select);
    contenedorEq1.appendChild(document.createElement("br"));
  }

  const contenedorEq2 = document.getElementById("seleccion-jugadores-eq2");
  contenedorEq2.innerHTML = "";
  for(let i=0; i<cantidadEq2; i++) {
    const select = document.createElement("select");
    select.id = `jugador-eq2-${i}`;
    jugadores.forEach(j => {
      const option = document.createElement("option");
      option.value = j.nombre;
      option.textContent = `${j.nombre} (${j.posicion})`;
      select.appendChild(option);
    });
    contenedorEq2.appendChild(select);
    contenedorEq2.appendChild(document.createElement("br"));
  }
}

// Registrar partido: incrementar partidos y guardar jugadores de ambos equipos
function registrarPartido() {
  const cantidadEq1 = parseInt(document.getElementById("cantidad-jugadores-eq1").value);
  const cantidadEq2 = parseInt(document.getElementById("cantidad-jugadores-eq2").value);

  const nombresEq1 = [];
  for(let i=0; i<cantidadEq1; i++) {
    const sel = document.getElementById(`jugador-eq1-${i}`);
    if(sel) nombresEq1.push(sel.value);
  }

  const nombresEq2 = [];
  for(let i=0; i<cantidadEq2; i++) {
    const sel = document.getElementById(`jugador-eq2-${i}`);
    if(sel) nombresEq2.push(sel.value);
  }

  // Actualizar partidos jugados
  nombresEq1.concat(nombresEq2).forEach(nombre => {
    const jugador = jugadores.find(j => j.nombre === nombre);
    if(jugador) jugador.partidos++;
  });

  // Guardar equipos en localStorage
  localStorage.setItem("jugadoresHoyEq1", JSON.stringify(nombresEq1));
  localStorage.setItem("jugadoresHoyEq2", JSON.stringify(nombresEq2));

  // Actualizamos variables
  jugadoresHoyEq1 = nombresEq1;
  jugadoresHoyEq2 = nombresEq2;

  guardarJugadores();
  actualizarTodo();
  alert("Partido registrado correctamente");
}

function generar8Ideal() {
  // Calcular puntos según posición
  jugadores.forEach(j => {
    let puntos = 0;
    switch(j.posicion) {
      case "DEL":
        puntos = j.goles*4 + j.asistencias*3 - j.amarillas*1 - j.rojas*3 + j.partidos*0.5;
        break;
      case "MED":
        puntos = j.goles*5 + j.asistencias*4 - j.amarillas*1 - j.rojas*3 + j.partidos*0.5;
        break;
      case "DEF":
        puntos = j.goles*6 + j.asistencias*5 - j.amarillas*1 - j.rojas*3 + j.partidos*0.5;
        break;
      case "POR":
        puntos = j.goles*10 - j.amarillas*1 - j.rojas*3 + j.partidos*0.5;
        break;
    }
    j.puntos = puntos;
  });

  // Ordenar y seleccionar top 8
  const top8 = jugadores.slice().sort((a,b) => b.puntos - a.puntos).slice(0,8);

  // Construir HTML para mostrar el 8 ideal
  let html = `<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
                <thead>
                  <tr>
                    <th>Jugador</th><th>Posición</th><th>Puntos</th>
                  </tr>
                </thead>
                <tbody>`;

  top8.forEach(j => {
    html += `<tr>
               <td>${j.nombre}</td>
               <td>${j.posicion}</td>
               <td>${j.puntos.toFixed(2)}</td>
             </tr>`;
  });

  html += "</tbody></table>";

  // Mostrar en el div
  document.getElementById("ocho-ideal").innerHTML = html;
}




// Inicialización
mostrarSeleccionJugadores();
actualizarTodo();
generar8Ideal();
actualizarTopTablas();
actualizarTablaJugadores();

