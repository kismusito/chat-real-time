"use strict";

(() => {
    const socket = io();
    const getContainerMessage = document.getElementById('roomMessages');
    const getFormMessage = document.getElementById('formSendMessage');

    if (getFormMessage) {
        const getAlertContainer = document.getElementById('alertMessage');
        getFormMessage.addEventListener('submit', e => {
            e.preventDefault();

            if (e.target.message.value.length < 1) {
                getAlertContainer.innerHTML = "<span>Fill message</span>";
                setTimeout(_ => {
                    getAlertContainer.innerHTML = "";
                }, 1500);
                return false;
            }

            const config = {
                userID: localStorage.getItem('userID'),
                message: e.target.message.value
            }

            if (getContainerMessage) {
                const getActualUsername = document.getElementById('usernameChat');
                getContainerMessage.innerHTML += `
                        <div class="messageContainer myMessage">
                            <span class="messageUser">${getActualUsername.value}</span>
                            <span class="messageContent">${e.target.message.value}</span>
                        </div>
                    `;
            }

            e.target.reset();

            socket.emit("newMessage", config);
        })
    }

    const userIDToRoom = document.getElementById('userActualID');
    if (userIDToRoom) {
        socket.emit('joinRoom', {
            userID: userIDToRoom.value
        })
    }



    if (getContainerMessage) {
        socket.on('newMessage', data => {
            let classToMessage = "messageContainer";
            if (data.userID == localStorage.getItem('userID')) {
                classToMessage = "messageContainer myMessage";
            }
            getContainerMessage.innerHTML += `
                <div class="${classToMessage}">
                    <span class="messageUser">${data.username}</span>
                    <span class="messageContent">${data.message}</span>
                </div>
            `;
        })
    }


})();