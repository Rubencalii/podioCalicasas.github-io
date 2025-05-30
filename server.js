const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener todos los jugadores
app.get('/jugadores', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'jugadores.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer los datos' });
    const jugadores = JSON.parse(data || '[]');
    res.json(jugadores);
  });
});

// Ruta para agregar un jugador
app.post('/jugadores', (req, res) => {
  const nuevoJugador = req.body;
  const filePath = path.join(__dirname, 'data', 'jugadores.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error al leer los datos' });

    let jugadores = JSON.parse(data || '[]');
    jugadores.push(nuevoJugador);

    fs.writeFile(filePath, JSON.stringify(jugadores, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Error al guardar los datos' });
      res.status(201).json({ message: 'Jugador agregado correctamente' });
    });
  });
});

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
