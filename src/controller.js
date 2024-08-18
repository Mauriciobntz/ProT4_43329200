import {pool} from './dataBase.js';

class libroController{

    //3-a
    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async getOne(req, res) {
        const { ISBN } = req.params;
        const [result] = await pool.query('SELECT * FROM libros WHERE ISBN=(?)', [ISBN]);
        res.json(result);
    }

    //3-b
    async add(req, res) {
        const libro = req.body;
        const [result] = await pool.query('INSERT INTO libros(nombre, autor, categoria, anoPublicacion, ISBN) VALUES(?, ?, ?, ?, ?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN]);
        res.json({"id insertado": result.insertId});
    }

    //3-c
    async update(req, res) {
        const libro = req.body;
        const [result] = await pool.query('UPDATE libros SET nombre=(?), autor=(?), categoria=(?), anoPublicacion=(?), ISBN=(?) WHERE id_libro=(?)', [libro.nombre, libro.autor, libro.categoria, libro.anoPublicacion, libro.ISBN, libro.id_libro]);
        res.json({"Registros Actualizados": result.changedRows});
    }

    //3-d
    async delete(req, res) {
        const libro = req.body;
        const [result] = await pool.query('DELETE FROM  libros WHERE ISBN=(?)', [libro.ISBN]);
        res.json({"Registros eliminados": result.affectedRows});
    }


}

export const libro = new libroController();
