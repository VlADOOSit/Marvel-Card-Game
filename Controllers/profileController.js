const UserAva = require('../models/userAva');
const path = require("path");
let sen = path.resolve(__dirname, '../');

const storeGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/store.html');
    }
}

const profileGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/profile.html');
    }
    
}

const changeAva = (request, response) => {
    ses = request.session;
    console.log('pc'+request.body.ava);
    
    ses.ava = request.body.ava;
    let user = new UserAva(ses.login);

    user.findAndChange(response, ses.ava);
}

const rulesGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/rules.html');
    }
    
}

const clientGet = (request, response) => {
    response.sendFile(sen + '/js/client.js');
}

const youLoseGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/you_lose.html');
    }
    
}

const youWinGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/you_win.html');
    }
    
}

const leaveGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/leave.html');
    }  
    
}

const gameGetJs = (request, response) => {
    response.sendFile(sen + '/js/loop.js');
}

const gameGetCss = (request, response) => {
    response.sendFile(sen + '/public/InGameCards.css');
}

const profileGetJs = (request, response) => {
    response.sendFile(sen + '/js/profile.js');
}


module.exports = {
    storeGet,
    profileGet,
    rulesGet,
    clientGet,
    gameGetJs,
    profileGetJs,
    gameGetCss, 
    changeAva,
    youLoseGet,
    youWinGet,
    leaveGet
};
