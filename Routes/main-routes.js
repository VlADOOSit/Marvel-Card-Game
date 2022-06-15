const express = require('express');
const { mainPost, loginGet, loginGetStyle, loginPost, checkPost, logoutPost, mainGet, lobbyGetStyle } = require('../Controllers/loginController');
const { passwordPost, passwordGet, passwordGetStyle } = require('../Controllers/passwordController');
const { storeGet, profileGet, clientGet, gameGetJs, profileGetJs, gameGetCss, changeAva, youWinGet, youLoseGet, leaveGet, rulesGet } = require('../Controllers/profileController');
const { registrationGet, registrationPost, registrationGetStyle } =  require('../Controllers/registerController');

const jsonParser = express.json();
const router = express.Router();

router.post('/reg', jsonParser ,registrationPost);
router.get('/reg', registrationGet);
router.get('/style.css', registrationGetStyle);

router.post('/', jsonParser ,mainPost);
router.post('/login', jsonParser, loginPost);
router.post('/check', jsonParser, checkPost);
router.post('/logout', jsonParser, logoutPost);
router.post('/changeAva', jsonParser, changeAva);
router.get('/', mainGet);
router.get('/login', loginGet);
router.get('/style.css', loginGetStyle);

router.post('/password', jsonParser, passwordPost);
router.get('/password', passwordGet);
router.get('/style.css', passwordGetStyle);
router.get('/lobby.css', lobbyGetStyle);

router.get('/store', storeGet);
router.get('/profile', profileGet);
router.get('/rules', rulesGet);
router.get('/you_win', youWinGet);
router.get('/you_lose', youLoseGet);
router.get('/leave', leaveGet);

router.get('/client.js', clientGet);
router.get('/loop.js', gameGetJs);
router.get('/profile.js', profileGetJs);
router.get('/InGameCards.css', gameGetCss);



module.exports = router;