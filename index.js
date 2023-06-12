const express = require('express');
const app = express();
const fs = require('fs');
const socketIO = require('socket.io');

// Setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// Views
app.get('/', function(req, res) {
    fs.readFile('jurys.json', (err, data) => {
        if (err) throw err;

        data = JSON.parse(data)
        res.render('index', {jurys: data});
    });
});

// Création du serveur HTTP
const server = require('http').createServer(app);

// Initialisation de Socket.IO avec le serveur
const io = socketIO(server);

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    socket.on('modifJury', jury => {
        fs.readFile('jurys.json', (err, data) => {
            if (err) throw err;

            console.log(jury[0])

            data = JSON.parse(data)
            data[jury[1]] = jury[0]
            data = JSON.stringify(data)

            fs.writeFile('jurys.json', data, (err) => {
                if (err) throw err;
            });
        });
    })
});

// Hébergement
const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});
