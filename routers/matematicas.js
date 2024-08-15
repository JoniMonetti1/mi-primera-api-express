const express = require('express');
const {matematicas} = require('../datos/cursos.js').infoCursos;
const routerMatematicas = express.Router();
const {sortByVistas} = require('./programacion.js')

// Middleware para parsear JSON
routerMatematicas.use(express.json());

routerMatematicas.get('/', (req, res) => {
    let resultados = [...matematicas];
    resultados = sortByVistas(resultados, req.query.order)
    res.json(resultados);
})

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema;
    const resultados = matematicas.filter(curso => curso.tema === tema);

    if(resultados.length === 0) {
        return res.status(204).send(`No se encontraron cursos para el tema ${tema}`);
        //return res.status(404).end();
    }

    res.json(resultados);
});

routerMatematicas.get('/:tema/:nivel', (req, res) => {
    const tema = req.params.tema;
    const nivel = req.params.nivel;
    const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel);

    if(resultados.length === 0) {
        return res.status(204).send(`No se encontraron cursos para el tema ${tema} y nivel ${nivel}`);
    }

    res.json(resultados);
})

routerMatematicas.post('/', (req, res) => {
    let cursoNuevo = req.body;
    matematicas.push(cursoNuevo);
    res.status(201).json(cursoNuevo);
});

routerMatematicas.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cursoActualizado = req.body;
    const index = matematicas.findIndex(curso => curso.id === id);

    if(index >= 0) {
        matematicas[index] = cursoActualizado;
        res.json(matematicas);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
})

routerMatematicas.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cursoActualizado = req.body;
    const index = matematicas.findIndex(curso => curso.id === id);

    if (index >= 0) {
        Object.assign(matematicas[index], cursoActualizado);
        res.json(matematicas);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
})

routerMatematicas.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = matematicas.findIndex(curso => curso.id === id);

    if(index >= 0) {
        matematicas.splice(index, 1);
        res.json(matematicas);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
    
})

module.exports = routerMatematicas;