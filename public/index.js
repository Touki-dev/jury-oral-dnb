const conteneur_position_absolute = document.getElementById('conteneur_position_absolute')
const divModifier = document.getElementById('#modifier')

var juryModif = null

function modifier(nbJury) {
    conteneur_position_absolute.style.display = 'flex'
    juryModif = nbJury
}

// Connexion au serveur Socket.IO
const socket = io();

// Gestion des événements Socket.IO
socket.on('connect', () => {
    console.log('Connecté au serveur Socket.IO');
});

function envoyerModif(noms_jury) {
    console.log(noms_jury)
    const jury = [noms_jury, juryModif]
    socket.emit('modifJury', jury);
    location.reload();
}