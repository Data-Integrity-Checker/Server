const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Get Home');
});

router.get('/specific', (req, res) => {
    res.send('We are on Specific Posts');
});

module.exports = router;