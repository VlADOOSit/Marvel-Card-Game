const mysql = require('../db.js');
const Model = require('../model.js');

class UserAva extends Model {
    constructor(login) {
        super();
        this.login = login;
    }

    findAndChange(response, ava) {
        let user = {
            login: this.login,
        }
        console.log('ua' + ava);
        mysql.query(`UPDATE users SET ava=${ava} WHERE login="${user.login}"`, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }
        });

        response.json({ans: "OK"});
    }
}

module.exports = UserAva;