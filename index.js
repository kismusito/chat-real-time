require('dotenv').config();
const server = require('./server');

async function init() {
    await server.listen(process.env.PORT || 3001);
    console.log("Server running");
}

init();