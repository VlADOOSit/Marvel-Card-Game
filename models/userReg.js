const mysql = require('../db.js');
const Model = require('../model.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


class UserReg extends Model {
    constructor(login, pass, fullName, email) {
        super();
        this.login = login;
        this.pass = pass;
        this.fullName = fullName;
        this.email = email;
    }

    saveToDb(response) {
        let user = {
            login: this.login,
            pass: this.pass,
            fullName: this.fullName,
            email: this.email,
        }
        const sql = 'INSERT INTO users SET ?';

        user.pass = bcrypt.hashSync(user.pass, bcrypt.genSaltSync(saltRounds));

        mysql.query(sql, user, function (err, rows) {
            if (err) {
                if (err.message.includes("'login'")) {
                    response.json({ans: 'User with this login is already registered'});
                }
                if (err.message.includes("'email'")) {
                    response.json({ans: 'User with this email is already registered'});
                }
                return;
            }
            

            response.json({ans: 'OK'});
        });
    }
}

module.exports = UserReg;
