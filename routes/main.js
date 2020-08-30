const express = require('express');
const router = express.Router();

router.post('/chat' , (req , res) => {
    return res.render('index' , {data: req.body});
})

router.get('/' , (req , res) => {
    return res.render('login');
})

module.exports = router;