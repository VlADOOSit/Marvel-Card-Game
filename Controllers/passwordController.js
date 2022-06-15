const UserPass = require('../models/userPass');
const path = require("path");

let sen = path.resolve(__dirname, '../');
const passwordGet = (request, response) => {
    response.sendFile(sen + '/views/password.html');
}

const passwordGetStyle = (request, response) => {
    response.sendFile(sen + '/public/style.css');
}

const passwordPost = (request, response) => {
    if (request.body.email == '') {
        response.json({ans: 'All input!'});
    }

    else {
        let user = new UserPass(request.body.email);
        user.findAndSend(response);
    };
}

module.exports = {
    passwordGet,
    passwordPost,
    passwordGetStyle
};
