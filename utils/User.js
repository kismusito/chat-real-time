const userMethods = {};
let users = [];

userMethods.setUser = (socketID, userID , username , room) => {

    let foundUser = users.find(user => user.userID == userID)

    if ( !foundUser) {
        users.push({
            userID: userID,
            socketID: [socketID],
            username,
            room
        })
    } else {
        foundUser.socketID.push(socketID)
        foundUser.room = room;
    }
}

userMethods.getUser = userID => {
    return users.find(user => {
        return user.userID == userID
    });
}

userMethods.removeUser = (socketID, userID) => {

}

userMethods.createRoom = roomName => {

}

module.exports = userMethods;