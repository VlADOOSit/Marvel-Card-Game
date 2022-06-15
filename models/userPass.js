const mysql = require('../db.js');
const Model = require('../model.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const shortid = require('shortid');

class UserPass extends Model {
    constructor(email) {
        super();
        this.email = email;
    }

    findAndSend(response) {
        let user = {
            email: this.email,
        }
        const sql = 'SELECT * FROM users WHERE email=?';

        mysql.query(sql, user.email, function (err, rows) {
            if (err) {
                return console.log(err.message);
            }

            if (rows[0] === undefined) {
                response.json({ans: 'User not found'});
                return;
            }

            else {

                const newPassword = shortid.generate();
                let new_has = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

                mysql.query(`INSERT INTO users (login, pass, fullName, email)
                VALUES("${rows[0].login}", "${new_has}", "${rows[0].fulName}", "${rows[0].email}")
                ON DUPLICATE KEY UPDATE pass="${new_has}", email="${rows[0].email}"`, function (err, rows) {
                    if (err) {
                        return console.log(err.message);
                    }
                });

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'vlad.kharkovskiy22@gmail.com',
                        pass: 'wsxqazwsxqaz',
                    }
                })
            
                transporter.sendMail({
                    from: 'vlad.kharkovskiy22@gmail.com',
                    to: user.email,
                    subject: 'password',
                    html: `
                            <p>Dear user,</p>
                            <p>Your password is: ${newPassword}</p>
                            <p>Best regards!</p>`
                }, function(err, ress) {
                    if(err) {
                        console.log('Error');
                    }
                });

                response.json({ans: "OK"});
            }
        })
    }
}

module.exports = UserPass;