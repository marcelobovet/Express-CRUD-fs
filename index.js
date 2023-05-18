const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/canciones', (req, res)=> {
    const nuevaCancion = req.body;
    const canciones = JSON.parse(fs.readFileSync('canciones.json'));
    canciones.push(nuevaCancion);
    fs.writeFileSync('canciones.json', JSON.stringify(canciones));
    return res.send('cancion agregada con exito')
})

app.get('/canciones', (req, res)=> {
    const cancionesAgregdas = JSON.parse(fs.readFileSync('canciones.json'));
    return res.send(cancionesAgregdas);
});

app.put('/canciones/:id', (req, res) => {
    const idCancion = req.params.id
    let cancionesAgregdas = JSON.parse(fs.readFileSync('canciones.json'));
    const nuevaCancion = req.body;
    cancionesAgregdas = cancionesAgregdas.map((cancion) => {
        if(String(cancion.id) === String(idCancion)) {
            cancion = nuevaCancion
        }
        return cancion
    });
    fs.writeFileSync('canciones.json', JSON.stringify(cancionesAgregdas));
    return res.send(nuevaCancion);
});

app.delete('/canciones/:id', (req, res) => {
    const idCancion = req.params.id;
    let cancionesAgregdas = JSON.parse(fs.readFileSync('canciones.json'));
    cancionesAgregdas = cancionesAgregdas.filter((cancion) => String(cancion.id) !== String(idCancion));
    fs.writeFileSync('canciones.json', JSON.stringify(cancionesAgregdas));
    return res.send('eliminado exitosamente')
});

const PORT = 3000
app.listen(PORT, console.log(`servidor arriba en puerto ${PORT}`));