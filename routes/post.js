const express = require('express');
const router = express.Router();

// res.sendStatus(500)
// === res.status(500).send('Internal Server Error')
router.post('/', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;