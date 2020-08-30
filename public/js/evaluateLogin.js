"use strict";

(() => {
    const socket = io();
    function generateCode(n) {
        const posibleChars = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let id = "";
        for (let i = 0; i < n; i++) {
            const ramdom = Math.floor(Math.random() * (posibleChars.length - 1) + 1);
            id += posibleChars[ramdom];
        }
        return id;
    }

    const getIDField = document.getElementById('usernameID');
    if (getIDField) {
        if (localStorage.getItem('userID')) {
            getIDField.value = localStorage.getItem('userID');
        } else {
            const id = generateCode(10);
            localStorage.setItem("userID", id);
            getIDField.value = localStorage.getItem('userID');
        }
    }

    const sendForm = document.getElementById('form_login');
    if (sendForm) {
        sendForm.addEventListener('submit', e => {
            socket.emit('userLogin', {
                userID: e.target.usernameID.value,
                username: e.target.username.value,
                room: e.target.userRoom.value,
            });
        })
    }


})();