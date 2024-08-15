const express = require('express');
const {programacion} = require('../datos/cursos.js').infoCursos;
const routerProgramacion = express.Router();

//middleware
routerProgramacion.use(express.json());

routerProgramacion.get('/', (req, res) => {
    let resultados = [...programacion];
    resultados = sortByVistas(resultados, req.query.order);
    res.json(resultados);
});

function sortByVistas(resultados, order) {
    if (order === 'vistas') {
        return resultados.sort((a, b) => a.vistas - b.vistas);
    }
    return resultados;
};

routerProgramacion.get('/:language', (req, res) => {
    const language = req.params.language;
    const resultados = programacion.filter(curso => curso.lenguaje === language)

    if(resultados.length === 0) {
        return res.status(204).send(`No se encontraron cursos para el lenguaje ${language}`);
    }
    res.json(resultados);
});

routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.status(201).json(cursoNuevo);
});

routerProgramacion.put('/:id', (req, res) => {
    const cursoActualizado = req.body;
    const id = parseInt(req.params.id);

    const indice = programacion.findIndex(curso => curso.id === id)
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
        res.json(programacion);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
})

routerProgramacion.patch('/:id', (req, res) => {
    const infoActualizada = req.body;
    const id = parseInt(req.params.id);

    const indice = programacion.findIndex(curso => curso.id === id)
    if (indice >= 0) {
        const cursoAModificar = programacion[indice];
        Object.assign(cursoAModificar, infoActualizada);
        res.json(programacion);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
})

routerProgramacion.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = programacion.findIndex(curso => curso.id === id)

    if (indice >= 0) {
        programacion.splice(indice, 1);
        res.json(programacion);
    } else {
        res.status(204).send(`No se encontró el curso con id ${id}`);
    }
});

module.exports = {
    routerProgramacion,
    sortByVistas,
};