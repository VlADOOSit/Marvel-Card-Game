const UserLog = require('../models/userLog');
const mysql = require('../db.js');
const path = require("path");

let sen = path.resolve(__dirname, '../');
let ses;

const mainGet = (request, response) => {
    ses = request.session;
    if (ses.content != true) {
        response.redirect('/login');
    }
    else {
        response.sendFile(sen + '/views/lobby.html');
    }   
    
}

const loginGet = (request, response) => {
    response.sendFile(sen + '/views/login.html');
}

const lobbyGetStyle = (request, response) => {
    response.sendFile(sen + '/public/lobby.css');
}

const loginGetStyle = (request, response) => {
    response.sendFile(sen + '/public/style.css');
}

const loginPost = (request, response) => {
    //console.log(request.body);
    ses = request.session;

    if (request.body.login == '' || request.body.pass == '') {
        response.json({ans: 'Fill in all the fields!'});
    }

    else {
        let user = new UserLog(request.body.login, request.body.pass);
        user.findInDb(response, ses);
    }
}

const mainPost = (request, response) => {
    ses = request.session;
    if(ses.content != true) {
        response.json({ans: "YESlogin"});
    }
    
    else {
        const sql = 'SELECT * FROM users WHERE login=?';

        mysql.query(sql, ses.login, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }

                //ses.content = true;
                ses.login = rows[0].login;
                ses.fullName = rows[0].fullName;
                ses.email = rows[0].email;
                ses.ava = rows[0].ava;
                
                response.json({ ans: "NOlogin", 
                        login: rows[0].login,
                        fullName: rows[0].fullName,
                        email: rows[0].email,
                        ava: rows[0].ava});
                //response.json({ans: 'OK'});
                return;
        });
        
    }
}

const checkPost = (request, response) => {
    ses = request.session;
    if(ses.content == true) {
        response.json({ans: "NOlogin"});
    }
    else {
        response.json({ans: "yeslogin"});
    }
}

const logoutPost = (request, response) => {
    ses = request.session;

    ses.content = false;
    response.json({ans: "logout"});
}

module.exports = {
    loginGet,
    loginPost,
    loginGetStyle,
    mainGet,
    mainPost,
    checkPost,
    logoutPost,
    lobbyGetStyle,
};
