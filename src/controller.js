import {pool} from './dataBase.js';

class libroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, anoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN]);
        res.json({"id insertado": result.insertId});
    }

    async delete(req, res) {
        const libro = req.body;
        const [result] = await pool.query('DELETE FROM  libros WHERE id_libro=(?)', [libro.id_libro]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req, res) {
        const libro = req.body;
        const [result] = await pool.query('UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anoPublicacion=(?), ISBN=(?) WHERE id_libro=(?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN, libro.id_libro]);
        res.json({"Registros Actualizados": result.changedRows});
    }

}

export const libro = new libroController();