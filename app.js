const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10742235',
    password: 'ikFkhTG539',
    database: 'sql10742235'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Endpoint de login
app.post('/login', (req, res) => {
    const { Correo, Contrasena } = req.body;

    const query = 'SELECT * FROM ID_Usuario WHERE Correo = ? AND Contrasena = ?';
    db.query(query, [Correo, Contrasena], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error en el servidor' });
        } else if (results.length > 0) {
            res.status(200).json({ message: 'Login exitoso', user: results[0] });
        } else {
            res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
});

// Endpoint para buscar recetas por ingredientes
app.post('/recetas', (req, res) => {
    const ingredientes = req.body.ingredientes; // Array de ingredientes

    if (!ingredientes || ingredientes.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar al menos un ingrediente' });
    }

    // Construir la consulta SQL
    const placeholders = ingredientes.map(() => `Ingredientes LIKE ?`).join(' AND ');
    const query = `SELECT * FROM Recetas WHERE ${placeholders}`;

    // Crear un array con los ingredientes en formato %ingrediente%
    const values = ingredientes.map(ingrediente => `%${ingrediente}%`);

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            res.status(200).json({ recetas: results });
        } else {
            res.status(404).json({ message: 'No se encontraron recetas con esos ingredientes' });
        }
    });
});

// Endpoint para agregar una receta a favoritos
app.post('/favoritos', (req, res) => {
    const { ID_Usuario, ID_Receta } = req.body;

    const query = `INSERT INTO Favoritos (ID_Usuario, ID_Receta) VALUES (?, ?)`;
    db.query(query, [ID_Usuario, ID_Receta], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al agregar a favoritos' });
        }
        res.status(200).json({ message: 'Receta agregada a favoritos' });
    });
});

// Endpoint para eliminar una receta de favoritos
app.delete('/favoritos', (req, res) => {
    const { ID_Usuario, ID_Receta } = req.body;

    const query = `DELETE FROM Favoritos WHERE ID_Usuario = ? AND ID_Receta = ?`;
    db.query(query, [ID_Usuario, ID_Receta], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al eliminar de favoritos' });
        }
        res.status(200).json({ message: 'Receta eliminada de favoritos' });
    });
});

// Endpoint para obtener las recetas favoritas de un usuario
// Endpoint para obtener las recetas favoritas de un usuario
app.post('/favoritos/obtener', (req, res) => {
    const { ID_Usuario } = req.body;

    if (!ID_Usuario) {
        return res.status(400).json({ message: 'ID_Usuario es requerido' });
    }

    const query = `
        SELECT Recetas.* 
        FROM Favoritos 
        JOIN Recetas ON Favoritos.ID_Receta = Recetas.ID_Receta 
        WHERE Favoritos.ID_Usuario = ?
    `;

    db.query(query, [ID_Usuario], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error al obtener favoritos' });
        }
        if (results.length > 0) {
            res.status(200).json({ favoritos: results });
        } else {
            res.status(404).json({ message: 'No se encontraron recetas favoritas para este usuario' });
        }
    });
});



// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
