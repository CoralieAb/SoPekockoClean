const passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123', 'Passw0rd123'])

module.exports = passwordSchema;