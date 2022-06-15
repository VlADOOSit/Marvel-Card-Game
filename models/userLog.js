const mysql = require('../db.js');
const Model = require('../model.js');
const bcrypt = require('bcrypt');

class UserLog extends Model {
    constructor(login, pass) {
        super();
        this.login = login;
        this.pass = pass;
    }

    findInDb(response, ses) {
        let user = {
            login: this.login,
            pass: this.pass,
        }
        const sql = 'SELECT * FROM users WHERE login=?';

        mysql.query(sql, user.login, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }

            if (rows[0] == undefined) {
                response.json({ans: 'User not found'});
                return;
            }

            if (bcrypt.compareSync(user.pass, rows[0].pass)) {
                ses.content = true;
                ses.login = rows[0].login;
                ses.fullName = rows[0].fullName;
                ses.email = rows[0].email;
                ses.ava = rows[0].ava;
                
                response.json({ans: 'OK'});
                return;
            }
            else {
                response.json({ans: 'Incorrect password'});
                return;
            }
        });
    }
}

module.exports = UserLog;