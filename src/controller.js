import { pool } from './dataBase.js';

class LibroController {

    //3-a
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            console.error('Error al obtener todos los libros:', error);
        }
    }

    async getOne(req, res) {
        try {
            const { ISBN } = req.params;
            const [result] = await pool.query('SELECT * FROM libros WHERE ISBN=(?)', [ISBN]);
            if (result.length === 0) {
            }
            res.json(result[0]);
        } catch (error) {
            console.error('Error al obtener el libro:', error);
        }
    }

    //3-b
    async add(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, anoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN]);
            res.status(201).json({ "Libro insertado": result.insertId });
        } catch (error) {
            console.error('Error al agregar el libro:', error);
        }
    }

    //3-c
    async update(req, res) {
        try {
            const libro = req.body;
            const [result] = await pool.query('UPDATE libros SET nombre=?, autor=?, categoria=?, anoPublicacion=?, ISBN=? WHERE id_libro=(?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN, libro.id_libro]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Libro no encontrado o no se realizaron cambios.' });
            }
            res.json({ "Registros Actualizados": result.changedRows });
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
    }

    //3-d
    async delete(req, res) {
        try {
            const { ISBN } = req.params;
            const [result] = await pool.query('DELETE FROM libros WHERE ISBN=(?)', [ISBN]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Libro no encontrado.' });
            }
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    }

}

export const libro = new LibroController();
